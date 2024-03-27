"use client";
import { createOrder } from "@/components/lib/actions/order.actions";
import { applyCoupon } from "@/components/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import { paymentMethods } from "@/config/constants";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";

const CheckoutPaymentandSummary = ({
  cart,
  user,
  profile,
}: {
  cart: any;
  user: TypeofDBUser;
  profile?: any;
}) => {
  const { userId } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [addresses, setAddresses] = useState<any>(user?.address || []);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const router = useRouter();
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [placeOrderLoading, setPlaceOrderLoading] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [order_error, setOrder_Error] = useState("");
  useEffect(() => {
    if (user?.address) {
      setAddresses(user.address);
    }
  }, [user?.address]);
  useEffect(() => {
    let check = addresses.find((ad: any) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  const validateCoupon = z.object({
    coupon: z.string(),
  });
  const applyCouponHandler = async (e: any) => {
    e.preventDefault();
    setCouponLoading(true);
    const res = await applyCoupon(coupon, user._id);
    if (res.error) {
      setCouponLoading(false);
      setError(res.error);
    } else {
      setCouponLoading(false);
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };
  const placeOrderHandler = async () => {
    try {
      setPlaceOrderLoading(true);
      if (paymentMethod == "") {
        toast.error("Please choose a payment method.");
        return;
      } else if (!selectedAddress) {
        toast.error("Please choose a shipping address.");
        return;
      }
      try {
        // const response = await fetch("/api/order/create", {
        //   cache: "no-store",

        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({

        //   }),
        // });
        const res = await createOrder({
          products: cart.products,
          shippingAddress: selectedAddress,
          paymentMethod,
          total:
            totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
          totalBeforeDiscount: cart.cartTotal,
          couponApplied: coupon,
          user_id: user._id,
        });
        if (res?.error) {
          console.log(res.error);
        } else {
          router.push(`/order/${res?.order_id}`);
        }
      } catch (error) {
        console.error(error);
        // Handle errors here
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* payment: */}
      <div className=" justify-center items-center">
        {!profile && (
          <div className="">
            <h3 className="text-xl text-black">Payment Method</h3>
          </div>
        )}
        {paymentMethods.map((pm: any, i: number) => (
          <label
            htmlFor={pm.id}
            className="p-[1rem] flex items-center gap-[10px] cursor-pointer rounded-sm hover:bg-[#f5f5f5] mt-[1rem] w-[300px] justify-center"
            key={pm.id}
            onClick={() => setPaymentMethod(pm.id)}
            style={{ background: `${paymentMethod == pm.id ? "#f5f5f5" : ""}` }}
          >
            <div className="flex">
              <input
                type="radio"
                name="payment"
                id={pm.id}
                defaultChecked={paymentMethod == pm.id}
              />
              <Image
                src={`/images/checkout/${pm.id}.webp`}
                alt={""}
                width={60}
                height={40}
                className="gap-[2rem]"
              />
            </div>
            <div className="payment_item_col">
              <p className="text-[#999] text-[12px] flex flex-wrap gap-[10px]">
                Pay with {pm.name}
              </p>
              <span className="flex items-center justify-between text-[14px] ">
                {pm.images.length > 0
                  ? pm.images.map((img: any) => (
                      <Image
                        key={`/images/payment/${img}.webp`}
                        src={`/images/payment/${img}.webp`}
                        alt="_"
                        width={35}
                        height={25}
                      />
                    ))
                  : ""}
              </span>
            </div>
          </label>
        ))}
      </div>
      {/*  Summary */}
      <div className="mt-[1rem]">
        <div className="header_">
          <h3 className="text-black text-2xl font-bold">Order Summary</h3>
        </div>
        <div className="mt-[10px] flex">
          <form
            onSubmit={(e) => applyCouponHandler(e)}
            className="flex flex-col gap-[5px]  min-w-full"
          >
            <Input
              type="text"
              placeholder="*Coupon"
              onChange={(e: any) => setCoupon(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="mt-[-10px] w-full h-[40px] bg-black text-whitefont-[600]  text-white rounded-md"
            >
              {couponLoading ? "Loading..." : " Apply Coupon"}
            </Button>
            {error && <span className={" text-red-500"}>{error}</span>}

            <div className="mt-[10px] flex flex-col gap-[5px] ">
              <span className="bg-[#eeeeee75] p-[5px] text-[14px] border border-[#cccccc17]  ">
                {coupon === "" ? "Total: " : "Total before :"}
                <b>Rs. {cart.cartTotal}</b>
              </span>
              {Number(discount) > 0 && (
                <span className="discount bg-green-500 text-white p-[5px] text-[14px] border border-[#cccccc17]  ">
                  Coupon applied : <b className="text-[15px] ">- {discount}%</b>
                </span>
              )}
              {totalAfterDiscount < cart.cartTotal &&
                totalAfterDiscount != "" && (
                  <span className="bg-[#eeeeee75] p-[5px] text-[14px] border border-[#cccccc17]  ">
                    Total after :{" "}
                    <b className="text-[15px] ">Rs. {totalAfterDiscount}</b>
                  </span>
                )}
            </div>
          </form>
        </div>
        <button
          className={`mt-[1rem] max400:fixed max400:bottom-0 w-full h-[45px] website-theme-color-bg text-white font-[600] rounded-md ${
            paymentMethod == ""
              ? "website-theme-color-bg_light cursor-not-allowed"
              : ""
          }`}
          onClick={() => placeOrderHandler()}
          disabled={paymentMethod == "" ? true : false}
        >
          {placeOrderLoading ? "Loading..." : "Continue with payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPaymentandSummary;
