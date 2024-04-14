import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Banner from "../components/banner";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";

function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    price: maxPrice,
    category,
    page,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to Cart`);
  };

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) toast.error((error as CustomError).data.message);
  if (productIsError) toast.error((productError as CustomError).data.message);

  return (
    <div>
      <Banner
        image="b1.jpg"
        tag="HQ PENCILS - A SKETCH STORE"
        line="Save more with coupons & up to 70% off!"
      />
      <div className="flex justify-end w-[90%] mx-auto pb-10 pt-24 ">
        <Input
          className="w-[440px]"
          placeholder="Let me find something you are looking for! Search Here..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <section className="flex w-[90%] pb-24 mx-auto gap-10">
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h4>Sort</h4>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="">None</option>
                  <option value="asc">Price(Low to High)</option>
                  <option value="dsc">Price (High to Low)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h4>Max Price : {maxPrice || ""}</h4>
                <input
                  type="range"
                  min={2500}
                  max={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>Category</h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option className="" value="">
                    ALL
                  </option>
                  {!loadingCategories &&
                    categoriesResponse?.categories.map((category) => (
                      <option key={category} value={category}>
                        {category.toUpperCase()}
                      </option>
                    ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </aside>
        <main>
          <div className="flex pb-16 flex-wrap w-full gap-10">
            {productLoading ? (
              <Skeleton width="80vw" />
            ) : (
              searchedData?.products.map((product) => (
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
          </div>
          {searchedData && searchedData.totalPage > 1 && (
            <article className="flex items-center justify-center gap-4">
              <Button
                size={"sm"}
                disabled={!isPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </Button>
              <span>
                {page} of {searchedData.totalPage}
              </span>
              <Button
                size={"sm"}
                disabled={!isNextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </article>
          )}
        </main>
      </section>
    </div>
  );
}

export default Products;
