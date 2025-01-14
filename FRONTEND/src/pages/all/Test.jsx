import React, { useState } from "react";

const filtersData = {
  gender: ["Bé trai", "Bé gái", "Nam"],
  colors: ["Đen", "Đỏ", "Vàng", "Cam", "Xám", "Hồng", "Tím", "Nâu", "Trắng"],
};

const Test = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    colors: [],
  });

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category].push(value);
      }
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      gender: [],
      colors: [],
    });
  };

  return (
    <div className="p-5">
      {/* Bộ lọc */}
      <div className="mb-5">
        <h3 className="text-lg font-bold">Bộ lọc</h3>
        <div>
          <h4 className="text-base font-semibold">Giới tính</h4>
          {filtersData.gender.map((gender) => (
            <div
              key={gender}
              className={`inline-block px-4 py-2 m-1 border rounded-lg cursor-pointer ${
                selectedFilters.gender.includes(gender)
                  ? "border-blue-500 bg-blue-100 font-bold"
                  : "border-gray-300"
              }`}
              onClick={() => toggleFilter("gender", gender)}
            >
              <span>{gender}</span>
              {selectedFilters.gender.includes(gender) && (
                <span className="ml-2">✔</span>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-base font-semibold">Màu sắc</h4>
          {filtersData.colors.map((color) => (
            <div
              key={color}
              className={`inline-block px-4 py-2 m-1 border rounded-lg cursor-pointer ${
                selectedFilters.colors.includes(color)
                  ? "border-blue-500 bg-blue-100 font-bold"
                  : "border-gray-300"
              }`}
              onClick={() => toggleFilter("colors", color)}
            >
              <span>{color}</span>
              {selectedFilters.colors.includes(color) && (
                <span className="ml-2">✔</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hiển thị bộ lọc đang dùng */}
      <div className="my-5">
        <h4 className="text-base font-semibold">Đang dùng bộ lọc:</h4>
        {Object.keys(selectedFilters).map((key) =>
          selectedFilters[key].map((filter) => (
            <span
              key={filter}
              className="inline-block bg-blue-500 text-white px-3 py-1 mr-2 mb-2 rounded-full"
            >
              {filter}
            </span>
          ))
        )}
        {(selectedFilters.gender.length > 0 ||
          selectedFilters.colors.length > 0) && (
          <button
            onClick={clearFilters}
            className="ml-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            Xóa hết bộ lọc
          </button>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="products">
        <h4 className="text-base font-bold">127 sản phẩm</h4>
      </div>
    </div>
  );
};

export default Test;
