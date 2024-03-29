"use client";
import { getorderDetailsById } from "@/components/lib/actions/order.actions";
import { LoadingSpinner } from "@/components/shared/components/loading-spinner/loading-spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderTracking = () => {
  const router = useRouter();

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const searchOrderById = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
    if (checkForValidMongoDbID.test(orderId)) {
      await getorderDetailsById(orderId)
        .then((res) => router.push(`/order/${orderId}`))
        .catch((err) => {
          toast.error("Order not found.");
          setLoading(false);
        });
    } else {
      toast.error("Order Id is invalid.");
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="flex justify-center pt-[50px] ">
        <div className="text-2xl font-bold underline">Order Tracking</div>
      </div>
      <div className="flex justify-center">
        <Image
          src={"/images/order/tracking.png"}
          width={100}
          height={100}
          alt="_"
        />
      </div>
      <div className="website-theme-color-bg_light py-[30px]  mb-[50px]">
        <p className="text-center mb-[20px]">Track by Order ID:</p>
        <div className="flex justify-center flex-col">
          <div className="mt-[10px] flex justify-center">
            <form
              onSubmit={(e) => searchOrderById(e)}
              className="flex flex-col gap-[5px]  min-w-[45%] upto640:min-w-full"
            >
              <Input
                type="text"
                className="input-field"
                placeholder="Order ID"
                onChange={(e: any) => setOrderId(e.target.value)}
                required
                minLength={24}
              />
              <Button
                type="submit"
                className="mt-[10px] w-full h-[40px] bg-black text-whitefont-[600]  text-white rounded-md"
              >
                {loading ? (
                  <div className="flex gap-[10px]">
                    <LoadingSpinner /> Loading...
                  </div>
                ) : (
                  "Search Order"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
