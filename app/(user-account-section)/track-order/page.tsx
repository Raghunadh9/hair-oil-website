import { getorderDetailsById } from "@/components/lib/actions/order.actions";
import { Input } from "@/components/ui/input";
import { auth } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

const OrderTracking = () => {
  const { userId } = auth();
  if (!userId) return;
  const searchOrderById = async (formData: FormData) => {
    const order_id = formData.get("order_id") as string;
    const res = await getorderDetailsById(order_id);
    if (res?.error) {
      toast.error(res.error);
    }
  };
  return (
    <div className="">
      <div className="flex justify-center py-[50px] ">
        <div className="text-2xl font-bold underline">Order Tracking</div>
      </div>
      <div className="website-theme-color-bg_light py-[30px] mx-[500px] mb-[50px]">
        <p className="text-start mb-[20px]">Track by Order ID:</p>
        <div className="flex justify-center flex-col">
          {/* <form action={searchOrderById}>
            <Input
              type="text"
              name="order_id"
              placeholder="Order id"
              className="max-w-md mb-[20px]"
              minLength={24}
            />
            <Button className="website-theme-color-bg">Track</Button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
