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
  addSize,
  sizePagination,
  deleteSize,
  editSize,
  toggleStatusSize,
} from "../../../services/sizeService";

import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../../components/dialog";
import AlertCustom from "../../../components/alert/AlertCustom";
import NativeSelectCustom from "../../../components/nativeSelect/NativeSelectCustom";
import { useForm } from "react-hook-form";
import usePaginationCustom from "../../../components/usePaginationCustom/UsePaginationCustom";

export default function SizeAdmin() {
  const dispatch = useDispatch();

  // Pagination

  const [isFormAdd, setIsFormAdd] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const [baseId, setBaseId] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(2);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [search, setSearch] = useState("");

  const {
    handleSearch,
    handleChangePage,
    handleChangeSize,
    handleSelectFilter,
  } = usePaginationCustom();

  const debounce = useDebounce(search, 500);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPage(Number(searchParams.get("page")) || 1);
    setSizePage(Number(searchParams.get("size")) || 2);
    setSearch(searchParams.get("search") || "");
    setSortField(searchParams.get("sortField") || "id");
    setSortDirection(searchParams.get("sortDirection") || "DESC");
  }, [window.location.search]);

  // Data of size
  const { data, totalPages, totalElements, numberOfElements } = useSelector(
    (state) => state.size
  );

  const loadSizePagination = () => {
    dispatch(
      sizePagination({ page, size: sizePage, search, sortField, sortDirection })
    );
  };
  useEffect(() => {
    loadSizePagination();
  }, [page, debounce, sizePage, sortDirection, sortField]);

  const handleShowAlert = (propsAlert) => {
    setAlertConfig(propsAlert);
    setIsAlert(true);
    // Set time to disappear alert
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset();
    clearErrors();
    setIsFormAdd(false);
    setIsFormEdit(false);
  };
  const onSubmit = async (dataForm) => {
    try {
      const action = isFormAdd
        ? addSize(dataForm)
        : editSize({ size: dataForm, id: baseId });

      await dispatch(action).unwrap();

      loadSizePagination();
      const propsAlert = {
        mainContent: isFormAdd
          ? "Create new size successfully!!"
          : "Updated size successfully!",
        severity: "success",
      };
      handleShowAlert(propsAlert);
      resetForm();
    } catch (error) {
      setError("name", {
        type: "manual",
        message: error,
      });
    }
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteSize(id))
      .then(() => {
        loadSizePagination();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmToggleStatus = (id) => {
    dispatch(toggleStatusSize(id))
      .then(() => {
        loadSizePagination();
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
    const sizeData = data.find((s) => s.id === id);
    if (sizeData) {
      Object.entries(sizeData).forEach(([key, value]) => {
        setValue(key, value);
      });

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
          title: "Delete size",
          mainContent: "Are you sure to delete this size?",
          onConfirm: () => handleConfirmDelete(id),
        };
        break;
      case "status":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: status ? "Block size" : "Unblock size",
          mainContent: status
            ? "Are you sure to block this size?"
            : "Are you sure to unblock this size?",
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
                    value.trim() !== "" || "Must not be blank",
                })}
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />

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
            className="w-[300px] min-h-[250px] bg-white border border-black p-4 "
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
                    value.trim() !== "" || "Must not be blank",
                })}
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                // value={size.name}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

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
        <h1 className="font-bold text-[20px]">Size Management</h1>
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
          Add new size
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
            <th className="border ">STATUS</th>
            <th className="border ">CREATED DATE</th>
            <th className="border w-4 "></th>
          </tr>
        </thead>

        <tbody className="text-center bg-white">
          {data?.map((s) => (
            <tr key={s.id}>
              <td className="">
                <input type="checkbox" />
              </td>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.status ? "Active" : "Inactive"}</td>
              <td>{s.createdDate}</td>

              <td>
                <Choices
                  icon={<MoreHoriz />}
                  listOptions={listOptions(s.id, s.status)}
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
          data={dataPageSize}
          defaultValue={sizePage}
        />

        <Pagination
          size="large"
          page={page}
          onChange={handleChangePage}
          count={totalPages}
          color="primary"
        ></Pagination>
      </div>
    </>
  );
}
