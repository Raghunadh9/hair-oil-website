"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/components/store/cart.store";
import { getEnvForRazorPayment } from "@/components/lib/actions/env.razorpay";

const RazorPayPurchaseOrder = ({
  amount,
  orderId,
}: {
  amount: number;
  orderId: string;
}) => {
  // const router = useRouter();
  // const { emptyCart } = useCartStore();
  // const makePayment = async ({ productId = null }) => {
  //   async function getEnv() {
  //     const key = await getEnvForRazorPayment();
  //     return key.toString();
  //   }
  //   const key = await getEnv();
  //   const data = await fetch("http://localhost:3000/api/razorPay", {
  //     cache: "no-store",

  //     method: "POST",
  //     body: JSON.stringify({
  //       amount,
  //     }),
  //   });
  //   const { order } = await data.json();
  //   const options = {
  //     key: key.toString(),
  //     amount: amount.toString(),
  //     currency: order.currency,
  //     name: "Weljon.com",
  //     order_id: order.id,
  //     description: "Understanding RazorPay Integration",
  //     // image: logoBase64,
  //     handler: async function (response: any) {
  //       const data = await fetch("http://localhost:3000/api/paymentverify", {
  //         cache: "no-store",

  //         method: "POST",
  //         body: JSON.stringify({
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_signature: response.razorpay_signature,
  //           orderId: orderId,
  //         }),
  //       });
  //       const res = await data.json();
  //       if (res?.message == "success") {
  //         router.push("/order/" + orderId);
  //         emptyCart();

  //         router.refresh();
  //       }
  //     },
  //   };

  //   // const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();

  //   paymentObject.on("payment.failed", function (response: any) {
  //     alert("Payment failed. Please try again. Contact support for help");
  //   });
  // };
  return <div>RazorPayPurchaseOrder</div>;
};

export default RazorPayPurchaseOrder;
