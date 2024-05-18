import { connectToDatabase } from "@/components/lib/database/db";
import TopBar from "@/components/lib/database/models/topbar.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { title, btnTitle, btnLink, topBarColor, btnColor } =
      await req.json();
    const newTopBar = await TopBar.create({
      title,
      btnTitle,
      btnLink,
      topBarColor,
      btnColor,
    });

    return NextResponse.json(JSON.parse(JSON.stringify(newTopBar)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
}
