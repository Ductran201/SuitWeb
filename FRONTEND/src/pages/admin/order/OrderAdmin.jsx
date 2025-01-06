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
import { orderPagination } from "../../../services/orderService";

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

  const [isFormAdd, setIsFormAdd] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  // const [isOrderDetail, setIsOrderDetail] = useState(false);

  const [baseId, setBaseId] = useState(null);

  const [fileAdd, setFileAdd] = useState(null);
  const [fileEdit, setFileEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset();
    clearErrors();
    setFileAdd(null);
    setFileEdit(null);
    setIsFormAdd(false);
    setIsFormEdit(false);
  };

  // const onSubmit = async (dataForm) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", dataForm.name);
  //     formData.append("description", dataForm.description);
  //     formData.append("categoryId", dataForm.categoryId);

  //     if (fileAdd) {
  //       formData.append("file", fileAdd.file);
  //     } else if (fileEdit && fileEdit.file) {
  //       // Update change the old image
  //       formData.append("file", fileEdit.file);
  //     } else if (!fileEdit) {
  //       //  Delete the old image
  //       formData.append("file", new File([], ""));
  //     }

  //     const action = isFormAdd
  //       ? addProduct(formData)
  //       : editProduct({ product: formData, id: baseId });

  //     await dispatch(action).unwrap();
  //     loadProductPagination();
  //     const propsAlert = {
  //       mainContent: isFormAdd
  //         ? "Create new product successfully!!"
  //         : "Updated product successfully!!",
  //       severity: "success",
  //     };

  //     handleShowAlert(propsAlert);
  //     resetForm();
  //   } catch (error) {
  //     setError("name", {
  //       type: "manual",
  //       message: error,
  //     });
  //   }
  // };

  const debounce = useDebounce(search, 500);

  // Data of category
  const { data, totalPages, totalElements, numberOfElements } = useSelector(
    (state) => state.order
  );

  const loadOrderPagination = () => {
    dispatch(orderPagination({ page, size, search, sortField, sortDirection }));
    // console.log("first");
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

  const handleGetFile = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        url: URL.createObjectURL(file),
        file,
      };
      if (formType == "add") {
        setFileAdd(newFile);
      } else if (formType == "edit") {
        setFileEdit(newFile);
      }
    }
  };

  const handleRemoveImage = (formType) => {
    if (formType === "add") {
      setFileAdd(null);
    } else if (formType === "edit") {
      setFileEdit(null);
    }
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
      // Object.entries(findById).forEach(([key, value]) => {
      //   setValue(key, value);
      // });
      // setFileEdit(findById.image ? { url: findById.image } : null);
      // setValue("categoryId", findById.category.id);
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
      {/* {isOrderDetail && <OrderDetailAdmin />} */}
      {/* {isFormEdit && (
        <div className="fixed inset-0 flex justify-center items-center h-[100%] z-10">
          <form className="w-[300px] min-h-[250px] bg-white border border-black p-4 ">
            <div className="flex justify-between items-center mb-5">
              <h1 className="">Edit</h1>
              <Close className="cursor-pointer" onClick={resetForm} />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                {...register("name", {
                  required: "Must not be blank",
                  validate: (value) => {
                    value.trim() != "" || "Must not be blank";
                  },
                })}
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
              <TextField
                {...register("description", {
                  required: "Must not be blank",
                  validate: (value) => {
                    value.trim() != "" || "Must not be blank";
                  },
                })}
                size="small"
                fullWidth
                label="description"
                variant="outlined"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ""
                }
              />
              <SelectCustom
                {...register("categoryId", {
                  required: "Must not be blank",
                })}
                onChange={(e) => {
                  setValue("categoryId", e.target.value);
                  clearErrors("categoryId");
                }}
                label={"category"}
                data={categoryData}
                value={watch("categoryId")}
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
              ></SelectCustom>
              <Button
                fullWidth
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e) => {
                  handleGetFile(e, "edit");
                }}
              >
                Upload files
                <input type="file" hidden />
              </Button>
              {fileEdit && (
                <div className="relative w-20 h-20 mt-2">
                  <img
                    src={fileEdit.url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage("edit")}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              )}
              <Button type="submit" variant="contained" fullWidth>
                Edit
              </Button>
            </div>
          </form>
        </div>
      )} */}

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
