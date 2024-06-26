import HomeBadges from "@/components/shared/components/home/home.badges";
import CarouselComponent from "@/components/shared/components/client/home.carousel";
import HomeFeatures from "@/components/shared/components/client/home.features";
import ShopNowComponent from "@/components/shared/components/home/home.shopnow";
// import Testimonials from "@/components/shared/components/client/home.testimonials";
import { BackgroundGradientDemo } from "@/components/shared/components/client/home.subscribe";
// import { getAllProducts } from "@/components/lib/actions/product.actions";
// import HomeProductPage from "@/components/shared/components/home/home.products";
// import ShowHomeProducts from "@/components/shared/components/home/home.show.products";
import ProductShowCase from "@/components/shared/components/home/home.showcase";
import HomeMobileCarousel from "@/components/shared/components/client/home.testimonials";

const Home = async () => {
  // const products: TypefAllProducts = await getAllProducts();
  return (
    <div className="mb-5 ">
      <HomeMobileCarousel />
      <CarouselComponent />
      <HomeFeatures />
      {/* <ShowHomeProducts products={products} /> */}
      <ShopNowComponent />
      <HomeBadges />
      <ProductShowCase />
      {/* <Testimonials /> */}
      <BackgroundGradientDemo />
    </div>
  );
};

export default Home;
