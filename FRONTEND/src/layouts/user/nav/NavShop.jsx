import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  categoryNoPagination,
  findAllProductByCategory,
} from "../../../services/categoryService";
import {
  productDetailNoPagination,
  productDetailPagination,
} from "../../../services/productDetailService";
import { Button } from "@mui/material";
import { topNewestProduct } from "../../../services/productService";

export default function NavShop() {
  const [selectCategory, setSelectCategory] = useState();
  const dispatch = useDispatch();

  const { data: products, error: productError } = useSelector(
    (state) => state.product
  );

  const { data: categories, error: categoryError } = useSelector(
    (state) => state.category
  );

  const loadInitialData = () => {
    dispatch(categoryNoPagination());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (categories?.length && selectCategory == null) {
      const firstCategoryId = categories[0].id;
      setSelectCategory(firstCategoryId);
      dispatch(topNewestProduct(firstCategoryId));
    }
  }, [categories, selectCategory]);

  const handlePreCategory = (id) => {
    setSelectCategory(id);
    dispatch(topNewestProduct(id));
  };

  // const handleSeeMore = () => {
  //   console.log(selectCategory);
  //   dispatch(
  //     findAllProductByCategory({ page, search, size, sortField, sortDirection })
  //   );
  // };
  return (
    <>
      <div className="text-center font-bold">Suggest products</div>

      <div className="flex justify-center gap-10 bg-slate-500 ">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handlePreCategory(cat.id)}
            to="#"
            className={`hover:bg-red-400 p-4 ${
              selectCategory == cat.id ? "bg-green-400" : ""
            } `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* top 4 products */}
      <div className="grid grid-cols-4 gap-5">
        {products?.map((item, index) => (
          <div key={index}>
            <a href="">
              <img src={`${item.image}`} alt="" />
              <p>{item.name}</p>
              <b>{item.price} đ</b>
            </a>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to={`/category/${selectCategory}`}>See more</Link>
      </div>
    </>
  );
}
