import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailPagination } from "../../services/productDetailService";

export default function HomeShop() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const loadProductData = () => {
    dispatch(productDetailPagination({ page, search }));
  };

  return (
    <main className="p-6">
      {/* <div className="flex justify-between mb-6">
        <p>trang chu/somth</p>
        <p>sort</p>
      </div> */}

      {/* <h1 className="font-bold text-[20px]">Top 8 new products</h1> */}
      {/* List card */}
      {/* <div className="grid grid-cols-4 gap-5 p-5"> */}
      {/* card */}
      {/* {data?.map((item) => (
          <div className="">
            <a href="">
              <img
                src="https://cavano.vn/wp-content/uploads/2024/06/den-moi-872-10-700x1050.jpg "
                alt=""
                className=""
              />
              <p className="text-center">{item.name}</p>
            </a>
            <p className="text-center">{item.price}</p>
          </div>
        ))}

        <div className=" ">
          <a href="">
            <img
              src="https://cavano.vn/wp-content/uploads/2024/06/den-moi-872-10-700x1050.jpg "
              alt=""
              className=""
            />
            <p className="text-center">title</p>
          </a>
          <p className="text-center">cost</p>
        </div>
        <div className="">
          <a href="">
            <img
              src="https://cavano.vn/wp-content/uploads/2024/06/den-moi-872-10-700x1050.jpg "
              alt=""
              className=""
            />
            <p className="text-center">title</p>
          </a>
          <p className="text-center">cost</p>
        </div>
        <div>
          <a href="">
            <img
              src="https://cavano.vn/wp-content/uploads/2024/06/den-moi-872-10-700x1050.jpg "
              alt=""
            />
            <p className="text-center">title</p>
          </a>
          <p className="text-center">cost</p>
        </div>
        <div>
          <a href="">
            <img
              src="https://cavano.vn/wp-content/uploads/2024/06/den-moi-872-10-700x1050.jpg "
              alt=""
            />
          </a>
        </div> */}
      {/* </div> */}
    </main>
  );
}
