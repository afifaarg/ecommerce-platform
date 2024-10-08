import Carousel from "../components/Carousels";
import CallToAction from "../components/Cta";
import Features from "../components/Features";
import Product from "../components/ProductCard";
import ProductsSection from "../components/ProductsSection";
import Testimonial from "../components/testimonials";

export default function HomePage() {
  return (
    <>
      <Carousel />
      <ProductsSection />
      <Features />
      <Testimonial />
      <CallToAction />
    </>
  );
}
