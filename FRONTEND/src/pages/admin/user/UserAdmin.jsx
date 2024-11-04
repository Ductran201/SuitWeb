import {
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Choices from "../../../components/choices";
import {
  Close,
  Delete,
  Edit,
  Filter,
  FilterAlt,
  Lock,
  LockOpen,
  MoreHoriz,
} from "@mui/icons-material";
import {
  addCategory,
  categoryPagination,
  deleteCategory,
  editCategory,
  toggleStatusCategory,
} from "../../../services/categoryService";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../../components/dialog";
import AlertCustom from "../../../components/alert/AlertCustom";
import NativeSelectCustom from "../../../components/nativeSelect/NativeSelectCustom";
import {
  toggleStatusUser,
  userPagination,
} from "../../../services/userService";

export default function UserAdmin() {
  const dispatch = useDispatch();

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

  const [baseId, setBaseId] = useState(null);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const debounce = useDebounce(search, 500);
  // Data of user
  const { data, error, totalPages, totalElements, numberOfElements } =
    useSelector((state) => state.user);

  const loadUserPagination = () => {
    dispatch(userPagination({ page, size, search, sortField, sortDirection }));
  };
  useEffect(() => {
    loadUserPagination();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleShowAlert = (propsAlert) => {
    setAlertConfig(propsAlert);
    setIsAlert(true);
    // Set time to disappear alert
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  //   const handleAdd = () => {
  //     const formData = new FormData();
  //     formData.append("name", category.name);
  //     formData.append("description", category.description);
  //     formData.append("file", file);
  //     dispatch(addCategory(formData))
  //       .then(() => {
  //         loadUserPagination();
  //         const propsAlert = {
  //           mainContent: "Create new category successfully!!",
  //           severity: "success",
  //         };

  //         handleShowAlert(propsAlert);
  //         setIsFormAdd(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  const handleEdit = (baseId) => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("file", file);
    dispatch(editCategory({ category: formData, id: baseId }))
      .then(() => {
        loadUserPagination();
        setIsFormEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteCategory(id))
      .then(() => {
        loadUserPagination();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmToggleStatus = (id) => {
    dispatch(toggleStatusUser(id))
      .then(() => {
        loadUserPagination();
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

    // find the old category
    const findById = data.find((cat) => cat.id === id);
    setCategory(findById);
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
          title: "Delete Category",
          mainContent: "Are you sure to delete this category?",
          onConfirm: () => handleConfirmDelete(id),
        };
        break;
      case "status":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: status ? "Block user" : "Unblock user",
          mainContent: status
            ? "Are you sure to block this user?"
            : "Are you sure to unblock this user?",
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
    // {
    //   name: "Delete",
    //   icon: <Delete />,
    //   function: () => handleOpenDialog(id, "delete"),
    // },
  ];

  // List for filter
  const listFilter = [
    {
      name: "Default",
      function: () => handleSelectFilter("id", "DESC"),
    },
    {
      name: "Name by A-z",
      function: () => handleSelectFilter("fullName", "ASC"),
    },

    {
      name: "Name by Z-a",
      function: () => handleSelectFilter("fullName", "DESC"),
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
                }}
              />
            </div>
            <div className="flex justify-center items-center flex-col gap-6">
              <TextField
                onChange={handleChange}
                name="name"
                size="small"
                fullWidth
                // id="outlined-basic"
                label="Name"
                variant="outlined"
                value={category.name}
              />
              <TextField
                onChange={handleChange}
                name="description"
                size="small"
                fullWidth
                // id="outlined-basic"
                label="description"
                variant="outlined"
                value={category.description}
              />

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
        <h1 className="font-bold text-[20px]">User Management</h1>
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
            <th className="border ">NAME</th>
            <th className="border ">EMAIL</th>
            <th className="border w-[150px]">AVATAR</th>
            <th className="border ">GENDER</th>
            <th className="border ">STATUS</th>
            <th className="border ">PHONE</th>
            <th className="border ">CREATED DATE</th>
            <th className="border w-4 "></th>
          </tr>
        </thead>

        <tbody className="text-center bg-white">
          {data?.map((user) => (
            <tr key={user.id}>
              <td className="">
                <input type="checkbox" />
              </td>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={user.avatar}
                  alt=""
                  className="h-[100px] w-[100%] object-cover"
                />
              </td>
              <td>{user.gender ? "Male" : "Female"}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>{user.phone}</td>

              <td>{user.createdDate}</td>

              <td>
                <Choices
                  icon={<MoreHoriz />}
                  listOptions={listOptions(user.id, user.status)}
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
          label={"Size"}
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
