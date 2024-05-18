import { getSavedCartForUser } from "@/components/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import styles from "./page.module.css";
import CheckoutShippingDetails from "@/components/shared/components/client/checkout/checkout.shipping.details";
import CheckoutUserProducts from "@/components/shared/components/checkout/checkout.user.products";
import CheckoutPaymentandSummary from "@/components/shared/components/client/checkout/checkout.payment.and.summary";
import { Metadata } from "next";
import { config } from "@/config/config";
import { Badge } from "@/components/ui/badge";
import { ICONS } from "@/components/shared/components/icons";

export const metadata: Metadata = {
  title: `${config.websiteTitle}: Secure Checkout`,
};
const CheckoutPage = async () => {
  const { userId } = auth();
  if (!userId) return;
  const CartandUserData = await getSavedCartForUser(userId);
  const data = CartandUserData?.cart;
  const user = CartandUserData?.user;
  return (
    <div>
      <div className="flex justify-evenly items-center py-[20px] px-[10px] website-theme-color-bg_light">
        <div className="flex">
          <Badge className="website-theme-color-bg">Cart</Badge>
          {ICONS.rightArrow}
        </div>
        <div className="flex">
          <Badge className="website-theme-color-bg">Checkout</Badge>
          {ICONS.rightArrow}
        </div>

        <Badge className="website-theme-color-bg">Order</Badge>
      </div>

      <div className="justify-center items-center flex my-[40px]">
        {" "}
        <h1 className="text-black text-2xl font-bold">Checkout</h1>
      </div>
      <div className={`from640:mx-[10rem] mt-2 ${styles.checkout} `}>
        <div className="">
          <CheckoutUserProducts cart={data} />
          <CheckoutShippingDetails user={user} />
        </div>
        <div className="">
          <CheckoutPaymentandSummary user={user} cart={data} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
