"use server";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Product from "../database/models/product.model";
import Category from "../database/models/category.model";
import SubCategory from "../database/models/subCategory.model";
import { connectToDatabase } from "../database/db";
import { handleError } from "@/lib/utils";

function calculatePercentage(num: any, product: any) {
  return (
    (product.reviews.reduce((a: any, review: any) => {
      return (
        a + (review.rating == Number(num) || review.rating == Number(num) + 0.5)
      );
    }, 0) *
      100) /
    product.reviews.length
  ).toFixed(1);
}
// READ all products:
export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products: TypefAllProducts = await Product.find()
      .sort({
        createdAt: -1,
      })
      .lean();
    if (!products) {
      throw new Error("Products are not yet created!");
    }
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    handleError(error);
  }
}
// Read Single Product:
export async function getSingleProduct(
  slug: string,
  style: number,
  size: number
) {
  try {
    await connectToDatabase();
    let product: any = await Product.findOne({ slug })
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "reviews.reviewBy", model: User })
      .lean();

    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
      .map((s: any) => {
        return s.price;
      })
      .sort((a: any, b: any) => {
        return a - b;
      });
    let newProduct = {
      ...product,
      style,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p: any) => {
        return p.color;
      }),
      priceRange:
        prices.length > 1
          ? `From Rs.${prices[0]} to Rs.${prices[prices.length - 1]}`
          : "",
      price:
        subProduct.discount > 0
          ? (
              subProduct.sizes[size].price -
              subProduct.sizes[size].price / subProduct.discount
            ).toFixed(2)
          : subProduct.sizes[size].price,
      priceBefore: subProduct.sizes[size].price,
      quantity: subProduct.sizes[size].qty,
      ratings: [
        {
          percentage: calculatePercentage("5", product),
        },
        {
          percentage: calculatePercentage("4", product),
        },
        {
          percentage: calculatePercentage("3", product),
        },
        {
          percentage: calculatePercentage("2", product),
        },
        {
          percentage: calculatePercentage("1", product),
        },
      ],
      allSizes: product.subProducts
        .map((p: any) => {
          return p.sizes;
        })
        .flat()
        .sort((a: any, b: any) => {
          return a.size - b.size;
        })
        .filter(
          (element: any, index: any, array: any) =>
            array.findIndex((el2: any) => el2.size === element.size) === index
        ),
    };

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
}
export async function getProductDetailsById(
  productId: string,
  style: number,
  size: number | string
) {
  try {
    await connectToDatabase();
    const product: any = await Product.findById(productId).lean();
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;
    let data = {
      _id: product._id.toString(),
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      vendor: product.shop,
      quantity: product.subProducts[style].sizes[size].qty,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

// // CREATE
// export async function createUser(user: CreateUserParams) {
//   try {
//     await connectToDatabase();

//     const newUser = await User.create(user);

//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // READ
// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ clerkId: userId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");

//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }
