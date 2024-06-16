"use client";
import React, { useEffect, useState } from "react";
import Select from "./review.select";
import { Rating } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "../../../loading-spinner/loading-spinner";
import { createProductReview } from "@/components/lib/actions/product.actions";
import { Button } from "@nextui-org/react";

const AddReview = ({
  product,
  setReviews,
  user,
}: {
  product: any;
  setReviews: any;
  user: any;
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];

    if (!rating) {
      msgs.push({
        msg: "Please add a rating !",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please add a review !",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      const errorMessages = msgs
        .filter((check) => check.type === "error")
        .map((check) => check.msg);

      // Join the error messages into a single string
      const errorMessage = errorMessages.join("\n");

      toast.error(errorMessage);
    } else {
      try {
        await createProductReview(rating, review, user.id, product._id)
          .then((res) => {
            setReviews(res.reviews);

            setRating(0);
            setReview("");
            toast.success("Successfully added product review");
          })
          .catch((err) => {
            throw new Error(err);
          });
      } catch (error: any) {
        console.error(error.message);
        // Handle errors here
      }
    }
    setLoading(false);
  };

  return (
    <div className="mt-[1rem] p-[1rem] bg-[#f7f8f8] flex flex-col gap-[1rem] rounded-md  ">
      <div className="w-full flex flex-col gap-[1rem]">
        <textarea
          className="border-none outline-none resize-none min-h-[150px] p-[1rem]"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <div className="flex gap-[2rem]">
          <div className="">
            <Rating
              name="half-rating-read"
              defaultValue={0}
              value={rating}
              onChange={(e: any) => setRating(e.target.value)}
              precision={0.5}
              style={{ color: "#F6A429" }}
            />
          </div>
          <span className="">
            {rating}/{5}
          </span>
        </div>
        <Button
          onClick={() => handleSubmit()}
          disabled={loading}
          className={`w-full h-[50px] website-theme-color-bg text-[18px] text-white font-[900] mt-[1rem] cursor-pointer flex items-center justify-center gap-[10px] ${
            loading ? "cursor-not-allowed bg-[#cccccc4f]" : ""
          }`}
        >
          {" "}
          {loading ? (
            <div className="flex gap-[10px]">
              <LoadingSpinner /> Loading...
            </div>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddReview;
