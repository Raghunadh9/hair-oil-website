import { getSavedCartForUser } from "@/components/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import styles from "./page.module.css";
import CheckoutShippingDetails from "@/components/shared/components/client/checkout/checkout.shipping.details";
import CheckoutUserProducts from "@/components/shared/components/checkout/checkout.user.products";
import CheckoutPaymentandSummary from "@/components/shared/components/client/checkout/checkout.payment.and.summary";

const CheckoutPage = async () => {
  const { userId } = auth();
  if (!userId) return;
  const CartandUserData = await getSavedCartForUser(userId);
  const data = CartandUserData?.cart;
  const user = CartandUserData?.user;

  return (
    <div>
      <div className={`from640:mx-[10rem] mt-2 ${styles.checkout} `}>
        <div className="">
          <CheckoutShippingDetails user={user} />
          <CheckoutUserProducts cart={data} />
        </div>
        <div className="">
          <CheckoutPaymentandSummary user={user} cart={data} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
