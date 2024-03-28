import { getUserById } from "@/components/lib/actions/user.actions";
import CheckoutShippingDetails from "@/components/shared/components/client/checkout/checkout.shipping.details";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
              My Addresses
            </h1>
            <CheckoutShippingDetails user={user} profile />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddressPage;
