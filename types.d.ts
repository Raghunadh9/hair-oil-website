declare type TypeofNavLinks = {
  href: string;
  key: string;
  text: string;
};
declare type TypeofFooterLinks = {
  title: string;
  links: string[];
};
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  image: string;
};
declare type UpdateUserParams = {
  username: string;
  image: string;
};
declare type TypeofNavLinks = {
  href: string;
  key: string;
  text: string;
};
declare type TypeofFooterLinks = {
  title: string;
  links: string[];
};
declare type TypeofHomeShowcaseContent = {
  title: string;
  description: string;
  image: string;
};
declare type TypeofTestimonials = {
  name: string;
  image_url: string;
  rating: number;
  review: string;
};
declare type TypeofProductBadgesData = {
  title: string;
  icon: any;
};
interface TypeofSingleProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: any;
  subCategories: any[]; // You may want to replace `any[]` with a more specific type if you have defined subcategories elsewhere.
  details: { name: string; value: string; _id: string }[];
  shipping: number;
  subProducts: {
    color: { color: string; image: string };
    sold: number;
    images: { url: string; public_url: string }[];
    description_images: any[]; // You may want to replace `any[]` with a more specific type if you have defined description images elsewhere.
    sizes: { size: string; qty: number; price: number; _id: string }[];
    discount: number;
    _id: string;
  }[];
  numReviews: number;
  rating: number;
  refundPolicy: string;
  reviews: {
    style: { color: string; image: string };
    reviewBy: string;
    rating: number;
    review: string;
    size: string;
    fit: string;
    images: { url: string; public_url: string }[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
declare type TypeofDBUser = {
  _id: any;
  clerkId: string;
  email: string;
  username: string;
  image: string;
  role: string;
  defaultPaymentMethod: string;
  address: any;
  wishlist: string;
  __v: any;
};

declare type TypefAllProducts = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  slug: string;
  category: string;
  subCategories: any[]; // You may want to replace `any[]` with a more specific type if you have defined subcategories elsewhere.
  details: { name: string; value: string; _id: string }[];
  shipping: number;
  subProducts: {
    color: { color: string; image: string };
    sold: number;
    images: { url: string; public_url: string }[];
    description_images: any[]; // You may want to replace `any[]` with a more specific type if you have defined description images elsewhere.
    sizes: { size: string; qty: number; price: number; _id: string }[];
    discount: number;
    _id: string;
  }[];
  numReviews: number;
  rating: number;
  refundPolicy: string;
  reviews: {
    style: { color: string; image: string };
    reviewBy: string;
    rating: number;
    review: string;
    size: string;
    fit: string;
    images: { url: string; public_url: string }[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}[];
