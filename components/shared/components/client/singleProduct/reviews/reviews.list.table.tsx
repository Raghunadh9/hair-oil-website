"use client";
import React, { useState } from "react";
import usePagination from "./reviews.pagination";
import { Pagination } from "@mui/material";
import Review from "./review.component";
import TableHeader from "./reviews.table.header";
import { v4 as uuidv4 } from "uuid";
const Table = ({
  reviews,
  allSizes,
  colors,
}: {
  reviews: any;
  allSizes: any;
  colors: any;
}) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);
  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className="w-full mt-[10px]">
      <div className="upto640:hidden">
        <TableHeader
          reviews={reviews}
          allSizes={[{ size: "All" }, ...allSizes]}
          colors={[{ color: "All", image: "" }, ...colors]}
        />
      </div>
      <div className="table_data">
        {_DATA.currentData().map((review: any, i: number) => (
          <div key={uuidv4()}>
            <Review review={review} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Table;
