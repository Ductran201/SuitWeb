import React from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
export default function FooterShop() {
  return (
    <>
      <footer className="bg-[#EBEBEB]">
        <div className="block p-8 w-full max-w-[1300px] m-[0_auto] z-20 mt-16">
          <div className="flex flex-wrap justify-between bg-white rounded-xl ">
            {/* Item 1 */}
            <div className="flex items-center justify-center flex-1 min-w-[200px] m-2">
              <div>
                <LocalShippingIcon className="!text-[50px]" />
              </div>
              <div className=" p-4 rounded-lg">
                <h3 className="font-bold">Free Shipping</h3>
                <p>On orders over $99</p>
              </div>
            </div>

            <div className="flex items-center justify-center flex-1 min-w-[200px] m-2">
              <div>
                <CurrencyExchangeIcon className="!text-[50px]" />
              </div>
              <div className=" p-4 rounded-lg">
                <h3 className="font-bold">Money Back</h3>
                <p>Money back in 15 days</p>
              </div>
            </div>

            <div className="flex items-center justify-center flex-1 min-w-[200px] m-2">
              <div>
                <CreditCardIcon className="!text-[50px]" />
              </div>
              <div className=" p-4 rounded-lg">
                <h3 className="font-bold">Secure Checkout</h3>
                <p>100% Payment Secure</p>
              </div>
            </div>

            <div className="flex items-center justify-center flex-1 min-w-[200px] m-2">
              <div>
                <HeadsetMicIcon className="!text-[50px]" />
              </div>
              <div className=" p-4 rounded-lg">
                <h3 className="font-bold">Online Support</h3>
                <p>Ensure product quality</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-7 gap-10">
            {/* Phần 1: About Us */}
            <div className="flex-1 p-4 md:order-1">
              <p className="font-bold">About Us.</p>
              <p className="mt-4">
                Minimal E-Commerce is a dynamic and innovative online retail
                platform that offers a wide range of products to customers
                worldwide.
              </p>
              <div className="flex gap-3 mt-4">
                <div>
                  <Facebook />
                </div>
                <div>
                  <Twitter />
                </div>
                <div>
                  <YouTube />
                </div>
                <div>
                  <Instagram />
                </div>
                <div>
                  <i className="bi bi-tiktok" />
                </div>
              </div>
            </div>

            {/* Phần 2: Quick Link */}
            <div className="flex-none w-full md:w-1/6 p-4 md:order-2">
              <p className="font-bold">Quick Link</p>
              <p className="mt-4 mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  My Account
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  My Cart
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  Wishlist
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  Gift Card
                </a>
              </p>
              <p>
                <a href="#" className="footer-link hover:text-blue-500">
                  Need Help?
                </a>
              </p>
            </div>

            {/* Phần 3: Information */}
            <div className="flex-none w-full md:w-1/6 p-4 md:order-3">
              <p className="font-bold">Information</p>
              <p className="mt-4 mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  About us
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  Contact
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  Blogs
                </a>
              </p>
              <p className="mb-3">
                <a href="#" className="footer-link hover:text-blue-500">
                  Size Chart
                </a>
              </p>
              <p>
                <a href="#" className="footer-link hover:text-blue-500">
                  FAQ
                </a>
              </p>
            </div>

            {/* Phần 4: Newsletter */}
            <div className="flex-1 p-4 md:order-4">
              <p className="font-bold">Newsletter</p>
              <p className="mt-4">
                Learn about our most recent news, updates, and deals by
                subscribing.
              </p>
              <div className="flex mt-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded-l-md p-2 flex-1"
                  placeholder="email@example.com"
                />
                <button className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-black">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-[#dcdcdc] border-t-2">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 w-full max-w-[1200px] mx-auto z-20">
            <div className="text-center md:text-left">
              &#169; <strong>Minimalin</strong>. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-500">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-500">
                Refund Policy
              </a>
              <a href="#" className="hover:text-blue-500">
                Shipping Policy
              </a>
              <a href="#" className="hover:text-blue-500">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
