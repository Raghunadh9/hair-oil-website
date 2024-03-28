"use server";
export const getEnvForRazorPayment = async () => {
  const key = process.env.RAZORPAY_KEY_ID as string;
  return key;
};
