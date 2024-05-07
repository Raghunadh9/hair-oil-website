import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const topBarScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "must be atleast 2 charcters"],
    maxlength: [32, "Maximum length achieved!"],
  },
  btnTitle: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "must be atleast 2 charcters"],
    maxlength: [32, "Maximum length achieved!"],
  },
});

const TopBar = mongoose.models.TopBar || mongoose.model("TopBar", topBarScheme);

export default TopBar;
