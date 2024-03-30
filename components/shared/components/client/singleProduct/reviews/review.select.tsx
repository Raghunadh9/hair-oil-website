"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoArrowDown } from "react-icons/io5";

const Select = ({
  property,
  text,
  data,
  handleChange,
}: {
  property: any;
  text: string;
  data: any;
  handleChange: any;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className=" flex item gap-[10px] text-[14px] upto425:block">
      {text}:
      <div
        className="relative min-w-[80px] max-w-[170px] min-h-[40px] border border-[#CCC] flex items-center justify-center gap-[5px] py-0 px-[10px] font-[700] cursor-pointer"
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${
            text == "Style" && property.color && `${property.color}`
          }`,
        }}
      >
        {" "}
        {/* img: h-[30px] w-[30px] rounded-full object-fit-cover  */}
        <span
          className="flex"
          style={{
            padding: "0 5px",
          }}
        >
          {text == "Size" ? (
            property || `Select ${text}`
          ) : text == "Style" && property.image ? (
            <Image
              src={property.image}
              width={25}
              height={25}
              alt="image"
              className="rounded-full object-fit-cover "
            />
          ) : (
            "Select Style"
          )}
          <IoArrowDown size={20} />
        </span>
        {visible && (
          <ul
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-0 bg-white w-[150px] absolute top-[102%] right-0 z-[1] shadow-md "
          >
            {data.map((item: any, i: number) => {
              if (text == "Size") {
                return (
                  <li
                    onClick={() => handleChange(item.size)}
                    className="w-[100%] grid place-items-center  h-[50px] hover:bg-[#f7f8fa] "
                    key={item.size}
                  >
                    {/* img: w-[50px] h-[50px] rounded-full object-fit-cover */}
                    <span> {item.size}</span>
                  </li>
                );
              }
              if (text == "Style") {
                return (
                  <li
                    onClick={() => handleChange(item)}
                    className="w-[100%] grid place-items-center  h-[50px] hover:bg-[#f7f8fa] "
                    style={{ backgroundColor: `${item.color}` }}
                    key={item.size}
                  >
                    {/* img: w-[50px] h-[50px] rounded-full object-fit-cover */}
                    <span>
                      <Image
                        src={item.image}
                        alt="image"
                        height={50}
                        width={50}
                        className="rounded-full object-fit-cover"
                      />
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
