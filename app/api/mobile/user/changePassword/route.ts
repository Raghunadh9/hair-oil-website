import { NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/database/db";
import User from "@/components/lib/database/models/user.model";
import Cart from "@/components/lib/database/models/cart.model";
const bcrypt = require("bcrypt");
export const dynamic = "force-dynamic";

export const PUT = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { address, user_id, current_password, password } = body;

    // Find the user by user_id
    const user = await User.findById(user_id);
    const crypted_password = await bcrypt.hash(password, 12);

    if (!user.password) {
      await user.updateOne({
        password: crypted_password,
      });
      return NextResponse.json(
        {
          message:
            "We noticed that you are using a social login so we added a password to login with in the future.",
        },
        { status: 200 }
      );
    }

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is wrong!" },
        { status: 400 }
      );
    }
    await user.updateOne({
      password: crypted_password,
    });

    return NextResponse.json({
      message: "Password has been changed successfully.",
    });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
