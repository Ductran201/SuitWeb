import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, message, Upload } from "antd";
import { Cloud, Edit, FileUpload, UploadFile } from "@mui/icons-material";
import { getBase64 } from "../../../services/common";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../../../services/userService";
import {
  addAddress,
  deleteAddress,
  editAddress,
  findAllAddress,
} from "../../../services/addressService";

export default function ShippingAddress() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const [listAddress, setListAddress] = useState([]);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const [baseId, setBaseId] = useState(null);

  const loadData = () => {
    dispatch(findAllAddress())
      .then((res) => {
        setListAddress(res.payload);
      })
      .catch((err) => console.log(err));
  };

  const handleShowAlert = (propsAlert) => {
    setAlertConfig(propsAlert);
    setIsAlert(true);
    // Set time to disappear alert
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log("listAddress", listAddress);

  const onSubmit = (data) => {
    console.log(data);

    const action = isFormAdd
      ? addAddress(data)
      : editAddress({ address: data, addressId: baseId });

    dispatch(action).then(() => {
      loadData();
      const propsAlert = {
        mainContent: isFormAdd
          ? "Create new product successfully!!"
          : "Updated product successfully!!",
        severity: "success",
      };

      handleShowAlert(propsAlert);
      resetForm();
    });
  };

  const resetForm = () => {
    reset();
    clearErrors();
    setIsFormAdd(false);
    setIsFormEdit(false);
  };

  const handleOpenEdit = (addressId) => {
    setIsFormEdit(true);
    const findById = listAddress.find((address) => address.id === addressId);

    if (findById) {
      setBaseId(addressId);
      setIsFormEdit(true);
      // Set the old value into input
      Object.entries(findById).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  };

  const handleDelete = () => {
    dispatch(deleteAddress(baseId)).then((err) => {
      setIsFormEdit(false);
      loadData();
    });
  };

  return (
    <>
      {isFormAdd && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
            <h2 className="text-lg font-medium mb-4">
              Vui lòng nhập địa chỉ của bạn (địa chỉ này sẽ được dùng làm địa
              chỉ giao hàng). Hệ thống sẽ tìm cửa hàng gần nơi bạn sinh sống.
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Địa chỉ */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Name receiver
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name receiver"
                    {...register("nameReceiver", {
                      required: "Must not be blank",
                      validate: (value) =>
                        value.trim() !== "" ? true : "Must not be blank",
                    })}
                    className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Tên địa chỉ */}
              <div>
                <label
                  htmlFor="address-name"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="phone"
                  {...register("phoneReceiver", {
                    required: "Must not be blank",
                    validate: (value) =>
                      value.trim() !== "" ? true : "Must not be blank",
                  })}
                  className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="note"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  {...register("fullAddress", {
                    required: "Must not be blank",
                    validate: (value) =>
                      value.trim() !== "" ? true : "Must not be blank",
                  })}
                  placeholder="Address"
                  className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Default Address */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="default-address"
                  className="w-5 h-5 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="default-address" className="text-gray-700">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => resetForm()}
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFormEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
            <h2 className="text-lg font-medium mb-4">
              Vui lòng nhập địa chỉ của bạn (địa chỉ này sẽ được dùng làm địa
              chỉ giao hàng). Hệ thống sẽ tìm cửa hàng gần nơi bạn sinh sống.
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Địa chỉ */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Name receiver
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name receiver"
                    {...register("nameReceiver", {
                      required: "Must not be blank",
                      validate: (value) =>
                        value.trim() !== "" ? true : "Must not be blank",
                    })}
                    className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Tên địa chỉ */}
              <div>
                <label
                  htmlFor="address-name"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="phone"
                  {...register("phoneReceiver", {
                    required: "Must not be blank",
                    validate: (value) =>
                      value.trim() !== "" ? true : "Must not be blank",
                  })}
                  className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="note"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  {...register("fullAddress", {
                    required: "Must not be blank",
                    validate: (value) =>
                      value.trim() !== "" ? true : "Must not be blank",
                  })}
                  placeholder="Address"
                  className="w-full border border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Default Address */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="default-address"
                  className="w-5 h-5 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="default-address" className="text-gray-700">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              <Button
                onClick={handleDelete}
                variant="contained"
                color="warning"
                fullWidth
              >
                Delete
              </Button>
              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => resetForm()}
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4 pb-4 text-center border-b border-red-400">
          Shipping Address
        </h2>

        <div className="text-right mb-4">
          <Button onClick={() => setIsFormAdd(true)} variant="contained">
            Add new
          </Button>
        </div>

        {/* List address */}

        {listAddress.map((address) => (
          <div key={address.id} className="p-3 relative bg-green-300 mb-3">
            <div>{address.nameReceiver}</div>
            <div>{address.phoneReceiver}</div>
            <div>{address.fullAddress}</div>

            <Button
              onClick={() => handleOpenEdit(address.id)}
              className="!absolute right-0 top-4"
              startIcon={<Edit />}
            />
          </div>
        ))}
      </div>
    </>
  );
}
