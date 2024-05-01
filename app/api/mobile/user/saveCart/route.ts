import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import Product from "@/components/lib/database/models/product.model";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { cart, user_id } = body;
    let products = [];
    let user = await User.findById(user_id);
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
      user: user_id,
    }).save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
