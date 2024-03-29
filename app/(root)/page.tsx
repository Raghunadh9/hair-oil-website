import HomeBadges from "@/components/shared/components/home/home.badges";
import CarouselComponent from "@/components/shared/components/client/home.carousel";
import HomeFeatures from "@/components/shared/components/client/home.features";
import React from "react";
import ShopNowComponent from "@/components/shared/components/home/home.shopnow";
import Testimonials from "@/components/shared/components/client/home.testimonials";
import { BackgroundGradientDemo } from "@/components/shared/components/client/home.subscribe";
import { getAllProducts } from "@/components/lib/actions/product.actions";
import HomeProductPage from "@/components/shared/components/home/home.products";
import ShowHomeProducts from "@/components/shared/components/home/home.show.products";
import ProductShowCase from "@/components/shared/components/home/home.showcase";
const Home = async () => {
  const products: TypefAllProducts = await getAllProducts();
  return (
    <div className="  mb-5 ">
      {/* <HomeBanner /> */}
      <CarouselComponent />
      <HomeFeatures />
      <HomeBadges />
      <ShowHomeProducts products={products} />

      <ShopNowComponent />
      <ProductShowCase />
      <Testimonials />
      <BackgroundGradientDemo />
    </div>
  );
};

export default Home;
