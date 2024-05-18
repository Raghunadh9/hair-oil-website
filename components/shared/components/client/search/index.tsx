"use client";
import React, { useEffect, useState } from "react";
import { ICONS } from "../../icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/components/lib/actions/product.actions";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<TypefAllProducts | null>(null);
  const [dbData, setDbData] = useState<TypefAllProducts | []>([]);
  useEffect(() => {
    async function getProducts() {
      const productData: TypefAllProducts = await getAllProducts();
      setDbData(productData);
    }
    getProducts();
  }, []);
  const handleSearchChange = async (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      dbData &&
      dbData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <div className="cursor-pointer">{ICONS.search}</div>
      </DrawerTrigger>

      <DrawerContent className=" h-[80%]">
        <div className="text-2xl text-black mx-auto w-full max-w-2xl flex justify-center my-[10px] font-bold">
          Search by product name
        </div>
        <div className="mx-auto w-full max-w-2xl flex justify-center">
          <Input
            type="text"
            placeholder="Search..."
            className="border-2 border-black"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <div className="my-[30px]">
            {searchTerm.length > 0 ? (
              <div>
                {searchData?.length} Matching Results for{" "}
                <span className="font-bold">&quot;{searchTerm}&quot;</span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="my-[10px]">
            <h1 className="font-bold">PRODUCTS</h1>
          </div>
          <div className="scorlly-y">
            {searchData && searchData.length !== 0 && searchTerm.length > 0 ? (
              <div className="bg-slate-50 shadow-sm z-[9] p-4 overflow-y-auto">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link
                        href={`/product/${i.slug}?style=0`}
                        key={index}
                        className=""
                      >
                        <div className="w-full flex items-start py-3 border-b-2 border-b-gray-300 ">
                          <Image
                            src={i.subProducts[0].images[0].url}
                            alt="_"
                            height={70}
                            width={70}
                            className="mr-[10px] rounded-md"
                          />
                          <div className="flex-row">
                            <h1 className="text-[20px] font-semibold">
                              {i.name}
                            </h1>
                            <p className="text-gray-400">
                              {i.description.length > 33
                                ? i.description.substring(0, 33) + "..."
                                : i.description}
                            </p>
                            <div className="text-black flex items-center  upto425:mt-[0rem] ">
                              <h1 className="text-black p-0 text-[20px] font-extrabold upto425:text-[20px]">
                                Rs. {i.subProducts[0].discount}
                              </h1>
                              {i.subProducts[0].discount > 0 ? (
                                <h3 className="font-normal text-[16px] pl-[5px] text-black flex items-center gap-[5px] upto425:text-[14px]">
                                  {/* <span className="line-through ml-[15px]">
                Rs. {i.subProducts[0].discount}
              </span> */}
                                  <span className="text-green-500 font-bold px-[-3px]  ml-[15px] upto425:text-[15px]">
                                    {i.subProducts[0].discount}% Off
                                  </span>
                                </h3>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Search;
