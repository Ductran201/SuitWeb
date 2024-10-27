import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { categoryNoPagination } from "../../../services/categoryService";
import {
  productDetailNoPagination,
  productDetailPagination,
} from "../../../services/productDetailService";
import { Button } from "@mui/material";

export default function () {
  const [selectCategory, setSelectCategory] = useState("1");
  const dispatch = useDispatch();
  const { data: categories, error: categoryError } = useSelector(
    (state) => state.category
  );

  const { data: products, error: productError } = useSelector(
    (state) => state.product
  );

  const loadInitialData = () => {
    dispatch(categoryNoPagination());
    dispatch(productDetailNoPagination());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handlePreCategory = () => {
    console.log("ád");
    dispatch(productDetailNoPagination());
  };
  return (
    <>
      <div className="text-center font-bold">Suggest products</div>

      <div className="flex justify-center gap-10 bg-slate-500 ">
        {categories?.map((cat) => (
          <NavLink
            key={cat.id}
            onClick={handlePreCategory}
            to="#"
            className={"hover:bg-red-400 p-4"}
          >
            {cat.name}
          </NavLink>
        ))}
      </div>
      {/* top 4 products */}
      <div className="grid grid-cols-4 gap-5">
        {products?.map((item) => (
          <div>
            <a href="">
              <img src={`${item.image}`} alt="" />
              <p className="text-center">{item.name}</p>
            </a>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="contained" size="large">
          See more
        </Button>
      </div>
    </>
  );
}
