import { connectToDatabase } from "./../../../../../components/lib/database/db";
export const dynamic = "force-dynamic";
import User from "@/components/lib/database/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { clerkId, email, username, image } = body;
    const newUser = await User.create({ clerkId, email, username, image });

    return NextResponse.json(JSON.parse(JSON.stringify(newUser)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
