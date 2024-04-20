import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

function LatestProducts() {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to Cart`);
  };

  if (isError) toast.error("Cannot Fetch Products");
  return (
    <>
      <h1 className="flex pb-5 font-semibold text-xl justify-between">
        Latest Products
        <Link to="/products" className="text-red-400 text-base">
          More
        </Link>
      </h1>
      <main className="grid grid-cols-5 justify-between gap-6">
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
  );
}

export default LatestProducts;
