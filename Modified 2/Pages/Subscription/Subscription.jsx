import React from "react";

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Platinum Plan */}
        <div className="bg-white shadow-md rounded-lg p-8 border-t-8 border-purple-600">
          <h3 className="text-2xl font-bold text-gray-800">Platinum</h3>
          <p className="text-gray-500 mt-2">Best for professionals</p>
          <p className="text-4xl font-bold text-purple-600 mt-4">৳1999/year</p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✔ Unlimited Access</li>
            <li>✔ No Ads</li>
            <li>✔ Daily E-paper</li>
            <li>✔ Exclusive Reports</li>
          </ul>
          <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Subscribe
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-white shadow-md rounded-lg p-8 border-t-8 border-yellow-500">
          <h3 className="text-2xl font-bold text-gray-800">Gold</h3>
          <p className="text-gray-500 mt-2">Perfect for avid readers</p>
          <p className="text-4xl font-bold text-yellow-500 mt-4">৳1299/year</p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✔ Priority Access</li>
            <li>✔ Minimal Ads</li>
            <li>✔ Weekly E-paper</li>
            <li>✔ Feature Articles</li>
          </ul>
          <button className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
            Subscribe
          </button>
        </div>

        {/* Silver Plan */}
        <div className="bg-white shadow-md rounded-lg p-8 border-t-8 border-gray-500">
          <h3 className="text-2xl font-bold text-gray-800">Silver</h3>
          <p className="text-gray-500 mt-2">Great for casual readers</p>
          <p className="text-4xl font-bold text-gray-500 mt-4">৳799/year</p>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✔ Standard Access</li>
            <li>✔ Occasional Ads</li>
            <li>✔ Monthly E-paper</li>
            <li>✔ Regular Articles</li>
          </ul>
          <button className="mt-6 w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
