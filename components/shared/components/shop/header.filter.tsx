"use client";
import { GetDataforBrowsePage } from "@/components/lib/actions/data.browse";
import { sortingOptions } from "@/config/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const HeaderFilter = () => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const sortQuery = searchParams.get("sort") || "";
  function sortHandler(res: any) {
    if (res == "") {
      router.push(`?sort=`);
    } else {
      router.push(`?sort=${res}`);
    }
  }
  return (
    <div>
      <div className="flex items-center gap-[10px] absolute right-[1rem]">
        <span>Sort by</span>
        <div
          className={"relative flex items-center"}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button className="h-[40px] w-[180px] flex items-center justify-around text-[14px] gap-[5px] bg-transparent border-2 border-[#ccc] cursor-pointer">
            {sortQuery == ""
              ? "Recommend"
              : sortingOptions?.find((x: any) => x.value == sortQuery).name}
            <div
              style={{ transform: `${show ? "rotate(180deg)" : "rotate(0"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            className="absolute top-full left-0 bg-white p-4 z-50 w-full h-48 overflow-y-auto transform transform-origin-top scale-y-0 transition-transform duration-200"
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {sortingOptions.map((option: any, i: any) => (
              <li
                className="h-10 text-xs cursor-pointer hover:font-[600]"
                key={option.name}
                onClick={() => sortHandler(option.value)}
              >
                <a className="flex items-center justify-between">
                  {sortQuery == option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}{" "}
                  {sortQuery == option.value ? <BsCheckLg /> : ""}
                  {sortQuery !== option.value ? (
                    <div className={"hidden hover:block"}>
                      <BsCheckLg />
                    </div>
                  ) : (
                    ""
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderFilter;
