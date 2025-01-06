import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, findListCartByUser } from "../../../services/cartService";
import { Edit } from "@mui/icons-material";
import {
  findAllAddress,
  findDefaultAddress,
} from "../../../services/addressService";
import { Navigate, useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.listCart);
  const { data: listAddress, addressDefault } = useSelector(
    (state) => state.address
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [note, setNote] = useState("");

  const loadData = () => {
    dispatch(findListCartByUser());
    dispatch(findAllAddress());
    dispatch(findDefaultAddress());
  };

  const handleChangeAddress = (e) => {
    const selected = listAddress.find(
      (address) => address.id === Number(e.target.value)
    );
    setSelectedAddress(selected);
  };

  useEffect(() => {
    loadData();
  }, []);

  // If dont have any item cart it will navigate to "/cart"
  if (data?.length === 0) {
    console.log("first");
    navigate("/cart");
  }

  const handlePayment = () => {
    const addressId = selectedAddress?.id || addressDefault?.id;

    const payload = {
      note,
      addressId,
    };

    console.log("payload", payload);
    dispatch(checkout(payload));
  };

  console.log(data);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* {console.log(data)} */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Left Section */}
        <div className="bg-white p-6 shadow-md rounded-lg lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Address</h2>

          <div className="flex justify-between mb-3">
            <div>
              <label htmlFor="">Choose the address: </label>
              <select
                className="border border-black"
                onChange={handleChangeAddress}
              >
                <option>----Choose the address----</option>
                {listAddress?.map((address) => (
                  <option value={address.id} key={address.id}>
                    {address.fullAddress}
                  </option>
                ))}
              </select>
            </div>

            <Button variant="contained">Add new address</Button>
          </div>

          <div className="p-3 relative bg-green-300 mb-3">
            <div>
              {selectedAddress?.fullAddress ||
                addressDefault?.fullAddress ||
                "No address selected"}
            </div>
            <div>
              {selectedAddress?.phoneReceiver || addressDefault?.phoneReceiver}
            </div>
            <div>
              {selectedAddress?.nameReceiver || addressDefault?.nameReceiver}
            </div>

            <Button className="!absolute right-0 top-4" startIcon={<Edit />} />
          </div>
          {/* Note */}
          <h2 className="text-lg font-semibold mt-6 mb-4">Note</h2>

          <textarea
            placeholder="Note"
            className="border border-black   p-4 w-full"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>

          <h2 className="text-lg font-semibold mt-6 mb-4">
            Hình thức nhận hàng
          </h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">
              Giao tới nhà
            </button>
            <button className="px-4 py-2 border rounded-lg">
              Lấy tại cửa hàng
            </button>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-4">
            Phương thức vận chuyển
          </h2>

          <div className="mb-6">
            <label className="space-x-2">
              <input type="radio" name="delivery" defaultChecked />
              <span>Tiêu chuẩn (20.000 đ)</span>
            </label>
          </div>

          <Button
            className="!text-black !font-bold"
            size="large"
            variant="contained"
            fullWidth
            onClick={() => handlePayment()}
          >
            Pay by cash
          </Button>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Product infomation</h2>
          {data?.map((item) => (
            // console.log(item),
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0].image}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="">
                  <p className="font-semibold">{item.productDetail.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.productDetail.color.name},{" "}
                    {item.productDetail.size.name}
                  </p>
                  <span>x{item.quantity}</span>
                </div>
              </div>
              <p>{item.totalPrice}</p>
            </div>
          ))}

          <h2 className="text-lg font-semibold mt-6 mb-4">Total price</h2>
          <div>
            <div className="border-b-2 border-opacity-80 pb-3">
              <p className="flex justify-between">
                Total price:
                <span className="font-semibold">449.100 đ</span>
              </p>
              <p className="flex justify-between">
                Shipping cost: <span className="font-semibold">20.000 đ</span>
              </p>
            </div>
            <p className="flex justify-between text-xl font-bold mt-2">
              Total price:
              <span>449.100 đ</span>
            </p>
            <p className="text-sm text-right text-red-500 mt-1">
              Bạn đã tiết kiệm được 49.900 đ
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <p className="flex items-center gap-2 text-sm">
              ✅ Hơn 1.000.000 khách hàng tin tưởng
            </p>
            <p className="flex items-center gap-2 text-sm">
              ✅ Miễn phí đổi trả trong 15 ngày
            </p>
            <p className="flex items-center gap-2 text-sm">
              ✅ Hơn 30 triệu đơn giao hàng thành công
            </p>
            <p className="flex items-center gap-2 text-sm">
              ✅ Tích điểm mọi đơn hàng
            </p>
            <p className="flex items-center gap-2 text-sm">
              ✅ Cam kết chất lượng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
