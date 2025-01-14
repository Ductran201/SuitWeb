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
  productDetailById,
} from "../../../services/productDetailService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../../components/dialog";
import AlertCustom from "../../../components/alert/AlertCustom";
import NativeSelectCustom from "../../../components/nativeSelect/NativeSelectCustom";
import { sizeNoPagination } from "../../../services/sizeService";
import SelectCustom from "../../../components/select/SelectCustom";
import { useParams } from "react-router-dom";
import { colorNoPagination } from "../../../services/colorService";
import { useForm } from "react-hook-form";
import usePaginationCustom from "../../../components/usePaginationCustom/UsePaginationCustom";

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

  const [fileAdd, setFileAdd] = useState([]);
  const [fileEdit, setFileEdit] = useState([]);
  const debounce = useDebounce(search, 500);
  // Data of product
  const {
    data: productDetailData,
    totalPages,
    totalElements,
    numberOfElements,
  } = useSelector((state) => state.productDetail);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset();
    clearErrors();
    setIsFormAdd(false);
    setIsFormEdit(false);
    setFileAdd([]);
    setFileEdit([]);
  };

  const {
    handleSearch,
    handleChangePage,
    handleChangeSize,
    handleSelectFilter,
  } = usePaginationCustom();

  const onSubmit = async (dataForm) => {
    try {
      const formData = new FormData();
      formData.append("name", dataForm.name);
      formData.append("price", dataForm.price);
      formData.append("stockQuantity", dataForm.stockQuantity);
      formData.append("colorId", dataForm.colorId);
      formData.append("sizeId", dataForm.sizeId);
      formData.append("productId", productId);

      // Check fileEdit to get the proper id

      // Send the id of existingImageIdsToKeep to server
      const existingImageIdsToKeep = fileEdit
        ?.map((image) => image.id)
        .filter((id) => id !== null && id !== undefined); // remove null and undefine

      // console.log(existingImageIdsToKeep);

      if (existingImageIdsToKeep.length > 0) {
        // Pass the id of existingImageIdsToKeep to formData
        existingImageIdsToKeep.forEach((id) => {
          formData.append("existingImageIdsToKeep", id);
        });
      }

      if (fileAdd && fileAdd.length > 0) {
        fileAdd.forEach((file) => {
          if (file.file) formData.append("images", file.file);
        });
      } else if (fileEdit && fileEdit.length > 0) {
        fileEdit.forEach((file) => {
          if (file.file) formData.append("images", file.file);
        });
      }

      const action = isFormAdd
        ? addProductDetail(formData)
        : editProductDetail({ productDetail: formData, id: baseId });

      await dispatch(action).unwrap();
      loadProductDetailPagination();
      const propsAlert = {
        mainContent: isFormAdd
          ? "Create new product successfully!!"
          : "Updated product successfully!!",
        severity: "success",
      };

      handleShowAlert(propsAlert);
      resetForm();
    } catch (error) {
      setError("name", {
        type: "manual",
        message: error,
      });
      // setError("form", { message: error || "An error occurred" });
    }
  };

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
    loadColorList();
    loadSizeList();
  }, []);

  useEffect(() => {
    loadProductDetailPagination();
  }, [page, debounce, sizePage, sortDirection, sortField]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPage(Number(searchParams.get("page")) || 1);
    setSizePage(Number(searchParams.get("size")) || 2);
    setSearch(searchParams.get("search") || "");
    setSortField(searchParams.get("sortField") || "id");
    setSortDirection(searchParams.get("sortDirection") || "DESC");
  }, [window.location.search]);

  // console.log("fileedit:", fileEdit);

  const handleGetFile = (e, formType) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    if (formType === "add") {
      setFileAdd((prevFiles) => [...prevFiles, ...newFiles]);
      console.log(fileAdd);
    } else if (formType === "edit") {
      setFileEdit((prevFiles) => [...prevFiles, ...newFiles]);
      console.log(fileEdit);
    }
  };

  const handleRemoveImage = (formType, index) => {
    if (formType === "add") {
      setFileAdd((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (formType === "edit") {
      setFileEdit((prevFiles) => prevFiles.filter((_, i) => i !== index));
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

  const handleOpenEdit = async (id) => {
    // find the old product
    const findById = await dispatch(productDetailById(id)).unwrap();
    console.log(findById);
    if (findById) {
      setBaseId(id);
      setIsFormEdit(true);
      Object.entries(findById.productDetail).forEach(([key, value]) => {
        setValue(key, value);
      });

      setValue("colorId", findById.productDetail.color.id);
      setValue("sizeId", findById.productDetail.size.id);

      // Tạo mảng `newFiles` từ `findById.images` để phù hợp với `setFileEdit`
      const newFiles = findById.images.map((img) => ({
        url: img.image, // Đường dẫn URL ảnh từ `ImgProductDetail`
        // file: null,
        id: img.id,
      }));
      setFileEdit(newFiles);
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
            onSubmit={handleSubmit(onSubmit)}
            className="w-[300px] min-h-[250px] bg-gray-500 p-4"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="">Add</h1>
              <Close className="cursor-pointer" onClick={resetForm} />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                {...register("name", {
                  required: "Must not be blank",
                  validate: (value) =>
                    value.trim() !== "" ? true : "Must not be blank",
                })}
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                {...register("price", {
                  required: "Must not be blank",
                  min: 0,
                })}
                type="number"
                size="small"
                fullWidth
                label="price"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                {...register("stockQuantity", {
                  required: "Must not be blank",
                })}
                type="number"
                size="small"
                fullWidth
                label="stockQuantity"
                variant="outlined"
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity?.message}
              />
              <SelectCustom
                {...register("colorId", {
                  required: "Must not be blank",
                })}
                label={"color"}
                data={colorData}
                value={watch("colorId")}
                onChange={(e) => {
                  setValue("colorId", e.target.value);
                  clearErrors("colorId");
                }}
                error={!!errors.colorId}
                helperText={errors.colorId?.message}
              ></SelectCustom>

              <SelectCustom
                {...register("sizeId", {
                  required: "Must not be blank",
                })}
                label={"size"}
                data={sizeData}
                value={watch("sizeId")}
                onChange={(e) => {
                  setValue("sizeId", e.target.value);
                  clearErrors("sizeId");
                }}
                error={!!errors.sizeId}
                helperText={errors.sizeId?.message}
              ></SelectCustom>
              <Button
                fullWidth
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e) => handleGetFile(e, "add")}
              >
                Upload files
                <input type="file" multiple={true} hidden />
              </Button>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {fileAdd?.map((file, index) => (
                  <div key={index} className="relative w-20 h-20 mt-2">
                    <img
                      src={file.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage("add", index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <Button type="submit" variant="contained" fullWidth>
                Add
              </Button>
            </div>
          </form>
        </div>
      )}

      {isFormEdit && (
        <div className="fixed inset-0 flex justify-center items-center h-[100%] z-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[300px] min-h-[250px] bg-gray-500 p-4"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="">Edit</h1>
              <Close className="cursor-pointer" onClick={resetForm} />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                {...register("name", {
                  required: "Must not be blank",
                  validate: (value) =>
                    value.trim() !== "" ? true : "Must not be blank",
                })}
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                {...register("price", {
                  required: "Must not be blank",
                })}
                type="number"
                size="small"
                fullWidth
                label="price"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                {...register("stockQuantity", {
                  required: "Must not be blank",
                })}
                type="number"
                size="small"
                fullWidth
                label="stockQuantity"
                variant="outlined"
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity?.message}
              />
              <SelectCustom
                {...register("colorId", {
                  required: "Must not be blank",
                })}
                label={"color"}
                data={colorData}
                value={watch("colorId")}
                onChange={(e) => {
                  setValue("colorId", e.target.value);
                  clearErrors("colorId");
                }}
                error={!!errors.colorId}
                helperText={errors.colorId?.message}
              ></SelectCustom>

              <SelectCustom
                {...register("sizeId", {
                  required: "Must not be blank",
                })}
                label={"size"}
                data={sizeData}
                value={watch("sizeId")}
                onChange={(e) => {
                  setValue("sizeId", e.target.value);
                  clearErrors("sizeId");
                }}
                error={!!errors.sizeId}
                helperText={errors.sizeId?.message}
              ></SelectCustom>
              <Button
                fullWidth
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e) => handleGetFile(e, "edit")}
              >
                Upload files
                <input type="file" multiple={true} hidden />
              </Button>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {fileEdit?.map((file, index) => (
                  <div key={index} className="relative w-20 h-20 mt-2">
                    <img
                      src={file.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage("edit", index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <Button type="submit" variant="contained" fullWidth>
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
            <th className="border w-4"></th>
          </tr>
        </thead>
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
          onChange={handleChangeSize}
          // label={"Size"}
          data={dataPageSize}
        />

        <Pagination
          size="large"
          onChange={handleChangePage}
          count={totalPages}
          color="primary"
        ></Pagination>
      </div>
    </>
  );
}
