import { Rating } from "@mui/material";

const Review = ({ review }: { review: any }) => {
  const { email } = review.reviewBy;
  return (
    <>
      <div className="review mb-[10px] mt-[20px] font-bold">
        <div className="flex mb-[10px]">
          <div className="relative float-left w-[3.2rem] h-[3.2rem] leading-[3.2rem] mr-[12px] text-center rounded-[50%] text-black font-bold bg-[#e9e9e9]">
            {email.slice(0, 1).toUpperCase()}
          </div>
          <Rating
            size={"medium"}
            name="half-rating-read"
            defaultValue={review.rating}
            readOnly
            style={{ color: "#F6A429" }}
          />
          <div className=" text-[13px] mt-[2px] ml-[1rem]">
            {review?.updatedAt?.slice(0, 10)}
          </div>
        </div>
        <span className="uppercase text-[12px] absolute mt-[-35px] ml-[68px]">
          {email}&nbsp; &nbsp;
          <span className="text-white website-theme-color-bg p-[3px] rounded-md">
            Size: {review.size}
          </span>
          &nbsp; &nbsp;
        </span>
        <span>
          {" "}
          <p className=" text-[16px] ml-[14px]">{review.review}</p>
        </span>
      </div>
    </>
  );
};

export default Review;
