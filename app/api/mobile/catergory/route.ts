import { connectToDatabase } from "@/components/lib/database/db";
import Category from "@/components/lib/database/models/category.model";
import Product from "@/components/lib/database/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();

    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(categories)), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name } = body;
    const test = await Category.findOne({ name });
    if (test) {
      NextResponse.json("Category already exists, try a defferent name.", {
        status: 500,
      });
    }
    await new Category({ name, slug: slugify(name) }).save();
    return NextResponse.json(
      {
        message: `Category ${name} has been created successfully.`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const DELETE = async (
  req: Request,
  { params, searchParams }: { params: any; searchParams: any }
) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id } = body;
    await Category.findByIdAndDelete(id);

    return new NextResponse(
      JSON.parse(
        JSON.stringify({
          message: `Successfully deleted!`,
          categories: await Category.find({}).sort({ updatedAt: -1 }),
        })
      ),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`${error.message}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
