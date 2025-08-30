import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateModal({ postId }) {
  const [isShow, setIsShow] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  function toggleModal() {
    setIsShow(!isShow);
  }

  async function addComment(values) {
    const token = localStorage.getItem("user token");
    console.log("token being used =>", token);

    if (!token) {
      toast.error("You must be logged in to comment.");
      return;
    }

    try {
      await axios.post(
        "https://linked-posts.routemisr.com/comments",
        {
          content: values.content,
          post: postId,
        },
        {
          headers: {
            token: localStorage.getItem('user token'),
          },
        }
      );

      toast.success("Comment added successfully");
      reset();
      setIsShow(false);
    } catch (err) {
      console.error(
        "Error response:",
        err.response?.data || err.message || err
      );

      toast.error("Failed to add comment");
    }
  }


  return (
    <>
      <button
        onClick={toggleModal}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Add Comment
      </button>

      {isShow && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Comment</h2>
              <button onClick={toggleModal} className="text-gray-500 text-lg">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit(addComment)}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium mb-1"
                >
                  Comment
                </label>
                <input
                  {...register("content")}
                  id="comment"
                  type="text"
                  placeholder="Write your comment..."
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              <button
                type="submit"
              
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
