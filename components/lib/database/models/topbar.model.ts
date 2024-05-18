import mongoose from "mongoose";

const topBarScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [2, "must be atleast 2 charcters"],
    maxlength: [32, "Maximum length achieved!"],
  },
  topBarLink: {
    type: String,
  },
  btnTitle: {
    type: String,
    minlength: [2, "must be atleast 2 charcters"],
    maxlength: [32, "Maximum length achieved!"],
  },
  btnLink: {
    type: String,
  },
  btnColor: {
    type: String,
  },
  topBarColor: {
    type: String,
  },
});

const TopBar = mongoose.models.TopBar || mongoose.model("TopBar", topBarScheme);

export default TopBar;
