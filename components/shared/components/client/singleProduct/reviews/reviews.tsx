"use client";
import { Rating } from "@mui/material";
import React, { useState } from "react";
import AddReview from "./review.add";
import Table from "./reviews.list.table";
import { v4 as uuidv4 } from "uuid";
import { useClerk } from "@clerk/nextjs";
import Router, { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";

const Reviews = ({ product }: { product: any }) => {
  const { user } = useClerk();
  const router = useRouter();

  const [reviews, setReviews] = useState(product.reviews);
  return (
    <div className={"mt-[1rem] max-w-full w-full "}>
      <div className="">
        <h1 className="upto768:!text-[20px]">
          Customer Reviews ({product.reviews.length})
        </h1>
        <div className="mt-[1rem] w-full h-[250px] bg-[#f7f8fa] p-[3rem] flex items-center gap-[10rem] upto930:gap-[3rem] upto930:p-[1rem] upto768:flex-col upto768:h-full ">
          <div className="">
            <span>Average Rating</span>
            <div className="mt-[1rem] flex items-center gap-[10px] font-[700] text-[20px]">
              <div className="flex">
                <Rating
                  className="w-[35px] h-[35px] "
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                  style={{ color: "#F6A429" }}
                />
                {product.rating == 0 ? (
                  <div className="ml-[6rem] upto640:text-[15px]">
                    No Reviews yet!
                  </div>
                ) : (
                  <div className="ml-[6rem] upto640:text-[15px]">
                    {product.rating.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1rem] ml-[2rem] upto768:hidden w-full">
            {product.ratings.map((rating: any, i: number) => {
              return (
                <div key={uuidv4()} className="flex items-center gap-[10px] ">
                  <Rating
                    className="w-[30px] h-[30px] ml-[10px] mr-[10px] "
                    name="half-rating-read"
                    defaultValue={5 - i}
                    readOnly
                    style={{ color: "#F6A429" }}
                  />
                  <div
                    className="h-[20px] bg-[#308D94] rounded-[2px] border-[4px] border-[#308D94]"
                    style={{ width: `${rating.percentage}%` }} // Set width based on percentage
                  ></div>{" "}
                  <span className="text-[15px] font-bold flex ">
                    {rating.percentage} <span>%</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {user ? (
          <AddReview product={product} setReviews={setReviews} user={user} />
        ) : (
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full h-[50px] website-theme-color-bg text-[18px] text-white font-[900] mt-[1rem] cursor-pointer "
          >
            Login to add review
          </button>
        )}
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
};

export default Reviews;
