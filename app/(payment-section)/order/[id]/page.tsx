import { getorderDetailsById } from "@/components/lib/actions/order.actions";
import RazorPayPurchaseOrder from "@/components/shared/components/client/order/razorpay.purchase.order";
import OrderProductStatusDrawer from "@/components/shared/components/order/order.product.status.drawer";
import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const slug = params.id;
  const orderData = await getorderDetailsById(slug);
  const orderId = orderData._id;
  return (
    <div>
      <div className="orderData from640:mx-[3rem] from640:my-[2rem] ">
        <div
          className={`from768:max-w-4xl from768:mx-auto from768:grid from768:grid-cols-10 from768:gap-4`}
        >
          <div className="shadow-xl flex flex-col from768:col-span-6">
            <div className="flex flex-col gap-[10px] p-[1rem] border-b border-b-[#eee] ">
              <div className=" flex items-center gap-[5px] text-[#666] ">
                Orders <IoIosArrowForward /> Order <IoIosArrowForward /> ID{" "}
              </div>
              <div className="flex">
                <b>Full Order Id:</b>&nbsp;
                <p>{orderId}</p>
              </div>
              <div className="flex items-center gap-[10px] ">
                <b>Payment Status:</b>
                {orderData.isPaid ? (
                  <>
                    <p className="text-green-500">Successfully Order Placed</p>
                    <Image
                      src={"/images/order/verified.png"}
                      alt="Paid"
                      width={30}
                      height={30}
                    />
                  </>
                ) : (
                  <>
                    <p>Unpaid</p>
                    <Image
                      src={"/images/order/unverified.png"}
                      alt="Un paid"
                      width={30}
                      height={30}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="p-[1rem] ">
              {orderData.products.map((product: any) => (
                <div
                  className="relative flex gap-[10px] p-[10px] my-[10px] mx-[0] border-b border-b-[#eee] "
                  key={product._id}
                >
                  <div className="product_img">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={120}
                      height={160}
                      className="object-cover rounded-md "
                    />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <h1 className="text-[14px] font-bold ">
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className=" flex items-center gap-[10px] bg-[#eee] w-fit py-[3px] px-[10px] rounded-md ">
                      <Image
                        className="rounded-full object-cover shadow-md"
                        src={product.color.image}
                        alt=""
                        width={35}
                        height={35}
                      />{" "}
                      / {product.size}
                    </div>
                    <div className="mt-[10px] ">
                      Rs. {product.price} x {product.qty} Qty.
                    </div>
                    <div className="mt-[10px] ">
                      <span>
                        <b> Product Order Status: </b>
                      </span>
                      <span
                        className={`${
                          product.status == "Not Processed"
                            ? "text-[#e3503e]"
                            : product.status == "Processing"
                            ? "text-[#54b7d3]"
                            : product.status == "Dispatched"
                            ? "text-[#1e91cf]"
                            : product.status == "Cancelled"
                            ? "text-[#e3d4d4]"
                            : product.status == "Completed"
                            ? "text-[#4cb64c]"
                            : ""
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <div className="absolute right-[1rem] bottom-[0rem] upto375:bottom-[-5px] font-bold">
                      Rs. {(product.price * product.qty).toFixed(2)}
                    </div>
                  </div>

                  {/* <OrderProductStatusDrawer status={product.status} /> */}
                </div>
              ))}
              <div className="mt-[1rem] ">
                {orderData.couponApplied ? (
                  <>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between  ">
                      <span>Subtotal</span>
                      <span> Rs. {orderData.totalBeforeDiscount}</span>
                    </div>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between  ">
                      <span>
                        Coupon Applied{" "}
                        <p className="text-green-500 font-bold">
                          ({orderData.couponApplied}){" "}
                        </p>
                      </span>
                      <span>
                        - Rs.{" "}
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between  ">
                      <span>Tax price</span>
                      <span> + Rs. {orderData.taxPrice}</span>
                    </div>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between   border-t border-gray-300 ">
                      <span>TOTAL TO PAY</span>
                      <span className=" font-extrabold text-[25px]">
                        {" "}
                        Rs. {orderData.total}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between  ">
                      <span>Tax price</span>
                      <span> + Rs. {orderData.taxPrice}</span>
                    </div>
                    <div className="py-[5px] px-[1rem] flex items-center justify-between   border_top">
                      <span>TOTAL TO PAY</span>
                      <span className="font-extrabold text-[30px]">
                        {" "}
                        Rs. {orderData.total}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="h-fit shadow-xl from768:col-span-4 py-[1rem] px-0 ">
            <center>
              <div className="py-0 px-[1rem] ">
                <h1 className="text-black text-2xl font-bold mt-[1rem] border-b border-gray-300 ">
                  Customer&apos;s Order
                </h1>
                <div className="pb-[10px] ">
                  <div className="flex gap-[10px] items-center">
                    <Image
                      src={orderData.user.image}
                      alt=""
                      width={45}
                      height={45}
                      className="rounded-full object-cover "
                    />
                    <div className="">
                      <span className="block font-[600]">
                        {orderData.user.name}
                      </span>
                      <span className="block">{orderData.user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pb-[10px] ">
                  <h2 className="text-[#40404d] text-[17px] font-bold mt-[10px]">
                    Shipping Address
                  </h2>
                  <span className="block">
                    {orderData.shippingAddress.firstName}{" "}
                    {orderData.shippingAddress.lastName}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.address1}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.address2}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.state},
                    {orderData.shippingAddress.city}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.zipCode}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.country}
                  </span>
                </div>
                <div className="border-t border-gray-300 pb-[10px] ">
                  <h2 className="text-[#40404d] text-[17px] font-bold mt-[10px]">
                    Billing Address
                  </h2>
                  <span className="block">
                    {orderData.shippingAddress.firstName}{" "}
                    {orderData.shippingAddress.lastName}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.address1}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.address2}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.state},
                    {orderData.shippingAddress.city}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.zipCode}
                  </span>
                  <span className="block">
                    {orderData.shippingAddress.country}
                  </span>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      {/* <div className="fixed bottom-0 right-0 left-0">
        <center>
          {!orderData.isPaid && (
            <div className="w-full py-[1rem] px-[1rem]">
              {orderData.paymentMethod == "razorPay" && (
                <RazorPayPurchaseOrder
                  amount={orderData.total}
                  orderId={orderId}
                />
              )}
            </div>
          )}
        </center>
      </div> */}
    </div>
  );
};

export default OrderPage;
