import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { findAllProductByCategory } from "../../services/categoryService";
import ProductCard from "./ProductCard";
import useProductCard from "../../components/useProductCard/useProductCard";

export default function ProductByCategory() {
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const { id } = useParams();
  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const {
    data: products,
    error,
    totalPages,
    totalElements,
    numberOfElements,
  } = useSelector((state) => state.product);

  const { selectedColor, handleHoverColor, getCurrentDetail } =
    useProductCard(products);

  const loadInitialData = () => {
    dispatch(
      findAllProductByCategory({
        id,
        page,
        size,
        search,
        sortDirection,
        sortField,
      })
    );
  };

  useEffect(() => {
    loadInitialData();
  }, [id, page, size, sortDirection, sortField]);
  return (
    <>
      <section className="grid grid-cols-6">
        {/* Super filter */}
        <div className=" bg-red-400 col-span-1">Super Filter</div>

        {/* List product of category */}
        <article className=" bg-green-400 col-span-5 p-[30px]">
          <div className="grid grid-cols-4 gap-5">
            {products?.map((item) => {
              const currentDetail = getCurrentDetail(item, item.productName);
              const currentImage = currentDetail?.images?.[0]?.image || "";
              const currentPrice =
                currentDetail?.productDetail?.price || "Chưa có giá";

              return (
                <ProductCard
                  key={item.productId}
                  productId={item.productId}
                  productName={item.productName}
                  currentImage={currentImage}
                  currentPrice={currentPrice}
                  selectedColor={selectedColor[item.productName]}
                  onHoverColor={(colorId) =>
                    handleHoverColor(item.productName, colorId)
                  }
                />
              );
            })}
          </div>
        </article>
      </section>
    </>
  );
}
