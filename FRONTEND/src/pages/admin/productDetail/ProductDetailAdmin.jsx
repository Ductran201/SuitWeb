import { Button, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Choices from "../../../components/choices";
import {
  Close,
  Delete,
  Edit,
  FilterAlt,
  Lock,
  LockOpen,
  MoreHoriz,
} from "@mui/icons-material";
import {
  productDetailPagination,
  deleteProductDetail,
  editProductDetail,
  toggleStatusProductDetail,
  addProductDetail,
} from "../../../services/productDetailService";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../../components/dialog";
import AlertCustom from "../../../components/alert/AlertCustom";
import NativeSelectCustom from "../../../components/nativeSelect/NativeSelectCustom";
import { sizeNoPagination } from "../../../services/sizeService";
import SelectCustom from "../../../components/select/SelectCustom";
import { Link, useParams } from "react-router-dom";
import { colorNoPagination } from "../../../services/colorService";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

export default function ProductDetailAdmin() {
  const dispatch = useDispatch();

  // Pagination
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(2);

  const [isFormAdd, setIsFormAdd] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const { productId } = useParams();
  const [baseId, setBaseId] = useState(null);

  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    colorId: "",
    sizeId: "",
    productId: productId,
  });

  const resetProductDetail = () => {
    setProductDetail({
      name: "",
      price: "",
      stockQuantity: "",
      colorId: "",
      sizeId: "",
    });
  };

  const debounce = useDebounce(search, 500);
  // Data of product
  const {
    data: productDetailData,
    error: productDetailError,
    totalPages,
    totalElements,
    numberOfElements,
  } = useSelector((state) => state.productDetail);

  // Data of size
  const { data: sizeData, error: sizeError } = useSelector(
    (state) => state.size
  );

  // Data of color
  const { data: colorData, error: colorError } = useSelector(
    (state) => state.color
  );

  const loadProductDetailPagination = () => {
    dispatch(
      productDetailPagination({
        page,
        sizePage,
        search,
        sortField,
        sortDirection,
        productId,
      })
    );
  };

  const loadSizeList = () => {
    dispatch(sizeNoPagination());
  };

  const loadColorList = () => {
    dispatch(colorNoPagination());
  };

  useEffect(() => {
    loadProductDetailPagination();
    loadColorList();
    loadSizeList();
  }, [page, debounce, sizePage, sortDirection, sortField]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  const handleChangePageSize = (newSize) => {
    setSizePage(newSize);
  };

  const handleSelectFilter = (sortField, sortDirection) => {
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetail({
      ...productDetail,
      [name]: value,
    });
  };

  const [file, setFile] = useState(null);

  const handleGetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleShowAlert = (propsAlert) => {
    setAlertConfig(propsAlert);
    setIsAlert(true);
    // Set time to disappear alert
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const handleAdd = () => {
    dispatch(addProductDetail(productDetail))
      .then(() => {
        loadProductDetailPagination();
        const propsAlert = {
          mainContent: "Create new product successfully!!",
          severity: "success",
        };

        handleShowAlert(propsAlert);
        setIsFormAdd(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (baseId) => {
    dispatch(editProductDetail({ product: productDetail, id: baseId }))
      .then(() => {
        loadProductDetailPagination();
        setIsFormEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteProductDetail(id))
      .then(() => {
        loadProductDetailPagination();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmToggleStatus = (id) => {
    console.log(id);
    dispatch(toggleStatusProductDetail(id))
      .then(() => {
        loadProductDetailPagination();
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
    setBaseId(id);
    setIsFormEdit(true);

    // find the old product
    const findById = productDetailData.find((pro) => pro.id === id);
    setProductDetail({
      ...findById,
      colorId: findById.color.id,
      sizeId: findById.size.id,
    });
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
          title: "Delete product detail",
          mainContent: "Are you sure to delete this product detail?",
          onConfirm: () => handleConfirmDelete(id),
        };
        break;
      case "status":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: status ? "Block product detail" : "Unblock product detail",
          mainContent: status
            ? "Are you sure to block this product detail?"
            : "Are you sure to unblock this product detail?",
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

  // ==================== HTML ================================
  return (
    <>
      {isAlert && <AlertCustom {...alertConfig} />}
      {isDialog && <DialogCustom {...dialogConfig} />}

      {isFormAdd && (
        <div className="fixed inset-0 flex justify-center items-center h-[100%] z-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-[300px] min-h-[250px] bg-gray-500 p-4"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="">Add</h1>
              <Close
                className="cursor-pointer"
                onClick={() => {
                  setIsFormAdd(false);
                }}
              />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                onChange={handleChange}
                name="name"
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                name="price"
                type="number"
                size="small"
                fullWidth
                label="price"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                name="stockQuantity"
                type="number"
                size="small"
                fullWidth
                label="stockQuantity"
                variant="outlined"
              />
              <SelectCustom
                label={"color"}
                data={colorData}
                name="colorId"
                value={productDetail.colorId}
                onChange={handleChange}
              ></SelectCustom>

              <SelectCustom
                label={"size"}
                data={sizeData}
                name="sizeId"
                value={productDetail.sizeId}
                onChange={handleChange}
              ></SelectCustom>
              {/* <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleGetFile}
              >
                Upload files
                <VisuallyHiddenInput type="file" multiple />
              </Button> */}
              <Button
                onClick={handleAdd}
                type="submit"
                variant="contained"
                fullWidth
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      )}

      {isFormEdit && (
        <div className="fixed inset-0 flex justify-center items-center h-[100%] z-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-[300px] min-h-[250px] bg-white border border-black p-4 "
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="">Edit</h1>
              <Close
                className="cursor-pointer"
                onClick={() => {
                  setIsFormEdit(false);
                  resetProductDetail();
                }}
              />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                onChange={handleChange}
                name="name"
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                value={product.name}
              />
              <TextField
                onChange={handleChange}
                name="price"
                type="number"
                size="small"
                fullWidth
                label="Price"
                variant="outlined"
                value={productDetail.price}
              />
              <TextField
                onChange={handleChange}
                name="stockQuantity"
                type="number"
                size="small"
                fullWidth
                label="Stock quantity"
                variant="outlined"
                value={productDetail.stockQuantity}
              />

              <SelectCustom
                label={"color"}
                data={colorData}
                name="colorId"
                value={productDetail.colorId}
                onChange={handleChange}
              ></SelectCustom>

              <SelectCustom
                label={"size"}
                data={sizeData}
                name="sizeId"
                value={productDetail.sizeId}
                onChange={handleChange}
              ></SelectCustom>
              {/* <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleGetFile}
              >
                Upload files
                <VisuallyHiddenInput type="file" multiple />
              </Button> */}
              <Button
                onClick={() => handleEdit(baseId)}
                type="submit"
                variant="contained"
                fullWidth
              >
                Edit
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* MAIN CONTENT OF PAGE */}

      {/* HEADING */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-[20px]">Product Detail Management</h1>
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

        <Button variant="contained" onClick={() => setIsFormAdd(true)}>
          Add new product detail
        </Button>
      </div>

      {/* MAIN TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="border bg-gray-500">
            <th className="border ">
              <input type="checkbox" name="" id="" />
            </th>
            <th className="border ">ID</th>
            <th className="border ">NAME</th>
            {/* <th className="border w-[150px]">IMAGE</th> */}
            <th className="border ">PRICE</th>
            <th className="border ">STOCK QUANTITY</th>
            <th className="border ">COLOR</th>
            <th className="border ">SIZE</th>
            <th className="border ">STATUS</th>
            <th className="border ">CREATED DATE</th>
            <th className="border w-4 "></th>
          </tr>
        </thead>
        {console.log(productDetailData)}
        <tbody className="text-center bg-white">
          {productDetailData?.map((pro) => (
            <tr key={pro.id}>
              <td className="">
                <input type="checkbox" />
              </td>
              <td>{pro.id}</td>
              <td>{pro.name}</td>
              {/* <td>
                <img
                  src={pro.image}
                  alt=""
                  className="h-[100px] w-[100%] object-cover"
                />
              </td> */}
              <td>{pro.price}</td>
              <td>{pro.stockQuantity}</td>

              <td>{pro.color.name}</td>

              <td>{pro.size.name}</td>

              <td>{pro.status ? "Active" : "Inactive"}</td>

              <td>{pro.createdDate}</td>

              <td>
                <Choices
                  icon={<MoreHoriz />}
                  listOptions={listOptions(pro.id, pro.status)}
                ></Choices>
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