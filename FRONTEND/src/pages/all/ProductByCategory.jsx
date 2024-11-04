import React, { useEffect, useState } from "react";
import HeaderShop from "../../layouts/user/headerShop/HeaderShop";
import FooterShop from "../../layouts/user/footerShop/FooterShop";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { findAllProductByCategory } from "../../services/categoryService";

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

  //

  const { data, error, totalPages, totalElements, numberOfElements } =
    useSelector((state) => state.product);

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
      <HeaderShop />
      {console.log(data)}
      <section className="grid grid-cols-6">
        <div className=" bg-red-400 col-span-1">Super Filter</div>
        <article className=" bg-green-400 col-span-5 p-[30px]">
          <div className="grid grid-cols-4 gap-4">
            {data?.map((pro) => (
              <div key={pro.id}>
                <Link to={`/product/${pro.id}`}>
                  <img src={`${pro.image}`} alt="" />
                  <p>{pro.name}</p>
                  <b>{pro.price} đ</b>
                </Link>
              </div>
            ))}
          </div>
        </article>
      </section>

      <FooterShop />
    </>
  );
}
