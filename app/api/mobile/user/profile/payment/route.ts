import User from "@/components/lib/database/models/user.model";
import { connectToDatabase } from "@/components/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { sessionUserId } = body;
    await connectToDatabase();
    const defaultPaymentMethod = await User.findById(sessionUserId)
      .select("defaultPaymentMethod")
      .lean();
    return NextResponse.json(
      {
        user: sessionUserId,
        defaultPaymentMethod: JSON.parse(JSON.stringify(defaultPaymentMethod)),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
