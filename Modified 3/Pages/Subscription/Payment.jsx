import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const location = useLocation();
  console.log(location.state.price);
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={location.state.price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
