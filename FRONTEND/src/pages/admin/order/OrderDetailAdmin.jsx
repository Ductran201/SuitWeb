import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  findOrderById,
  updateOrderStatus,
} from "../../../services/orderService";
import { Button } from "@mui/material";
import { message } from "antd";

const ORDER_STATUS = [
  "WAITING",
  "CONFIRM",
  "DELIVERY",
  "CANCEL",
  "SUCCESS",
  "DENIED",
];

export default function OrderDetailAdmin() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { orderDetail } = useSelector((state) => state.order);

  // console.log("orderDetail", orderDetail);
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadData = () => {
    dispatch(findOrderById(orderId));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (orderDetail?.orderStatus) {
      setSelectedStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  const handleUpdateStatus = () => {
    // if (!selectedStatus) {
    //   alert("Vui lòng chọn trạng thái hợp lệ!");
    //   return;
    // }

    dispatch(updateOrderStatus({ orderId: orderId, status: selectedStatus }))
      .unwrap()
      .then(() => {
        loadData();
        message.success("Change status successfully");
      })
      .catch((err) => {
        message.error(err.data);
      });
  };

  return (
    <>
      <div className="p-6 bg-gray-100">
        {/* Address and Delivery Section */}
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex justify-between">
            <h2 className="font-semibold text-lg">Shipping address</h2>

            <div>
              <label className="mr-2 text-lg font-semibold">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
                className="border p-2 rounded w-full"
              >
                <option disabled>---Choose status--- </option>
                {ORDER_STATUS.map((st, i) => (
                  <option value={st} key={i}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium">{orderDetail?.receiveName}</p>
            <p className="text-gray-600">{orderDetail?.receivePhone}</p>
            <p className="text-gray-600">{orderDetail?.receiveAddress}</p>
          </div>
          <div className="mt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <div className="ml-4">
                  <p className="font-medium">12:01 01-01-2025</p>
                  <p className="text-green-500">Đã giao</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <div className="ml-4">
                  <p className="font-medium">07:04 01-01-2025</p>
                  <p className="text-gray-600">Đang vận chuyển</p>
                </div>
              </li>
              {/* Add more delivery status steps as necessary */}
            </ul>
          </div>
        </div>

        {/* Product List Section */}
        <div className="bg-white p-4 rounded shadow-md mt-6">
          <h2 className="font-semibold text-lg">Yêu thích: SHIP NHANH 88</h2>
          {/* List orderDetail */}
          <div className="divide-y">
            {/* Product Item */}
            {orderDetail?.orderDetailResponses?.map((or, i) => (
              <div key={i} className="flex py-4">
                <img
                  src={or.listImgProductDetail[0].image}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <p className="font-medium">{or.name}</p>
                  {/* <p className="text-gray-600">Phân loại hàng: Gấu Ghi</p> */}
                  <p className="text-gray-600">x{or.orderQuantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-500 font-bold">
                    {or.orderQuantity * or.unitPrice}
                  </p>
                  {/* <p className="text-gray-400 line-through">₫6.000</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="bg-white p-4 rounded shadow-md mt-6">
          <div className="flex justify-between">
            <p>Tổng tiền hàng</p>
            <p className="font-medium">{orderDetail?.totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Phí vận chuyển</p>
            <p className="font-medium">₫16.500</p>
          </div>
          <div className="flex justify-between">
            <p>Giảm giá phí vận chuyển</p>
            <p className="font-medium">-₫16.500</p>
          </div>
          <div className="flex justify-between">
            <p>Sử dụng 200 Shopee xu</p>
            <p className="font-medium">-₫200</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <p>Thành tiền</p>
            <p className="text-red-500">₫27.686</p>
          </div>
          <p className="text-gray-600 text-sm text-right">
            Tài khoản ngân hàng đã liên kết với ShopeePay
          </p>
        </div>
        <div className="text-right mt-4">
          <Button
            disabled={selectedStatus === orderDetail?.orderStatus}
            onClick={handleUpdateStatus}
            variant="contained"
          >
            Update Order
          </Button>
        </div>
      </div>
    </>
  );
}
