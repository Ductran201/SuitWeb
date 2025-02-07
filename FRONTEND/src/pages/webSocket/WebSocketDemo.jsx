import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { addPerson, findAll } from "../../services/personService";

export default function PersonAdmin() {
  const dispatch = useDispatch();

  const [isFormAdd, setIsFormAdd] = useState(false);

  // Data of size
  const { data } = useSelector((state) => state.person);

  const loadPersons = () => {
    dispatch(findAll());
  };
  useEffect(() => {
    const socket = new SockJS("http://localhost:9999/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/persons", (message) => {
        const person = JSON.parse(message.body);
        // Dispatch action to update the state with the new person
        loadPersons();
      });
    });

    loadPersons();

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset();
    clearErrors();
    setIsFormAdd(false);
  };

  const onSubmit = async (dataForm) => {
    try {
      await dispatch(addPerson(dataForm)).unwrap();

      loadPersons();

      resetForm();
    } catch (error) {
      setError("name", {
        type: "manual",
        message: error,
        // API error message, e.g., "This color already exists"
      });
    }
  };

  return (
    <>
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
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                {...register("name", {
                  required: "Must not be blank",
                  validate: (value) =>
                    value.trim() !== "" || "Must not be blank",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                size="small"
                fullWidth
                label="Age"
                variant="outlined"
                {...register("age", {
                  required: "Must not be blank",
                  validate: (value) =>
                    value.trim() !== "" || "Must not be blank",
                })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />

              <Button type="submit" variant="contained" fullWidth>
                Add
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* MAIN CONTENT OF PAGE */}

      {/* HEADING */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-[20px]">Color Management</h1>
      </div>

      <div className="flex justify-between mb-2">
        <Button
          variant="contained"
          onClick={() => {
            setIsFormAdd(true);
            reset();
          }}
        >
          Add new Person
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
            <th className="border ">Age</th>
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
              <td>{c.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
