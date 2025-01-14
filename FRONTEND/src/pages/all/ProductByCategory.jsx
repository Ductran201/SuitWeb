import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { findAllProductByCategory } from "../../services/categoryService";
import ProductCard from "./ProductCard";
import useProductCard from "../../components/useProductCard/useProductCard";
import { Pagination } from "@mui/material";
import usePaginationCustom from "../../components/usePaginationCustom/UsePaginationCustom";

export default function ProductByCategory() {
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const { id } = useParams();

  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const {
    data: products,
    error,
    totalPages,
    totalElements,
    numberOfElements,
  } = useSelector((state) => state.product);
  // console.log(products);

  const {
    handleSearch,
    handleChangePage,
    handleChangeSize,
    handleSelectFilter,
  } = usePaginationCustom();

  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
  });

  // console.log("selectedFilters", selectedFilters);

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
        colorIds: selectedFilters.colors,
        sizeIds: selectedFilters.sizes,
      })
    );
  };

  useEffect(() => {
    loadInitialData();
  }, [id, page, size, sortDirection, sortField, selectedFilters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPage(Number(searchParams.get("page")) || 1);
    setSize(Number(searchParams.get("size")) || 5);
    setSearch(searchParams.get("search") || "");
    setSortField(searchParams.get("sortField") || "id");
    setSortDirection(searchParams.get("sortDirection") || "DESC");
    // setSelectedFilters(
    //   (selectedFilters.colors = searchParams.get("colorIds") || [])
    // );
    // setSelectedFilters(
    //   (selectedFilters.sizes = searchParams.get("sizeIds") || [])
    // );
  }, [window.location.search]);

  // Initialize uniqueColors and uniqueSizes only once
  const uniqueColorsRef = useRef([]);
  const uniqueSizesRef = useRef([]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && products?.length > 0) {
      uniqueColorsRef.current = [
        ...new Map(
          products
            ?.flatMap((product) => product.colorSet)
            .map((color) => [color.name.toLowerCase(), color])
        ).values(),
      ];
      uniqueSizesRef.current = [
        ...new Map(
          products
            ?.flatMap((product) => product.sizeSet)
            .map((size) => [size.name.toLowerCase(), size])
        ).values(),
      ];
      isInitializedRef.current = true; // Mark as initialized
    }
  }, [products]);

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      console.log("1", updatedFilters);
      if (updatedFilters[category]?.includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category].push(value);
      }

      console.log("2", updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      colors: [],
      sizes: [],
    });
  };

  return (
    <>
      <section className="grid grid-cols-6">
        {/* Super filter */}
        <div className=" bg-red-400 col-span-1 p-4">
          <h2 className="font-bold text-lg mb-4">
            {products?.length} products
          </h2>
          <h2 className="font-bold text-lg mb-4">Super filter</h2>

          {/* Color Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Màu sắc</h3>
            <div className="grid grid-cols-4 gap-2">
              {uniqueColorsRef.current.map((color) => (
                <button
                  key={color.id}
                  className={`w-8 h-8 rounded-full ${
                    selectedFilters.colors?.includes(color.id)
                      ? "border-2 border-black"
                      : ""
                  }`}
                  style={{ backgroundColor: `${color.name}` }}
                  onClick={() => toggleFilter("colors", color.id)}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Kích thước</h3>
            <div className="grid grid-cols-3 gap-2">
              {uniqueSizesRef.current.map((size) => (
                <button
                  key={size.id}
                  className={`border rounded px-2 py-1 text-sm hover:bg-gray-200 ${
                    selectedFilters.sizes?.includes(size.id)
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => toggleFilter("sizes", size.id)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Theo giá</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Dưới 350.000đ
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Trên 750.000đ
              </label>
            </div>
          </div>
        </div>

        {/* List product of category */}
        <article className="col-span-5 p-[30px]">
          {/* Show the current filter  */}
          <div className="bg-red-400 mb-4 flex justify-between">
            <div className="flex">
              <h4 className="text-base font-semibold">Đang dùng bộ lọc:</h4>
              {Object.keys(selectedFilters).map((key) =>
                selectedFilters[key].map((filterId) => {
                  const filterName =
                    key === "colors"
                      ? uniqueColorsRef.current.find(
                          (color) => color.id === filterId
                        )?.name
                      : uniqueSizesRef.current.find(
                          (size) => size.id === filterId
                        )?.name;

                  return (
                    <span
                      key={filterId}
                      className="inline-block bg-blue-500 text-white px-3 py-1 mr-2 mb-2 rounded-full"
                    >
                      {filterName || filterId}{" "}
                      {/* Hiển thị tên, fallback là ID nếu không tìm thấy */}
                    </span>
                  );
                })
              )}

              {(selectedFilters.colors?.length > 0 ||
                selectedFilters.sizes?.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="ml-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div>
              <select
                className="border-2 border-black min-w-[150px] p-1 rounded-lg text-center"
                name=""
                id=""
              >
                <option value="">Sort By</option>
                <option value="">ádsad</option>
                <option value="">ádsad</option>
              </select>
            </div>
          </div>
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
                  colorSet={item.colorSet}
                  selectedColor={selectedColor[item.productName]}
                  onHoverColor={(colorId) =>
                    handleHoverColor(item.productName, colorId)
                  }
                />
              );
            })}
          </div>
          <div className="flex justify-end">
            <Pagination
              size="large"
              color="primary"
              page={page}
              count={totalPages}
              onChange={handleChangePage}
            />
          </div>
        </article>
      </section>
    </>
  );
}
