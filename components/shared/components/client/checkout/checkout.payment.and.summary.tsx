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

import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { ICONS } from "../../icons";
import { useCartStore } from "@/components/store/cart.store";
const CheckoutPaymentandSummary = ({
  cart,
  user,
  profile,
}: {
  cart: any;
  user: TypeofDBUser;
  profile?: any;
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [addresses, setAddresses] = useState<any>(user?.address || []);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [subTotal, setSubtotal] = useState(0);

  const router = useRouter();
  const cart_ = useCartStore((state: any) => state.cart.cartItems);

  const totalSaved: number = cart_.reduce((acc: any, curr: any) => {
    // Add the 'saved' property value to the accumulator
    return acc + curr.saved * curr.qty;
  }, 0);

  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [placeOrderLoading, setPlaceOrderLoading] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user?.address) {
      setAddresses(user.address);
    }
    setSubtotal(
      cart_.reduce((a: any, c: any) => a + c.price * c.qty, 0).toFixed(2)
    );
  }, [user?.address]);
  useEffect(() => {
    let check = addresses.find((ad: any) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  const carttotal = Number(subTotal) + totalSaved;

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
  const buttonText = () => {
    if (paymentMethod === "") {
      return "Please select the payment method";
    } else if (paymentMethod === "cash") {
      return "Continue with COD";
    } else if (paymentMethod === "razorPay") {
      return "Continue with RazorPay";
    }
  };
  const placeOrderHandler = async () => {
    try {
      setPlaceOrderLoading(true);
      if (paymentMethod == "") {
        toast.error("Please choose a payment method.");
        return;
      } else if (!selectedAddress) {
        toast.error(
          "Please choose at least one shipping address by clicking one of the addresses you have."
        );
        setPlaceOrderLoading(false);
        return;
      }
      try {
        const res = await createOrder({
          products: cart.products,
          shippingAddress: selectedAddress,
          paymentMethod,
          total:
            totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
          totalBeforeDiscount: cart.cartTotal,
          couponApplied: coupon,
          user_id: user._id,
          totalSaved,
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
            <h3 className="text-black text-2xl font-bold">Payment Method</h3>
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
              className="input-field"
              placeholder="*Coupon"
              onChange={(e: any) => setCoupon(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="mt-[10px] w-full h-[40px] bg-black text-whitefont-[600]  text-white rounded-md"
            >
              {couponLoading ? (
                <div className="flex gap-[10px]">
                  <LoadingSpinner /> Loading...
                </div>
              ) : (
                " Apply Coupon"
              )}
            </Button>
            {error && <span className={" text-red-500"}>{error}</span>}
            {/*  */}
            <div className="website-theme-color-bg_light website-theme-color font-bold flex p-[12px] rounded-t-lg items-center gap-[20px] justify-start">
              <div className="">{ICONS.discount}</div>
              <div className="">
                Yay! You have saved{" "}
                <span className="underline">₹{totalSaved}</span> on this order
              </div>
            </div>
            <div className="bg-white">
              <div className="flex text-[14px] items-center justify-between ">
                <span>Total MRP</span>
                <span>Rs. {carttotal}</span>
              </div>

              <div className="flex text-[14px] items-center justify-between ">
                <span>Cart Discount</span>
                <span className="website-theme-color">- ₹ {totalSaved}</span>
              </div>
              <div className="flex text-[14px] items-center justify-between ">
                <span>Shipping Charges</span>
                <span className="text-[17px]  website-theme-color">Free</span>
              </div>
              <div className="flex items-center justify-between font-[700] text-[17px] border-t-2 border-black pt-[1rem] mt-[1rem] ">
                <span> {coupon === "" ? "Total: " : "Total before :"}</span>
                <span>Rs. {cart.cartTotal}</span>
              </div>
            </div>

            <div className="mt-[10px] flex flex-col gap-[5px] ">
              {/* <span className="bg-[#eeeeee75] p-[5px] text-[14px] border border-[#cccccc17]  ">
                {coupon === "" ? "Total: " : "Total before :"}
                <b>Rs. {cart.cartTotal}</b>
              </span> */}
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
        <Button
          className={`mt-[1rem] upto425:fixed upto425:bottom-0 w-full h-[45px] website-theme-color-bg text-white font-[600] rounded-md ${
            paymentMethod == ""
              ? "website-theme-color-bg_light cursor-not-allowed"
              : ""
          }`}
          onClick={() => placeOrderHandler()}
          disabled={
            paymentMethod == ""
              ? true
              : false && placeOrderLoading && addresses.length == 0
          }
        >
          {placeOrderLoading ? (
            <div className="flex gap-[10px]">
              <LoadingSpinner /> Loading...
            </div>
          ) : (
            buttonText()
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPaymentandSummary;
