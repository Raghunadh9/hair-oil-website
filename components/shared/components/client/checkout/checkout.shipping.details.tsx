"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import { error } from "console";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FaIdCard } from "react-icons/fa6";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "@/app/(payment-section)/checkout/page.module.css";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropupCircle } from "react-icons/io";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "@/components/lib/actions/user.actions";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// zod schema validation:
const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(20, { message: "First name must be less than 20 characters long." }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(20, { message: "Last name must be less than 20 characters long." }),
  phoneNumber: z
    .string()
    .regex(phoneRegExp, { message: "Phone number is not valid." }),
  state: z
    .string()
    .min(2, { message: "State name should contain 2-60 characters." })
    .max(60, { message: "State name should contain 2-60 characters." }),
  city: z
    .string()
    .min(2, { message: "City name should contain 2-60 characters." })
    .max(60, { message: "City name should contain 2-60 characters." }),
  zipCode: z
    .string()
    .min(2, { message: "ZipCode/Postal should contain 2-30 characters." })
    .max(30, { message: "ZipCode/Postal should contain 2-30 characters." }),
  address1: z
    .string()
    .min(5, { message: "Address Line 1 should contain 5-100 characters." })
    .max(100, { message: "Address Line 1 should contain 5-100 characters." }),
  address2: z
    .string()
    .min(5, { message: "Address Line 2 should contain 5-100 characters." })
    .max(100, { message: "Address Line 2 should contain 5-100 characters." }),
  country: z
    .string()
    .min(2, { message: "Country name should contain 2-60 characters." })
    .max(60, { message: "Country name should contain 2-60 characters." }),
});
type FormField = z.infer<typeof schema>;
const CheckoutShippingDetails = ({
  user,
  profile,
}: {
  user: TypeofDBUser;
  profile?: any;
}) => {
  const [addresses, setAddresses] = useState<any>(user?.address || []);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (user?.address) {
      setAddresses(user.address);
    }
  }, [user?.address]);
  const changeActiveHandler = async (id: any) => {
    const res = await changeActiveAddress(id, user._id);
    setAddresses(res.addresses);
  };
  const deleteHandler = async (id: string) => {
    const res = await deleteAddress(id, user._id);
    setAddresses(res.addresses);
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      console.log(data);
      const res = await saveAddress(data, user._id);
      setAddresses(res.addresses);
    } catch (error: any) {
      setError("root", { message: error });
    }
  };
  return (
    <div className="flex flex-col items-center gap-[1rem] upto640:text-[11px]">
      {!profile && (
        <div className="w-full pb-[5px] border-b border-b-[#e5e5e5]  ">
          <h2 className="text-xl text-black">Your Addresses</h2>
        </div>
      )}
      <div className="flex flex-col gap-[1rem] w-full ">
        {addresses.map((address: any, i: number) => (
          <div className="relative" key={address._id}>
            <div
              className={`${styles.address} shadow-lg ${
                address.active && styles.active
              }`}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div
                className="absolute top-[1rem] right-[1rem] text-2xl "
                onClick={() => deleteHandler(address._id)}
              >
                <AiFillCloseCircle className="fill-red-500" />
              </div>
              {!profile ? (
                <div className="h-[90px] w-[90px] grid place-items-center ">
                  <Image
                    src={user.image}
                    alt=""
                    height={90}
                    width={90}
                    className="rounded-full shadow-md object-cover"
                  />
                </div>
              ) : (
                <div className="h-[90px] w-[90px] grid place-items-center ">
                  <Image
                    src={user.image}
                    alt=""
                    height={90}
                    width={90}
                    className="rounded-full shadow-md object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col py-[10px] px-[0] ">
                <span className="flex items-center gap-[5px] ">
                  <FaIdCard className="fill-[#666] " />
                  {address.firstName.toUpperCase()}{" "}
                  {address.lastName.toUpperCase()}
                </span>
                <span className="flex items-center gap-[5px] ">
                  <GiPhone className="fill-[#666] " />
                  {address.phoneNumber}
                </span>
              </div>
              <div className="flex flex-col py-[10px] px-[0] ">
                <span className="flex items-center gap-[5px] ">
                  <FaMapMarkerAlt className="fill-[#666] " />
                  {address.address1}
                </span>
                <span className="flex items-center gap-[5px] ">
                  {address.address2}
                </span>
                <span className="flex items-center gap-[5px] ">
                  {address.city},{address.state},{address.country}
                </span>
                <span className="flex items-center gap-[5px] ">
                  {address.zipCode}
                </span>
              </div>
              <span
                className={`absolute bottom-[1rem] right-[1rem] text-green-400 text-[12px] ${styles.before__}`}
                style={{
                  display: `${!address.active && "none"}`,
                }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="h-[45px] w-full bg-transparent cursor-pointer text-black border border-black"
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <span className="flex items-center justify-center gap-[5px] ">
            <IoMdArrowDropupCircle className="text-[2rem] fill-[#222]" />
          </span>
        ) : (
          <span className="flex items-center justify-center gap-[5px] max400:p-[2px] disabled:blue_col_bg_disabled">
            ADD NEW ADDRESS
            <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="firstName"
            {...register("firstName")}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
          <Input type="text" placeholder="lastName" {...register("lastName")} />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
          <Input
            type="text"
            placeholder="phoneNumber"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message}</div>
          )}
          <Input type="text" placeholder="state" {...register("state")} />
          {errors.state && (
            <div className="text-red-500">{errors.state.message}</div>
          )}
          <Input type="text" placeholder="city" {...register("city")} />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
          <Input type="text" placeholder="zipCode" {...register("zipCode")} />
          {errors.zipCode && (
            <div className="text-red-500">{errors.zipCode.message}</div>
          )}
          <Input type="text" placeholder="address1" {...register("address1")} />
          {errors.address1 && (
            <div className="text-red-500">{errors.address1.message}</div>
          )}
          <Input type="text" placeholder="address2" {...register("address2")} />
          {errors.address2 && (
            <div className="text-red-500">{errors.address2.message}</div>
          )}
          <Input type="text" placeholder="country" {...register("country")} />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}

          <Button
            disabled={isSubmitting}
            type="submit"
            className="website-theme-color-bg"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default CheckoutShippingDetails;
