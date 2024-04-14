import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import Services from "../components/services";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

export default function Home() {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to Cart`);
  };

  if (isError) toast.error("Cannot Fetch Products");

  console.log("data", data);
  return (
    <div className="w-[90%] mx-auto py-24">
      <Hero />
      <Services />
      <>
        <h1 className="flex pb-5 font-semibold text-xl justify-between">
          Latest Products
          <Link to="/search" className="text-red-400 text-base">
            More
          </Link>
        </h1>
        <main className="flex flex-wrap gap-10">
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={addToCartHandler}
                photo={product.photo}
              />
            ))
          )}
        </main>
      </>
    </div>
  );
}
