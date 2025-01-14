import { Button, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Choices from "../../../components/choices";
import { Delete, Edit, FilterAlt, Lock, LockOpen } from "@mui/icons-material";
import {
  deleteProduct,
  toggleStatusProduct,
} from "../../../services/productService";

import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../../components/dialog";
import AlertCustom from "../../../components/alert/AlertCustom";
import NativeSelectCustom from "../../../components/nativeSelect/NativeSelectCustom";
import { Link, Outlet, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { orderPaginationAdmin } from "../../../services/orderService";

export default function OrderAdmin() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  if (orderId) {
    return <Outlet />;
  }

  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);

  const [dialogConfig, setDialogConfig] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const [baseId, setBaseId] = useState(null);

  const debounce = useDebounce(search, 500);

  const { data, totalPages, totalElements, numberOfElements } = useSelector(
    (state) => state.order
  );

  const loadOrderPagination = () => {
    dispatch(
      orderPaginationAdmin({ page, size, search, sortField, sortDirection })
    );
  };

  useEffect(() => {
    loadOrderPagination();
  }, [page, debounce, size, sortDirection, sortField]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  const handleChangePageSize = (newSize) => {
    setSize(newSize);
  };

  const handleSelectFilter = (sortField, sortDirection) => {
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const handleShowAlert = (propsAlert) => {
    setAlertConfig(propsAlert);
    setIsAlert(true);
    // Set time to disappear alert
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        loadProductPagination();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmToggleStatus = (id) => {
    dispatch(toggleStatusProduct(id))
      .then(() => {
        loadProductPagination();
        // Config alert
        const propsAlert = {
          mainContent: "Change status successfully!!",
          severity: "success",
        };
        handleShowAlert(propsAlert);
        setIsDialog(false);
      })
      .catch((error) => console.log(error));
  };

  const handleOpenEdit = (id) => {
    // find the old product
    const findById = data.find((order) => order.id === id);

    if (findById) {
      setBaseId(id);
      setIsFormEdit(true);
    }
  };

  const handleOpenDialog = (id, action, status) => {
    setBaseId(id);
    setIsDialog(true);
    // Custom dialog
    let propsDialog = {};
    switch (action) {
      case "delete":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: "Delete product",
          mainContent: "Are you sure to delete this product?",
          onConfirm: () => handleConfirmDelete(id),
        };
        break;
      case "status":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: status ? "Block product" : "Unblock product",
          mainContent: status
            ? "Are you sure to block this product?"
            : "Are you sure to unblock this product?",
          onConfirm: () => handleConfirmToggleStatus(id),
        };
      default:
        break;
    }

    setDialogConfig(propsDialog);
  };

  const listOptions = (id, status) => [
    {
      name: "Edit",
      icon: <Edit />,
      function: () => handleOpenEdit(id),
    },

    {
      name: status ? "Block" : "Unblock",
      icon: status ? <Lock /> : <LockOpen />,
      function: () => handleOpenDialog(id, "status", status),
    },
    {
      name: "Delete",
      icon: <Delete />,
      function: () => handleOpenDialog(id, "delete"),
    },
  ];

  // List for filter
  const listFilter = [
    {
      name: "Default",
      function: () => handleSelectFilter("id", "DESC"),
    },
    {
      name: "Name by A-z",
      function: () => handleSelectFilter("name", "ASC"),
    },

    {
      name: "Name by Z-a",
      function: () => handleSelectFilter("name", "DESC"),
    },
  ];

  // List for page size
  const dataPageSize = [
    {
      name: "Show 2 records per page",
      id: 2,
    },
    {
      name: "Show 3 records per page",
      id: 3,
    },
    {
      name: "Show 4 records per page",
      id: 4,
    },
  ];

  console.log("data", data);

  return (
    <>
      {isAlert && <AlertCustom {...alertConfig} />}
      {isDialog && <DialogCustom {...dialogConfig} />}

      {/* MAIN CONTENT OF PAGE */}

      {/* HEADING */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-[20px]">Product Management</h1>
        <TextField
          onChange={handleSearch}
          size="small"
          label="Search"
        ></TextField>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          {/* FILTER OPTIONS */}
          <Choices
            icon={<FilterAlt color="action" />}
            listOptions={listFilter}
          ></Choices>
        </div>
      </div>

      {/* MAIN TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="border bg-gray-500">
            <th className="border ">
              <input type="checkbox" name="" id="" />
            </th>
            <th className="border ">ID</th>
            <th className="border ">ACCOUNT</th>
            <th className="border ">CREATED DATE</th>
            <th className="border ">STATUS</th>
            <th className="border ">TOTAL PRICE</th>
            <th className="border w-4 "></th>
          </tr>
        </thead>

        <tbody className="text-center bg-white">
          {data?.map((order) => (
            <tr key={order.id}>
              <td className="">
                <input type="checkbox" />
              </td>
              <td>{order.id}</td>
              <td>
                <Link to={`/admin/order/${order.id}`}>
                  {order.email || "null"}
                </Link>
              </td>

              <td>{order.createdDate}</td>
              <td>{order.orderStatus}</td>
              <td>{order.totalPrice}</td>

              <td>
                ASDSADASD
                {/* <Choices
                      icon={<MoreHoriz />}
                      // listOptions={listOptions(order.id, pro.status)}
                    ></Choices> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION  */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-[16px]">
          Show <b>{numberOfElements}</b> of <b>{totalElements}</b> records
        </div>

        <NativeSelectCustom
          onChange={handleChangePageSize}
          // label={"Size"}
          data={dataPageSize}
        />

        <Pagination
          size="large"
          onChange={handlePage}
          count={totalPages}
          color="primary"
        ></Pagination>
      </div>
    </>
  );
}
