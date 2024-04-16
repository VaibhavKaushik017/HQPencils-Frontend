import Hero from "../components/hero";
import Services from "../components/services";
import LatestProducts from "../components/latest-products";

export default function Home() {
  return (
    <div className="w-[92%] mx-auto py-24">
      <Hero />
      <Services />
      <LatestProducts />
    </div>
  );
}
