import Carousel from "../components/Carousels";
import Categories from "../components/Categories";
import CallToAction from "../components/Cta";
import Features from "../components/Features";
import ProductsSection from "../components/ProductsSection";
import Testimonial from "../components/testimonials";

export default function HomePage() {
  return (
    <>
      <Carousel />
      <ProductsSection />
      <Categories />
      {/* <Features /> */}
      <Testimonial />
      <ProductsSection />
      <CallToAction />
    </>
  );
}
