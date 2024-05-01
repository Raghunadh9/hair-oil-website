import User from "@/components/lib/database/models/user.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { product_id, style, sessionId } = body;
    const user = await User.findById(sessionId);
    const exist = user.wishlist.find(
      (x: any) => x.product == product_id && x.style == style
    );
    if (exist) {
      return NextResponse.json(
        { message: "Product already exists in your wishlist." },
        {
          status: 400,
        }
      );
    }
    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    return NextResponse.json(
      { message: "Product succesfully added to your wishlist." },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("first", error);
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
};
