import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, discount, shippingCharges, tax, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="flex justify-between w-[90%] mx-auto py-24">
      <div className="w-[65%]">
        <h2 className="font-semibold text-lg pb-4">Order</h2>
        <Card className="h-full p-6">
          {cartItems.length > 0 ? (
            cartItems.map((i, idx) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={idx}
                cartItem={i}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h1>I guess, you forgot to add something to your cart...</h1>
            </div>
          )}
        </Card>
      </div>
      <div className="w-[30%]">
        <h2 className="font-semibold text-lg pb-4">Payment Summary</h2>
        <Card className="p-6">
          <div className="flex gap-5">
            <Input
              className="font-semibold"
              type="text"
              placeholder="COUPON CODE"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>

          {couponCode &&
            (isValidCouponCode ? (
              <span className="green flex items-center gap-1 py-2">
                ₹{discount} off using <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red flex items-center gap-1 py-2">
                Invalid Coupon <VscError />
              </span>
            ))}
          <Separator className="my-4" />
          <div className="flex flex-col gap-2 pb-6">
            <div className="flex justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm font-semibold">₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Shipping Charges</p>
              <p className="text-sm font-semibold">₹{shippingCharges}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Tax</p>
              <p className="text-sm font-semibold">₹{tax}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Discount</p>
              <p className="text-sm font-semibold">₹{discount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Total</p>
              <p className="text-sm font-semibold">₹{total}</p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <Link to={"/shipping"}>
              <Button className="w-full">Checkout</Button>
            </Link>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Cart;
