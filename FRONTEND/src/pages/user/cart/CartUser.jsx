import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  findListCartByUser,
  updateQuantityCart,
} from "../../../services/cartService";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { message } from "antd";
import DialogCustom from "../../../components/dialog";
import { Delete } from "@mui/icons-material";
import { useDebounce } from "@uidotdev/usehooks";
const Cart = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.listCart);
  const cookies = JSON.parse(Cookies.get("objectCookies") || null);
  const [isDialog, setIsDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const debouncedPendingUpdate = useDebounce(pendingUpdate, 900);

  useEffect(() => {
    if (debouncedPendingUpdate) {
      const { cartItemId, newQuantity } = debouncedPendingUpdate;
      handleUpdateQuantityDebounced(cartItemId, newQuantity);
    }
  }, [debouncedPendingUpdate]);

  const loadData = () => {
    dispatch(findListCartByUser());
  };
  useEffect(() => {
    loadData();
  }, []);

  // console.log(data);

  const totalQuantity =
    data?.reduce((total, item) => total + item.quantity, 0) || 0;

  const totalPrice = (data ?? []).reduce(
    (total, item) => total + item.quantity * item.productDetail.price,
    0
  );
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      // Show dialog
      handleOpenDialog(cartItemId);

      return;
    }
    // try {
    //   await dispatch(
    //     updateQuantityCart({ cartId: cartItemId, newQuantity: newQuantity })
    //   ).unwrap();
    //   loadData();
    //   message.success("Cập nhật số lượng thành công!");
    // } catch (error) {
    //   message.error(error);
    // }
    setPendingUpdate({ cartItemId, newQuantity });
    setUpdatingItemId(cartItemId);
  };

  const handleUpdateQuantityDebounced = async (cartItemId, newQuantity) => {
    try {
      await dispatch(
        updateQuantityCart({ cartId: cartItemId, newQuantity: newQuantity })
      ).unwrap();
      loadData();
      message.success("Cập nhật số lượng thành công!");
    } catch (error) {
      message.error("Cập nhật thất bại!");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleOpenDialog = (cartItemId) => {
    setIsDialog(true);
    setDialogConfig({
      onClose: () => setIsDialog(false),
      title: "Delete cart",
      mainContent: "Are you sure to delete this category",
      onConfirm: () => handleDeleteCart(cartItemId),
    });
  };

  const handleDeleteCart = (cartItemId) => {
    dispatch(deleteCart(cartItemId))
      .then(() => {
        loadData();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {isDialog && <DialogCustom {...dialogConfig} />}
      {!cookies ? (
        <Navigate to={"/signin"} />
      ) : (
        <>
          {data?.length === 0 ? (
            <h1>Cart is empty</h1>
          ) : (
            <div className="bg-gray-100 min-h-screen">
              <div className="max-w-7xl mx-auto py-6 px-4">
                {/* Thông báo miễn phí vận chuyển */}
                <div className="bg-white shadow rounded-lg p-4 mb-6">
                  <p className="text-green-600 font-medium">
                    🎉 Chúc mừng! Đơn hàng của bạn được{" "}
                    <span className="font-bold">Miễn phí vận chuyển</span>
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                {/* Khuyến mại */}
                <div className="bg-white shadow rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-orange-500 font-medium">
                    🔥
                    <span>Khuyến mại trong giỏ hàng của bạn chỉ còn</span>
                    <span className="font-bold text-black">3 phút 35 giây</span>
                    <span>trước khi hết khuyến mại</span>
                  </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="font-bold text-lg mb-4">Đang được giảm giá</h2>

                  {/* Sản phẩm */}
                  <div className="space-y-4">
                    {/* RENDER CART  */}
                    {data?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                          <input type="checkbox" className="h-5 w-5" />
                          <img
                            src="https://via.placeholder.com/80"
                            alt="Product"
                            className="w-20 h-20 object-cover rounded"
                          />

                          <div>
                            <h3 className="font-semibold">
                              {item.productDetail.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.productDetail.color.name},
                              {item.productDetail.size.name}
                            </p>
                            <div className="text-red-500 font-bold">
                              349.300đ
                            </div>
                            <div className="text-gray-400 line-through text-sm">
                              {item.productDetail.price} đ
                            </div>
                            <p className="text-sm text-orange-500">
                              Đã tiết kiệm 149.700đ
                            </p>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-lg bg-gray-200 px-3 py-1 rounded"
                            disabled={updatingItemId === item.id}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-lg bg-gray-200 px-3 py-1 rounded"
                            disabled={updatingItemId === item.id}
                          >
                            +
                          </button>

                          <Delete
                            className={`ml-5 cursor-pointer ${
                              updatingItemId === item.id ? "opacity-50" : ""
                            }`}
                            onClick={() =>
                              updatingItemId !== item.id &&
                              handleOpenDialog(item.id)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tổng đơn hàng */}
                <div className="bg-white shadow rounded-lg p-6 mt-6">
                  <h2 className="font-bold text-lg mb-4">Chi tiết đơn hàng</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Tổng giá trị sản phẩm
                      </span>
                      <span className="font-bold">{totalPrice}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vận chuyển</span>
                      <span className="font-bold">20.000đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá vận chuyển</span>
                      <span className="font-bold text-red-500">-20.000đ</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="font-bold text-lg">Tổng thanh toán</span>
                    <span className="font-bold text-lg text-red-500">
                      {totalPrice}
                    </span>
                  </div>
                  <button className="bg-yellow-500 text-white font-bold w-full py-3 rounded-lg mt-4">
                    Mua hàng {totalQuantity}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
