import HomeBadges from "@/components/shared/components/home.badges";
// import HomeBanner from "@/components/shared/components/client/home.banner";
import CarouselComponent from "@/components/shared/components/client/home.carousel";
import HomeFeatures from "@/components/shared/components/client/home.features";
import React from "react";
import ProductShowCase from "@/components/shared/components/home.showcase";
import ShopNowComponent from "@/components/shared/components/home.shopnow";
import Testimonials from "@/components/shared/components/client/home.testimonials";
import { BackgroundGradientDemo } from "@/components/shared/components/client/home.subscribe";
const Home = () => {
  return (
    <div className="mt-3 mb-5">
      {/* <HomeBanner /> */}
      <CarouselComponent />
      <HomeFeatures />
      <HomeBadges />
      <ShopNowComponent />
      <ProductShowCase />
      <Testimonials />
      <BackgroundGradientDemo />
    </div>
  );
};

export default Home;
