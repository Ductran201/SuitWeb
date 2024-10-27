import {
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Choices from "../../components/choices";
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
  addColor,
  colorPagination,
  deleteColor,
  editColor,
  toggleStatusColor,
} from "../../services/colorService";

import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import DialogCustom from "../../components/dialog";
import AlertCustom from "../../components/alert/AlertCustom";
import NativeSelectCustom from "../../components/nativeSelect/NativeSelectCustom";

export default function ColorAdmin() {
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

  const [baseId, setBaseId] = useState(null);
  const [color, setColor] = useState({
    name: "",
  });

  const debounce = useDebounce(search, 500);
  // Data of size
  const { data, error, totalPages, totalElements, numberOfElements } =
    useSelector((state) => state.color);

  const loadColorPagination = () => {
    dispatch(
      colorPagination({
        page,
        size: sizePage,
        search,
        sortField,
        sortDirection,
      })
    );
  };
  useEffect(() => {
    loadColorPagination();
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
    setColor({
      ...color,
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
    dispatch(addColor(color))
      .then(() => {
        loadColorPagination();
        const propsAlert = {
          mainContent: "Create new color successfully!!",
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
    dispatch(editColor({ color: color, id: baseId }))
      .then(() => {
        loadColorPagination();
        setIsFormEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteColor(id))
      .then(() => {
        loadColorPagination();
        setIsDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmToggleStatus = (id) => {
    dispatch(toggleStatusColor(id))
      .then(() => {
        loadColorPagination();
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

    // find the old size
    const findById = data.find((c) => c.id === id);
    setColor(findById);
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
          title: "Delete color",
          mainContent: "Are you sure to delete this color?",
          onConfirm: () => handleConfirmDelete(id),
        };
        break;
      case "status":
        propsDialog = {
          onClose: () => {
            setIsDialog(false);
          },
          title: status ? "Block color" : "Unblock color",
          mainContent: status
            ? "Are you sure to block this color?"
            : "Are you sure to unblock this color?",
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
                value={size.name}
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
        <h1 className="font-bold text-[20px]">Color Management</h1>
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
          {data?.map((c) => (
            <tr key={c.id}>
              <td className="">
                <input type="checkbox" />
              </td>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.status ? "Active" : "Inactive"}</td>
              <td>{c.createdDate}</td>

              <td>
                <Choices
                  icon={<MoreHoriz />}
                  listOptions={listOptions(c.id, c.status)}
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
          //   label={"Size"}
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
