import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, message, Upload } from "antd";
import { Cloud, FileUpload, UploadFile } from "@mui/icons-material";
import { getBase64 } from "../../../services/common";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../../../services/userService";

export default function Information() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { infor } = useSelector((state) => state.user);

  const loadUser = () => {
    dispatch(getUserInfor());
  };

  useEffect(() => {
    if (infor) {
      Object.entries(infor).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [infor]);
  // console.log(user);
  // console.log("Ádsad");
  const {
    register,
    clearErrors,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const resetUpload = () => {
    setFile(null);
    setFileList([]);
    setPreviewImage("");
    setPreviewOpen(false);
  };

  const onSubmit = async (dataForm) => {
    console.log("data", dataForm);

    try {
      const formData = new FormData();
      formData.append("fullName", dataForm.fullName);
      formData.append("dob", dataForm.dob);
      formData.append("phone", dataForm.phone);

      if (file) {
        formData.append("file", file);
      }

      await dispatch(editUserInfor(formData)).unwrap();

      // Reset API get infor
      message.success("Change information successfully!!");
      loadUser();
      // Reset component upload of antd
      resetUpload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetFile = ({ fileList }) => {
    setFileList(fileList); // Cập nhật danh sách file mới
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj); // Lấy file đầu tiên trong danh sách
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // console.log("infor", infor);
  console.log("file", file);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4 pb-4 text-center border-b border-red-400">
          Account Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Fullname</label>
            <TextField
              size="small"
              {...register("fullName", { required: "Must not be blank" })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              className="w-[60%] "
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Date of birth</label>
            <TextField
              type="date"
              {...register("dob")}
              error={!!errors.dob}
              helperText={errors.dob?.message}
              size="small"
              className="w-[60%]"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Phone number</label>
            <TextField
              type="number"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              size="small"
              className="w-[60%]"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Email</label>
            <TextField
              type="text"
              disabled
              {...register("email", { required: "Must not be blank" })}
              // error={!!errors.email}
              // helperText={errors.email?.message}
              size="small"
              className="w-[60%] bg-red-300"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Avatar</label>
            <div className="w-[60%]">
              <Upload
                maxCount={1}
                fileList={fileList}
                listType="picture"
                onChange={handleGetFile}
                onPreview={handlePreview}
                beforeUpload={() => false}
              >
                <Button
                  size="small"
                  startIcon={<FileUpload />}
                  variant="contained"
                >
                  Upload
                </Button>
              </Upload>

              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Change Your Password</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">Old password</label>
            <TextField
              size="small"
              type="password"
              // name="oldPassword"
              // value={userInfo?.oldPassword}
              // onChange={handleInputChange}
              className="w-[60%] "
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">New password</label>
            <TextField
              size="small"
              type="password"
              // name="newPassword"
              // value={userInfo?.newPassword}
              // onChange={handleInputChange}
              className="w-[60%] "
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-sm font-medium">
              Re-enter your password
            </label>
            <TextField
              size="small"
              type="password"
              // name="confirmPassword"
              // value={userInfo?.confirmPassword}
              // onChange={handleInputChange}
              className="w-[60%] "
            />
          </div>
        </div>
        {/*  */}
        <div className="flex gap-8 mt-6">
          {/* <Button
            variant="outlined"
            sx={{ color: "black" }}
            className=" text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete your account
          </Button> */}
          <Button type="submit" variant="contained">
            Save information
          </Button>
        </div>
      </form>
    </>
  );
}
