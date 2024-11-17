import { Home, Warning } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-2 animate-bounce">
            404
          </h1>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            Ối! Không tìm thấy trang
          </p>
          <div className="text-5xl text-purple-500 mb-8 animate-pulse">
            <Warning fontSize="large" className="inline-block" />
          </div>
        </div>
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            aria-label="Return to home page"
          >
            <Home className="mr-2 text-[20px]" /> Trở về trang chủ
          </Link>
          <div className="text-center">
            <p className="text-[15px] text-gray-500 mb-2 ">
              Hoặc thử những liên kết các trang này:
            </p>
            <nav className="space-x-4">
              <Link
                href="/about"
                className="text-[13px] font-medium text-blue-400 hover:text-blue-700 transition duration-150 ease-in-out"
              >
                Về chúng tôi
              </Link>
              <Link
                href="/contact"
                className="text-[13px] font-medium text-blue-400 hover:text-blue-700 transition duration-150 ease-in-out"
              >
                Liên hệ
              </Link>
              <Link
                href="/"
                className="text-[13px] font-medium text-blue-400 hover:text-blue-700 transition duration-150 ease-in-out"
              ></Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
