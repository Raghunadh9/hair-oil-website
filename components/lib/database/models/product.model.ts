import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    benefits: [{ name: String }],
    ingredients: [{ name: String }],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    vendorId: {
      type: String,
    },
    vendor: {
      type: Object,
    },
    subProducts: [
      {
        sku: String,
        images: [],
        description_images: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
