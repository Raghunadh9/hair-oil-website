import mongoose from "mongoose";

const swiperImagesScheme = new mongoose.Schema({
  images: [{ url: String, public_url: String }],
});

const SwiperImage =
  mongoose.models.SwiperImage ||
  mongoose.model("SwiperImage", swiperImagesScheme);

export default SwiperImage;
