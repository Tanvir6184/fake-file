import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { state } = useLocation();
  const { price } = state || {};

  useEffect(() => {
    if (price) {
      axiosSecure.post("/payment-intent", { price: price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details not found. Please try again.");
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      setIsProcessing(false);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
      setError("Payment confirmation failed. Please try again.");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const formattedDate = moment().format("YYYY-MM-DD ");

        const payment = {
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: formattedDate,
          transactionId: paymentIntent.id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-400 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
          Payment Information
        </h2>
        {transactionId && (
          <p className="text-green-600">Your transaction id: {transactionId}</p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": { color: "#888" },
                  },
                  invalid: { color: "#fa755a" },
                },
                hidePostalCode: true,
              }}
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-bold transition ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!stripe || !clientSecret || isProcessing}
          >
            {isProcessing ? "Processing..." : "PAY"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
