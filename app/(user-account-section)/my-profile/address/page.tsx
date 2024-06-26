import { getUserById } from "@/components/lib/actions/user.actions";
import CheckoutShippingDetails from "@/components/shared/components/client/checkout/checkout.shipping.details";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { config } from "@/config/config";
export const metadata: Metadata = {
  title: `${config.websiteTitle}: My addresses`,
};
const ProfileAddressPage = async () => {
  const { userId } = auth();
  if (!userId) return;
  const user = await getUserById(userId);

  return (
    <div>
      {!userId ? (
        <div className="mx-[20px] mt-[30px] mb-[50px]">
          <div className="flex justify-center my-[20px]">
            Please &nbsp;
            <Link className="underline text-blue-600 " href={"/sign-in"}>
              login
            </Link>{" "}
            &nbsp;to continue...
          </div>
          <center>
            <Image
              src={"/images/notfound.png"}
              width={300}
              height={300}
              alt="_"
            />
          </center>
        </div>
      ) : (
        <div>
          <div className="mx-[100px] upto425:mx-0 my-[50px]">
            <h1 className="w-full text-center mb-[1rem] font-bold text-2xl">
              MY ADDRESSES
            </h1>
            <div className="flex justify-center">
              <Image
                src={"/images/illustrations/delivery-address.png"}
                width={400}
                height={400}
                alt="_"
              />
            </div>
            <CheckoutShippingDetails user={user} profile />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddressPage;
