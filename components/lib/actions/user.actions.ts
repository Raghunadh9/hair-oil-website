"use server";
import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/db";
import { handleError } from "@/lib/utils";
import Cart from "../database/models/cart.model";
import Product from "../database/models/product.model";
import Coupon from "../database/models/coupon.model";
import mongoose from "mongoose";
import Order from "../database/models/order.model";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
// Cart operations for user:
export async function saveCartForUser(cart: any, user_id: string | undefined) {
  try {
    await connectToDatabase();
    let products = [];
    let user = await User.findOne({ clerkId: user_id });
    let existing_cart = await Cart.deleteOne({ user: user._id });

    for (let i = 0; i < cart.length; i++) {
      let dbProduct: any = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct: any = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      tempProduct.shop = cart[i].vendor ? cart[i].vendor : {};
      tempProduct.shopId =
        cart[i].vendor && cart[i].vendor._id ? cart[i].vendor._id : "";

      let price = Number(
        subProduct.sizes.find((p: any) => p.size == cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price - price / Number(subProduct.discount)).toFixed(2)
          : price.toFixed(2);
      products.push(tempProduct);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].qty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    return { success: true };
  } catch (error) {
    handleError(error);
  }
}
export async function getSavedCartForUser(userId: string) {
  try {
    await connectToDatabase();
    let user = await User.findOne({ clerkId: userId });
    const cart = await Cart.findOne({ user: user._id });
    return {
      user: JSON.parse(JSON.stringify(user)),
      cart: JSON.parse(JSON.stringify(cart)),
    };
  } catch (error) {
    handleError(error);
  }
}
// Address operations of user:
export async function changeActiveAddress(id: any, user_id: any) {
  try {
    await connectToDatabase();
    const user = await User.findById(user_id);
    let user_addresses = user.address;
    let addresses = [];

    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify({ addresses }));
  } catch (error) {
    handleError(error);
  }
}
export async function deleteAddress(id: any, user_id: any) {
  try {
    await connectToDatabase();
    const user = await User.findById(user_id);
    await user.updateOne(
      {
        $pull: {
          address: { _id: id },
        },
      },
      { new: true }
    );
    return JSON.parse(
      JSON.stringify({
        addresses: user.address.filter((a: any) => a._id != id),
      })
    );
  } catch (error) {
    handleError(error);
  }
}

export async function saveAddress(address: any, user_id: any) {
  try {
    // Find the user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      return "User not found";
    }

    // Check if 'address' property exists and is an array, if not, create it
    if (!user.address || !Array.isArray(user.address)) {
      user.address = [];
    }

    // Use the push method to add the address to the 'address' array
    user.address.push(address);

    // Save the updated user
    await user.save();
    return JSON.parse(JSON.stringify({ addresses: user.address }));
  } catch (error) {
    handleError(error);
  }
}

// Coupon operations of user:
export async function applyCoupon(coupon: any, user_id: any) {
  try {
    await connectToDatabase();
    const user = await User.findById(user_id);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (!user) {
      return { error: "User not found" };
    }
    if (checkCoupon == null) {
      return { error: "Invalid Coupon" };
    }
    const { cartTotal } = await Cart.findOne({ user: user_id });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;
    await Cart.findByIdAndUpdate(user._id, { totalAfterDiscount });
    return JSON.parse(
      JSON.stringify({
        totalAfterDiscount: totalAfterDiscount.toFixed(2),
        discount: checkCoupon.discount,
      })
    );
  } catch (error) {}
}
// get All Orders of the user:
export async function getAllUserOrders(clerkId: string, filter: string) {
  try {
    await connectToDatabase();
    let user = await User.findOne({ clerkId });

    let orders = [];
    if (filter === "") {
      orders = await Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "paid") {
      orders = await Order.find({ user: user._id, isPaid: true })
        .sort({ createdAt: -1 })
        .lean();
    } else if (filter == "unpaid") {
      orders = await Order.find({ user: user._id, isPaid: false })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      orders = await Order.find({ user: user._id, status: filter })
        .sort({ createdAt: -1 })
        .lean();
    }
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
}
