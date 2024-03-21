import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema;

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  defaultPaymentMethod: {
    type: String,
    default: "",
  },
  address: [
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  ],
  wishlist: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
      },
    },
  ],
});

const User = models?.User || model("User", UserSchema);

export default User;
