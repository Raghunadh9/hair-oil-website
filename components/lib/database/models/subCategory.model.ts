import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;
