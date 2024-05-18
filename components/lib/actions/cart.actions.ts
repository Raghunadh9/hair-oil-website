"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../database/db";
import Product from "../database/models/product.model";

export async function updateCart(products: any) {
  try {
    await connectToDatabase();
    const promises = products.map(async (p: any) => {
      let dbProduct: any = await Product.findById(p._id).lean();
      let originalPrice = dbProduct.subProducts[p.style].sizes.find(
        (x: any) => x.size == p.size
      ).price;
      let quantity = dbProduct.subProducts[p.style].sizes.find(
        (x: any) => x.size == p.size
      ).qty;
      let discount = dbProduct.subProducts[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });
    const data = await Promise.all(promises);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
