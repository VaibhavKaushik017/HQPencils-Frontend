import {
  AiFillLike,
  AiFillStar,
  AiOutlineLike,
  AiOutlineStar,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="border-[1px] w-[220px] relative hover:shadow-lg p-3 rounded-3xl border-gray-300 cursor-pointer">
      <button
        className="bg-orange-200 absolute top-2 right-2 p-3 rounded-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          handler({ productId, price, name, photo, stock, quantity: 1 })
        }
      >
        {isHovered ? <FaPlus /> : <FiShoppingCart />}
      </button>
      <div className="bg-gray-100 rounded-3xl w-full">
        <img
          className="h-[200px] rounded-3xl bg-cover w-[200px]"
          src={`${server}/${photo}`}
          alt={name}
        />
      </div>
      <p className="text-xs pt-3 text-green-500">Available</p>
      <h1 className="font-semibold">
        {name.length > 18 ? name.slice(0, 18) + "..." : name}
      </h1>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex text-yellow-400">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <h1 className="font-bold">₹{price}</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="cursor-pointer bg-red-100 rounded-3xl p-2 border-[1px] border-red-500"
          >
            {isLiked ? (
              <AiFillLike className="text-2xl text-red-500" />
            ) : (
              <AiOutlineLike className="text-2xl text-red-500" />
            )}
            <p className="text-xs text-center">26</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
