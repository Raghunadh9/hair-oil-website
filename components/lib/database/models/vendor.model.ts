import mongoose from "mongoose";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "Seller",
  },
  zipCode: {
    type: Number,
    required: true,
  },
  withdrawMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  commission: {
    type: Number,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// vendorSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// // // comapre password
// vendorSchema.methods.comparePassword = async function (enteredPassword: string) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default Vendor;
