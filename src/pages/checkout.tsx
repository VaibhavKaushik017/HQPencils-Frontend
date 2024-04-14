import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OvBQxSCV5QWOhzerrJ1J0DJt4sCD8t8m1KesaN6VEhTuabzcCfxecOigAhIpzPCiYEcZRXLyFsCeLH3b23rHDKX00cx7qiPUu"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const submitHander = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const order = {};

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      alert("Placing Order");
      navigate("/orders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <form action="" onSubmit={submitHander}>
        <PaymentElement />
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements
      options={{
        clientSecret:
          "pi_3P2nLASCV5QWOhze11ejHOk2_secret_zrA739Rayz7SRwai4DGLs6WWO",
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
