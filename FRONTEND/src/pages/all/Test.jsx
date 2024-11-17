<section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-12">
  {/* Bộ sưu tập hình ảnh */}
  <div className="col-span-1 flex flex-col gap-2 items-center md:items-start">
    <div className="flex md:flex-col gap-2">
      {productInfor?.images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`thumbnail-${index}`}
          onClick={() => setSelectedImage(img)}
          className={`w-12 h-12 cursor-pointer ${
            img === selectedImage ? "border-2 border-black" : ""
          }`}
        />
      ))}
    </div>
    <div>
      <img
        src={selectedImage}
        alt="selected-product"
        className="w-full h-auto max-w-md object-cover"
      />
    </div>
  </div>

  {/* Thông tin sản phẩm */}
  <div className="col-span-2">
    <h2 className="text-2xl font-bold">{productInfor?.product.name}</h2>
    <p className="text-lg font-semibold text-gray-600">
      {productInfor?.productDetailAllResponse[0].productDetail.price} đ
    </p>

    {/* Chọn màu sắc */}
    <div className="mt-4">
      <h4 className="font-medium">Màu sắc:</h4>
      <div className="flex gap-2 mt-2">
        {productInfor?.colorSet.map((color) => (
          <button
            key={color.id}
            style={{
              backgroundColor: color.name,
            }}
            className={`w-8 h-8 rounded-full ${
              color.id === selectedColor ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setSelectedColor(color.id)}
          ></button>
        ))}
      </div>
    </div>

    {/* Chọn kích thước */}
    <div className="mt-4">
      <h4 className="text-lg font-medium">Kích thước:</h4>
      <div className="flex gap-2 mt-2">
        {productInfor?.sizeSet.map((size) => (
          <button
            key={size.id}
            className={`px-3 py-1 border ${
              size.id === selectedSize ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedSize(size.id)}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>

    {/* Chọn số lượng */}
    <div className="mt-4">
      <h4 className="text-lg font-medium">
        Số lượng:{" "}
        {productInfor?.productDetailAllResponse[0].productDetail.stockQuantity}
      </h4>
      <div className="flex gap-2 mt-2">
        <button
          className="px-2 py-1 border border-gray-300"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-16 text-center border border-gray-300"
        />
        <button
          className="px-2 py-1 border border-gray-300"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>

    {/* Nút thêm vào giỏ và mua ngay */}
    <div className="mt-4 space-y-2">
      <button className="w-full bg-orange-500 text-white py-2 cursor-pointer">
        Thêm vào giỏ
      </button>
      <button className="w-full bg-orange-500 text-white py-2 cursor-pointer">
        Mua ngay
      </button>
    </div>
  </div>
</section>;
