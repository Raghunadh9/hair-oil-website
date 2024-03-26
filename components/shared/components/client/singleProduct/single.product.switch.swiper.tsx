"use client";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./home.module.css";
const ProductMainSwiper = ({ product }: { product: any }) => {
  const [active, setActve] = useState<number>(0);
  return (
    <>
      <div className={styles.swiper}>
        <div className="z-99 ">
          <Image
            src={product.images[active].url}
            width={600}
            height={1800}
            alt="_"
          />
        </div>
        <div
          className={`${styles.list} mt-[7px] flex gap-[10px] max-w-[500px] `}
        >
          {product.images.map(
            (img: { url: string; public_url: string }, i: number) => (
              <div
                className={`${
                  i == active && "border-3 border-black rounded-md"
                }`}
                key={uuidv4()}
                onMouseOver={() => setActve(i)}
              >
                <Image
                  src={img.url}
                  alt=""
                  width={400}
                  height={90}
                  key={uuidv4()}
                  className="object-cover rounded-md cursor-pointer from425:hidden"
                />
                <Image
                  src={img.url}
                  alt=""
                  width={90}
                  height={100}
                  key={uuidv4()}
                  className="object-cover cursor-pointer  upto425:hidden"
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ProductMainSwiper;
