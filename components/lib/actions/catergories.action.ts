"use server";
import { connectToDatabase } from "../database/db";

import { handleError } from "@/lib/utils";
import Product from "../database/models/product.model";
import Category from "../database/models/category.model";
import slugify from "slugify";

export async function createCategory(name: any) {
  try {
    await connectToDatabase();
    const test = await Category.findOne({ name });
    if (test) {
      return "Category already exists, try a defferent name.";
    }
    await new Category({ name, slug: slugify(name) }).save();

    return JSON.parse(
      JSON.stringify({
        message: `Category ${name} has been created successfully.`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      })
    );
  } catch (error) {
    handleError(error);
  }
}
export async function deleteCategory(id: any) {
  try {
    await connectToDatabase();
    await Category.findByIdAndDelete(id);

    return JSON.parse(
      JSON.stringify({
        message: `Successfully deleted!`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      })
    );
  } catch (error) {
    handleError(error);
  }
}
export async function updateCategory(id: any, name: any) {
  try {
    await connectToDatabase();
    await Category.findByIdAndUpdate(id, { name });
    return JSON.parse(
      JSON.stringify({
        message: `Successfully updated!`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      })
    );
  } catch (error) {
    handleError(error);
  }
}
export async function getAllCategories() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return JSON.parse(
      JSON.stringify({
        categories,
      })
    );
  } catch (error) {
    handleError(error);
  }
}
