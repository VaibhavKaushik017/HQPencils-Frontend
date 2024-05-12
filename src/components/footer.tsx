import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="text-center w-[90%] mx-auto pb-10 text-sm text-gray-600">
      <p>©2024, HQPENCILS - A Sketch Store</p>
      <div className="flex gap-2 flex-wrap font-semibold items-center pt-4 justify-between">
        <Link to={"/disclaimer"}>Disclaimer</Link>
        <Link to={"/termsCondition"}>Terms & Conditions</Link>
        <Link to={"/privacyPolicy"}>Privacy policy</Link>
        <Link to={"/refundCancellationPolicy"}>
          Refund & Cancellation Policy
        </Link>
        {/* <Link to={"/shippingDeliveryPolicy"}>Shipping & Delivery Policy</Link> */}
      </div>
    </div>
  );
}

export default Footer;
