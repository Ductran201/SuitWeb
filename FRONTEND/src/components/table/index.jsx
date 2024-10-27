import React, { useEffect, useState } from "react";
import "./index.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { Button } from "@mui/material";

export default function TableAdmin() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [reload, setReload] = useState(false);
  const id = 8;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((res) => setProducts(res.data.content))
      .catch((err) => console.log(err));
  }, [reload]);

  const handleAdd = () => {
    axios
      .post("http://localhost:8080/api/v1/products", {
        name: "pronew",
        price: 11111,
        stock: 22222,
      })
      .then((res) => {
        // const newProducts = [...products];
        // newProducts.unshift(res.data);
        // newProducts.pop();
        // setProducts(newProducts);

        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };
  const handleGetById = (id) => {
    axios
      .get(`http://localhost:8080/api/v1/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/products/${id}`, {
        name: "proUpdate",
        price: 111110,
        stock: 222220,
      })
      .then((res) => setReload(!reload))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    console.log("delete");
    axios
      .delete(`http://localhost:8080/api/v1/products/${id}`)
      .then((res) => setReload(!reload))
      .catch((err) => console.log(err));
  };

  console.log(product);
  return (
    <>
      <table className="w-full border ">
        <thead>
          <tr className="border bg-gray-500">
            <th className="border ">
              <input type="checkbox" name="" id="" />
            </th>
            <th className="border ">ID</th>
            <th className="border ">NAME</th>
            <th className="border ">PRICE</th>
            <th className="border ">STOCK</th>
            <th className="border ">STATUS</th>
            <th className="border "></th>
          </tr>
        </thead>

        <tbody className="text-center bg-white">
          {products.map((pro) => (
            <tr key={pro.id}>
              <td className="">
                <input type="checkbox" name="" id="" />
              </td>
              <td>{pro.id}</td>
              <td>{pro.name}</td>
              <td>{pro.price}</td>
              <td>{pro.stock}</td>
              <td>{pro.status ? "Active" : "Inactive"}</td>
              <td>
                <MoreHorizIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
