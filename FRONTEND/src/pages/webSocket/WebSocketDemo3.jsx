import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Delete, Edit, LockOpen, MoreHoriz } from "@mui/icons-material";
import {
  addMessage,
  findMessagePagination,
} from "../../services/messageService";
import Choices from "../../components/choices";
import Stomp from "stompjs";

import SockJS from "sockjs-client";

export default function WebSocketDemo3() {
  const dispatch = useDispatch();
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:9999/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/chatRoom", (data) => {
        const message = JSON.parse(data.body);

        console.log({ message });

        loadData();
      });
    });

    loadData();

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const loadData = () => {
    dispatch(findMessagePagination())
      .then((res) => {
        const messages = res.payload.data.data.content;
        setListMessage(messages);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    dispatch(addMessage(data))
      .then((res) => {
        const newMessage = res.payload.data.data;
        setListMessage((prevMessages) => [newMessage, ...prevMessages]);
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    reset();
  };

  const listOptions = [
    {
      name: "Edit",
      icon: <Edit />,
      function: () => console.log("Edit message"),
    },
    {
      name: "asd",
      icon: <LockOpen />,
      function: () => console.log("Lock message"),
    },
    {
      name: "Delete",
      icon: <Delete />,
      function: () => console.log("Delete message"),
    },
  ];

  return (
    <div className="bg-red-200 p-6 max-w-full shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold mb-4">Leave a message</h2>
        <div className="mb-4">
          <textarea
            {...register("message", { required: "Not empty" })}
            placeholder="Write your comment here..."
            className="min-h-[100px] w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white transition ${
            isValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send message
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">
          Messages ({listMessage.length})
        </h3>
        {listMessage.length > 0 ? (
          <ul className="space-y-4">
            {listMessage.map((mes, index) => (
              <li key={index} className="p-3 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src={mes.user?.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="">
                    <div className="flex gap-1">
                      <div className="bg-green-300 p-2 rounded-xl">
                        <span className=" font-semibold">{mes.user.email}</span>
                        <p>{mes.message}</p>
                      </div>
                      <Choices icon={<MoreHoriz />} listOptions={listOptions} />
                    </div>
                    <div className="space-x-2">
                      <span className="text-sm text-gray-500 mt-1">
                        {mes.updatedDate}
                      </span>
                      <span>reaction</span>
                      <span className="text-blue-500 text-sm hover:underline mt-1">
                        Reply
                      </span>
                    </div>
                  </div>
                </div>
                {mes.replies && mes.replies.length > 0 && (
                  <ul className="mt-4 space-y-3 pl-12">
                    {mes.replies.map((reply, replyIndex) => (
                      <li
                        key={replyIndex}
                        className="flex items-start space-x-4"
                      >
                        <img
                          src={
                            reply.user?.profileImage || "/default-avatar.png"
                          }
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{reply.user?.name}</p>
                          <p>{reply.content}</p>
                          <div className="text-sm text-gray-500 mt-1">
                            1 week ago
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
