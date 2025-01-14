import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { orderPaginationUser } from "../../../services/orderUserService";

export default function OrderUser() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  if (orderId) {
    return <Outlet />;
  }

  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);

  const debounce = useDebounce(search, 500);

  const { data, totalPages, totalElements, numberOfElements } = useSelector(
    (state) => state.orderUser
  );

  console.log("data", data);

  const loadOrderPagination = () => {
    dispatch(
      orderPaginationUser({ page, size, search, sortField, sortDirection })
    );
  };

  useEffect(() => {
    loadOrderPagination();
  }, [page, debounce, size, sortDirection, sortField]);

  return (
    <>
      <div className="w-3/4 p-4">
        {/* Header */}

        <h2 className="text-xl font-bold mb-4 pb-4 text-center border-b border-red-400">
          Order history
        </h2>
        {/* List OrderHistory */}
        {data?.map((order) => (
          <div key={order.id} className="mb-10 shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg">Shop name</h1>

                <button>Chat</button>
                <button>Visit Shop</button>
              </div>

              <div className="flex items-center gap-4 text-blue-500">
                <span>{order.orderStatus}</span>
                <button>Rate</button>
              </div>
            </div>

            {/* Product List */}
            {order.orderDetailResponses.map((product, i) => (
              <Link
                to={`/account/history/${order.id}`}
                key={i}
                className="cursor-pointer flex items-center gap-4 py-4 border-b"
              >
                <img
                  src={product.listImgProductDetail[0].image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-800">
                    {product.name}
                  </h2>
                  {/* <p className="text-sm text-gray-500">
                        {product.category}
                      </p> */}
                  <p className="text-sm">x{product.orderQuantity}</p>
                </div>
                <div className="text-right">
                  <p className="line-through text-gray-400 text-sm">
                    {product.orderQuantity * product.unitPrice}
                  </p>
                  <p className="text-red-500 text-lg font-bold">
                    {product.orderQuantity * product.unitPrice}
                  </p>
                </div>
              </Link>
            ))}

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-medium">Thành tiền:</p>
              <p className="text-red-500 text-2xl font-bold">
                {order.totalPrice}
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button className="px-4 py-2 bg-gray-200 rounded-md">
                Yêu Cầu Trả Hàng/Hoàn Tiền
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                Mua Lại
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
