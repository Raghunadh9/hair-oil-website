import { ProfilePageordersLinks } from "@/config/constants";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import styles from "./page.module.css";
import slugify from "slugify";
import { getAllUserOrders } from "@/components/lib/actions/user.actions";
import { Metadata } from "next";
import { config } from "@/config/config";
export const metadata: Metadata = {
  title: `${config.websiteTitle}: My Orders`,
};
const ProfilePageOrders = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId } = auth();
  const tab = Number(searchParams.tab) || 0;
  if (typeof searchParams.q !== "string") return;
  const filter = searchParams.q?.includes("__")
    ? searchParams.q?.split("__")[1]
    : "";
  const activeFilter = searchParams.q?.split("__")[0];
  if (!userId) return;
  const orders = await getAllUserOrders(userId, filter);
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
        <div className={`${styles.orders} mx-[100px] upto640:mx-0 my-[50px] `}>
          <div className={styles.header}>
            <h1 className="font-bold text-2xl">MY ORDERS</h1>
          </div>
          <div className="upto640:overflow-x-auto">
            <nav>
              <ul>
                {ProfilePageordersLinks.map((link: any, i: any) => (
                  <li
                    key={link.name}
                    className={
                      slugify(link.name, { lower: true }) == activeFilter
                        ? `${styles.active} text-center`
                        : "text-center"
                    }
                  >
                    <Link
                      href={`/my-profile/orders?tab=${tab}&q=${slugify(
                        link.name,
                        {
                          lower: true,
                        }
                      )}__${link.filter}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <table>
              <thead>
                <tr>
                  <td>Order Id</td>
                  <td>Products</td>
                  <td>Payment Method</td>
                  <td>Total</td>
                  <td>Paid</td>
                  <td>Status</td>
                  <td>view</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, index: number) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td className={styles.orders__images}>
                      {order.products.map((p: any) => (
                        <img src={p.image} key={p._id} alt="" />
                      ))}
                    </td>
                    <td>
                      {order.paymentMethod == "razorPay"
                        ? "RazorPay"
                        : order.paymentMethod == "credit_card"
                        ? "Credit Card"
                        : "COD"}
                    </td>
                    <td>Rs. {order.total}</td>
                    <td className={styles.orders__paid}>
                      {order.isPaid ? (
                        <Image
                          src="/images/order/verified.png"
                          alt=""
                          width={25}
                          height={25}
                        />
                      ) : (
                        <Image
                          src="/images/order/unverified.png"
                          alt=""
                          width={25}
                          height={25}
                        />
                      )}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <FiExternalLink />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="flex justify-center">
                <div className="">
                  <Image
                    src={"/images/illustrations/no-orders-found.png"}
                    alt="_"
                    height={400}
                    width={400}
                  />
                  <h1 className="font-bold text-center">No Orders Found!!!</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageOrders;
