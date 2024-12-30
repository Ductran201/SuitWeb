import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  editComment,
  findCommentPagination,
} from "../../../services/commentService";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Choices from "../../../components/choices";
import { Delete, Edit, LockOpen, MoreHoriz } from "@mui/icons-material";

export default function Comment() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const [listComment, setListComment] = useState([]);

  const loadData = () => {
    dispatch(findCommentPagination(productId))
      .then((res) => {
        const comments = res.payload.data.data.content;
        setListComment(comments);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    // API add comment
    dispatch(addComment({ comment: data, productId: productId }))
      .then((res) => {
        const newComment = res.payload.data.data;
        setListComment((prevComments) => [newComment, ...prevComments]);
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  //   const handleEditComment = () => {
  //     dispatch(editComment({comment: }))
  //   };

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    loadData();
  }, []);

  const listOptions = [
    {
      name: "Edit",
      icon: <Edit />,
      //   function: () => handleEditComment(commentId),
      function: () => console.log("first"),
    },

    {
      name: "asd",
      icon: <LockOpen />,
      function: () => console.log("second"),
    },
    {
      name: "Delete",
      icon: <Delete />,
      function: () => console.log("third"),
    },
  ];

  console.log("listComment", listComment);
  return (
    <div className="bg-red-200 p-6 max-w-full shadow-md ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold mb-4">Leave a Comment</h2>

        {/* Input Box */}
        <div className="mb-4">
          <textarea
            {...register("content", { required: "Not empty" })}
            placeholder="Write your comment here..."
            className="min-h-[100px] w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white transition ${
            isValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Post Comment
        </button>
      </form>
      {/* Comments List */}

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">
          Comments ({listComment.length})
        </h3>
        {listComment.length > 0 ? (
          <ul className="space-y-4">
            {listComment.map((comment, index) => (
              // console.log(comment),
              <li key={index} className="p-3 border rounded-lg">
                {/* Main comments */}
                <div className="flex items-start space-x-4">
                  <img
                    src={comment.user?.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="">
                    <div className="flex gap-1">
                      {/* Comment content */}
                      <div className="bg-green-300 p-2 rounded-xl">
                        <span className=" font-semibold">
                          {comment.user.email}
                        </span>

                        <p>{comment.content}</p>
                      </div>

                      <Choices icon={<MoreHoriz />} listOptions={listOptions} />
                    </div>

                    {/* Sub option */}

                    <div className="space-x-2">
                      <span className="text-sm text-gray-500 mt-1">
                        {comment.updatedDate}
                      </span>
                      <span>reaction</span>
                      <span className="text-blue-500 text-sm hover:underline mt-1">
                        Reply
                      </span>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <ul className="mt-4 space-y-3 pl-12">
                    {comment.replies.map((reply, replyIndex) => (
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
