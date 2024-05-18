"use server";
import TopBar from "../database/models/topbar.model";
import { connectToDatabase } from "../database/db";
import { handleError } from "@/lib/utils";
export async function createTopBar(topBar: CreateTopBarParams) {
  try {
    await connectToDatabase();
    const newTopBar = await TopBar.create(topBar);
    return JSON.parse(JSON.stringify(newTopBar));
  } catch (error) {
    handleError(error);
  }
}
export async function getTopBar() {
  try {
    await connectToDatabase();
    const topBar = await TopBar.find({});
    return JSON.parse(JSON.stringify(topBar));
  } catch (error) {
    handleError(error);
  }
}
