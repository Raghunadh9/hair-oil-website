import User from "@/components/lib/database/models/user.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { sessionUserId } = body;
    await connectToDatabase();
    const address = await User.findById(sessionUserId).select("address").lean();
    return NextResponse.json(
      { user: sessionUserId, address: JSON.parse(JSON.stringify(address)) },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
