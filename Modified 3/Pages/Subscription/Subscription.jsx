import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = {
  Platinum: {
    basePrice: 1999,
    pricing: { "1 minute": 50, "5 days": 799, "10 days": 1999 },
  },
  Gold: {
    basePrice: 1299,
    pricing: { "1 minute": 30, "5 days": 499, "10 days": 1299 },
  },
  Silver: {
    basePrice: 799,
    pricing: { "1 minute": 20, "5 days": 299, "10 days": 799 },
  },
};

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPeriods, setSelectedPeriods] = useState({
    Platinum: "1 minute",
    Gold: "1 minute",
    Silver: "1 minute",
  });

  const handlePeriodChange = (plan, newPeriod) => {
    setSelectedPeriods((prev) => ({
      ...prev,
      [plan]: newPeriod,
    }));
  };

  const handleSubscribe = (plan) => {
    const period = selectedPeriods[plan];
    const price = plans[plan].pricing[period];

    navigate("/payment", { state: { plan, price, period } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {Object.keys(plans).map((plan) => (
          <div
            key={plan}
            className={`bg-white shadow-md rounded-lg p-8 border-t-8 ${
              plan === "Platinum"
                ? "border-purple-600"
                : plan === "Gold"
                ? "border-yellow-500"
                : "border-gray-500"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-800">{plan}</h3>
            <p className="text-gray-500 mt-2">
              {plan === "Platinum"
                ? "Best for professionals"
                : plan === "Gold"
                ? "Perfect for avid readers"
                : "Great for casual readers"}
            </p>
            <p
              className={`text-4xl font-bold mt-4 ${
                plan === "Platinum"
                  ? "text-purple-600"
                  : plan === "Gold"
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              ${plans[plan].pricing[selectedPeriods[plan]]}
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              {plan === "Platinum" ? (
                <>
                  <li>✔ Unlimited Access</li>
                  <li>✔ No Ads</li>
                  <li>✔ Daily E-paper</li>
                  <li>✔ Exclusive Reports</li>
                </>
              ) : plan === "Gold" ? (
                <>
                  <li>✔ Priority Access</li>
                  <li>✔ Minimal Ads</li>
                  <li>✔ Weekly E-paper</li>
                  <li>✔ Feature Articles</li>
                </>
              ) : (
                <>
                  <li>✔ Standard Access</li>
                  <li>✔ Occasional Ads</li>
                  <li>✔ Monthly E-paper</li>
                  <li>✔ Regular Articles</li>
                </>
              )}
            </ul>

            <select
              value={selectedPeriods[plan]}
              onChange={(e) => handlePeriodChange(plan, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mt-4 text-gray-700 focus:ring focus:ring-blue-300"
            >
              <option value="1 minute">1 Minute</option>
              <option value="5 days">5 Days</option>
              <option value="10 days">10 Days</option>
            </select>

            <button
              onClick={() => handleSubscribe(plan)}
              className={`mt-6 w-full text-white py-3 rounded-lg transition ${
                plan === "Platinum"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : plan === "Gold"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
