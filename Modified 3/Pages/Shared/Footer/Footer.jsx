import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid md:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Daily Bangladesh
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Delivering unbiased and authentic news to you, straight from the
            heart of Bangladesh.
          </p>
          <p className="mt-2 text-gray-500">
            © {new Date().getFullYear()} Daily Bangladesh. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-4 text-gray-300">
            <li>
              <Link to="/" className="hover:text-red-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-red-400 transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/subscribe" className="hover:text-red-400 transition">
                Subscribe
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Contact Us
          </h3>
          <p className="text-gray-400">123 News Street, Dhaka, Bangladesh</p>
          <p className="text-gray-400 mt-2">
            Email: support@dailybangladesh.com
          </p>
          <p className="text-gray-400 mt-2">Phone: +880 123 456 789</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook className="text-3xl" />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube className="text-3xl" />
            </a>
            <a href="#" className="hover:text-gray-500 transition">
              <FaSquareXTwitter className="text-3xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        Designed with ❤️ by Daily Bangladesh Team
      </div>
    </footer>
  );
};

export default Footer;
