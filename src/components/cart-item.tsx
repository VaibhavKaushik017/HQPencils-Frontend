import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className={`flex justify-between mb-2 items-center`}>
      <div className="flex items-center gap-2">
        <img
          className="bg-gray-100 h-20 rounded-md p-2"
          src={`${server}/${photo}`}
          alt={name}
        />
        <div className="grid w-[150px]">
          <Link className="text-sm font-semibold" to={`/product/${productId}`}>
            {name}
          </Link>
          <span className="text-xs">Sketch</span>
        </div>
      </div>

      <p className="font-semibold">₹{price}</p>

      <div className="flex gap-6 items-center">
        <Button onClick={() => decrementHandler(cartItem)}>-</Button>
        <p>{quantity}</p>
        <Button onClick={() => incrementHandler(cartItem)}>+</Button>
      </div>
      <Button
        onClick={() => removeHandler(productId)}
        className="hover:text-red-600"
        variant={"ghost"}
        size={"icon"}
      >
        <FaTrash />
      </Button>
    </div>
  );
};

export default CartItemCard;
