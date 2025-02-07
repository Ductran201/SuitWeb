import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findAllProductByCategory } from "../../services/categoryService";
import ProductCard from "./ProductCard";
import useProductCard from "../../components/useProductCard/useProductCard";
import { Pagination } from "@mui/material";

import SortByCustom from "../../components/sortByCustom/SortByCustom";
import debounce from "lodash.debounce";
import usePaginationCustom from "../../components/usePaginationCustom/UsePaginationCustom";

export default function ProductByCategory() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [productsByCat, setProductsByCat] = useState([]);

  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const { totalPages } = useSelector((state) => state.product);
  // console.log("total page", totalPages);

  const {
    handleSearch,
    handleChangePage,
    handleSelectFilter,
    handleFilterChange,
    clearFilters,
  } = usePaginationCustom();

  const [selectedFilters, setSelectedFilters] = useState({
    colorIds: [],
    sizeIds: [],
  });

  const { selectedColor, handleHoverColor, getCurrentDetail } =
    useProductCard(productsByCat);

  const loadInitialData = () => {
    dispatch(
      findAllProductByCategory({
        id,
        page,
        size,
        search,
        sortDirection,
        sortField,
        colorIds: selectedFilters.colorIds,
        sizeIds: selectedFilters.sizeIds,
      })
    )
      .then((res) => {
        setProductsByCat(res.payload.content);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadInitialData();

    // Set the param to Url
    // const searchParams = new URLSearchParams(window.location.search);

    // if (selectedFilters.colorIds.length > 0) {
    //   searchParams.set("colorIds", selectedFilters.colorIds.join(","));
    // }

    // if (selectedFilters.sizeIds.length > 0) {
    //   searchParams.set("sizeIds", selectedFilters.sizeIds.join(","));
    // }

    // window.history.replaceState(null, "", `${"?" + searchParams.toString()}`);
  }, [id, page, size, search, sortDirection, sortField, selectedFilters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setPage(Number(searchParams.get("page")) || 1);
    setSize(Number(searchParams.get("size")) || 5);
    setSearch(searchParams.get("search") || "");
    setSortField(searchParams.get("sortField") || "id");
    setSortDirection(searchParams.get("sortDirection") || "DESC");

    const colorIds = searchParams.get("colorIds")
      ? searchParams.get("colorIds").split(",").map(Number)
      : [];
    const sizeIds = searchParams.get("sizeIds")
      ? searchParams.get("sizeIds").split(",").map(Number)
      : [];

    setSelectedFilters({
      colorIds: colorIds,
      sizeIds: sizeIds,
    });
  }, [window.location.search]);

  // Initialize uniqueColors and uniqueSizes only once
  const uniqueColorsRef = useRef([]);
  const uniqueSizesRef = useRef([]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && productsByCat?.length > 0) {
      uniqueColorsRef.current = [
        ...new Map(
          productsByCat
            ?.flatMap((product) => product.colorSet)
            .map((color) => [color.name.toLowerCase(), color])
        ).values(),
      ];
      uniqueSizesRef.current = [
        ...new Map(
          productsByCat
            ?.flatMap((product) => product.sizeSet)
            .map((size) => [size.name.toLowerCase(), size])
        ).values(),
      ];
      isInitializedRef.current = true; // Mark as initialized
    }
  }, [productsByCat]);

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      // console.log("1", updatedFilters);
      if (updatedFilters[category]?.includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category].push(value);
      }

      handleFilterChange(category, updatedFilters[category]); // Gọi hàm cập nhật URL

      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      colorIds: [],
      sizeIds: [],
    });
    clearFilters();
  };

  // List for filter

  const options = [
    {
      content: "New upload",
      function: () => handleSelectFilter("createdDate", "DESC"),
    },
    {
      content: "Old upload",
      function: () => handleSelectFilter("createdDate", "ASC"),
    },
  ];

  return (
    <>
      <section className="grid grid-cols-6">
        {/* Super filter */}
        <div className=" bg-red-400 col-span-1 p-4">
          <h2 className="font-bold text-lg mb-4">
            {productsByCat?.length} products
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
                    selectedFilters.sizeIds?.includes(color.id)
                      ? "border-2 border-black"
                      : ""
                  }`}
                  style={{ backgroundColor: `${color.name}` }}
                  onClick={() => toggleFilter("colorIds", color.id)}
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
                    selectedFilters.sizeIds?.includes(size.id)
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => toggleFilter("sizeIds", size.id)}
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
                    key === "colorIds"
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

              {(selectedFilters.colorIds?.length > 0 ||
                selectedFilters.sizeIds?.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="ml-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="z-50">
              <SortByCustom initContent={"Sort by"} options={options} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {productsByCat?.map((item) => {
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
