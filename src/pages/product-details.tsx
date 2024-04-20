import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Navigate, useParams } from "react-router-dom";
import LatestProducts from "../components/latest-products";
import { Skeleton } from "../components/loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";

function ProductDetails() {
  const params = useParams();
  const { data, isError, isLoading } = useProductDetailsQuery(params.id!);

  const { price, stock, name, photo } = data?.product! || {
    photo: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to Cart`);
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="py-24 w-[92%] mx-auto">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="flex gap-20 pb-24">
            <div className="w-1/2 flex gap-5">
              <div className="flex flex-col gap-5">
                <img className="h-20 w-44" src={`${server}/${photo}`} />
                <img className="h-20 w-44" src={`${server}/${photo}`} />
                <img className="h-20 w-44" src={`${server}/${photo}`} />
                <img className="h-20 w-44" src={`${server}/${photo}`} />
              </div>
              <div>
                <img src={`${server}/${photo}`} />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-[80%] flex flex-col gap-4">
                <h1 className="font-bold text-4xl">{name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                  </div>
                  <h1>2 Reviews</h1>
                </div>
                <h1 className="font-bold text-3xl">₹{price}</h1>
                {/* <p>{stock}</p>
              <p>{category}</p> */}
                <div className="flex gap-3 w-full">
                  <Button
                    className="w-full"
                    onClick={() =>
                      addToCartHandler({
                        productId: params.id!,
                        price,
                        name,
                        photo,
                        stock,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                  <Button className="w-full border-black" variant={"outline"}>
                    Buy Now
                  </Button>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  quaerat in delectus dolorem repellendus aut deleniti possimus,
                  recusandae excepturi architecto vero omnis nostrum saepe
                  dolores rem dolor aliquid porro animi atque velit aperiam? Eum
                  possimus molestias cupiditate soluta, nobis illo? Temporibus
                  perferendis, fugiat ipsum aliquam dolores laboriosam quod
                  dolor dolorem!
                </p>
                <Separator />
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Shipping and returns</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        <p>
                          Free standard shipping on orders ₹1000+ and free 7-day
                          returns for HQPencils Members.{" "}
                          <a className="underline" href="https://google.com">
                            Learn More
                          </a>
                        </p>
                        <p className="flex gap-2">
                          <a className="underline" href="https://google.com">
                            Return Policy
                          </a>
                          exclusions apply.
                        </p>
                        <p>Pick-up available.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Reviews (2)</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Button variant={"link"} className="p-0 w-fit">
                          <p className="underline">Write a Review</p>
                        </Button>
                        <div>
                          <h2 className="font-semibold">Great Product</h2>
                          <div className="flex gap-2 items-center">
                            <div className="flex text-yellow-400">
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiOutlineStar />
                            </div>
                            <span className="text-xs">Vaibhav Kaushik</span>
                            <span className="text-xs">19 April 2024</span>
                          </div>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Quos in excepturi consectetur libero velit
                            quibusdam.
                          </p>
                        </div>
                        <div>
                          <h2 className="font-semibold">Great Product</h2>
                          <div className="flex gap-2 items-center">
                            <div className="flex text-yellow-400">
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiOutlineStar />
                            </div>
                            <span className="text-xs">Vaibhav Kaushik</span>
                            <span className="text-xs">19 April 2024</span>
                          </div>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Quos in excepturi consectetur libero velit
                            quibusdam.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <LatestProducts />
        </>
      )}
    </div>
  );
}

export default ProductDetails;
