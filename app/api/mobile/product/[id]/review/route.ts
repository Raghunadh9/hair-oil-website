import Product from "@/components/lib/database/models/product.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/components/lib/database/models/user.model";
export const dynamic = "force-dynamic";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    // const { id } = params;
    const fullUrl = `${req.url}`;
    let url = new URL(fullUrl);
    const productId = url.pathname.split("/")[3];

    const body = await req.json();
    const { clerkId, review, size, style, rating } = body;
    const user = await User.findOne({ clerkId });

    const product = await Product.findById(productId);
    if (product) {
      const exist = product.reviews.find(
        (x: any) => x.reviewBy.toString() == user._id
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: productId,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": review,
              "reviews.$.size": size,
              "reviews.$.style": style,
              "reviews.$.rating": rating,
            },
          },
          {
            new: true,
          }
        );
        const updatedProduct = await Product.findById(productId);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a: any, r: any) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        return NextResponse.json(
          { reviews: updatedProduct.reviews.reverse() },
          { status: 200 }
        );
      } else {
        const full_review = {
          reviewBy: user._id,
          rating: rating,
          review: review,
          size: size,
          style: style,
        };
        product.reviews.push(full_review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a: any, r: any) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");
        return NextResponse.json(
          { reviews: product.reviews.reverse() },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
