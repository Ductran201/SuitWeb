import { ArrowBack, Home, Lock } from "@mui/icons-material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-2 animate-bounce">
            401
          </h1>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            Truy cập trái phép
          </p>
          <div className="text-5xl text-red-500 mb-8 animate-pulse">
            <Lock className="inline-block" />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-center text-gray-600 text-[16px]">
            Xin lỗi, bạn không có quyền truy cập trang này. Vui lòng đăng nhập
            hoặc liên hệ với quản trị viên.
          </p>
          <div className="flex space-x-4 ">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center px-4 py-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
              aria-label="Return to home page"
            >
              <Home className="mr-2 text-[16px]" /> Trang chủ
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center px-4 py-4 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              <ArrowBack className="mr-2 text-[16px]" /> Trở lại
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className=" text-gray-500 text-[13px] leading-7">
            Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với nhóm hỗ trợ của
            chúng tôi:
          </p>
          <Link
            href="mailto:nguyentruongson1842001@gmail.com"
            className="mt-2 inline-block text-[14px] text-red-600 hover:text-red-700 transition duration-150 ease-in-out"
          >
            nguyentruongson1842001@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
