import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: [2, "must be atleast 2 charcters"],
      maxlength: [32, "Maximum length achieved!"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    vendorId: {
      type: String,
    },
    vendor: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
