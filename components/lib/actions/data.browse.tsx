import Product from "../database/models/product.model";
import { connectToDatabase } from "../database/db";
export const GetDataforBrowsePage = async (sortQuery?: any) => {
  const sort: any =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : {};

  await connectToDatabase();
  let productsDb = await Product.find({}).sort(sort).lean();
  let products = productsDb;

  return {
    products: JSON.parse(JSON.stringify(products)),
  };
};
