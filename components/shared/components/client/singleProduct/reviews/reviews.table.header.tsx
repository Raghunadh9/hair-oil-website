"use client";
import React, { useState } from "react";
import TableSelect from "./reviews.table.select";

const TableHeader = ({
  reviews,
  allSizes,
  colors,
}: {
  reviews: any;
  allSizes: any;
  colors: any;
}) => {
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [order, setOrder] = useState();
  const ratings = [
    { text: "All", value: "" },
    {
      text: "5 star",
      value: 5,
    },
    {
      text: "4 star",
      value: 4,
    },
    {
      text: "3 star",
      value: 3,
    },
    {
      text: "2 star",
      value: 2,
    },
    {
      text: "1 star",
      value: 1,
    },
  ];
  const orderOptions = [
    {
      text: "Recommended",
      value: "Recommended",
    },
    {
      text: "Most recent to oldest",
      value: "Most recent to oldest",
    },
    {
      text: "Oldest to most recent",
      value: "Oldest to most recent",
    },
  ];
  return (
    <div className="w-full flex items-center justify-end gap-[1rem] py-0 px-[1rem]">
      {" "}
      <TableSelect
        property={rating}
        text={"Rating"}
        data={ratings.filter((x: any) => x !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={size}
        text={"Size"}
        data={allSizes.filter((x: any) => x.size !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={order}
        text={"Order"}
        data={orderOptions.filter((x: any) => x.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
};

export default TableHeader;
