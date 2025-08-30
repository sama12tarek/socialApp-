

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePost({ userId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  const queryClient = useQueryClient();
async function handlePost(values) {
  const formData = new FormData();
  formData.append("body", values.body);

  if (values.image && values.image.length > 0) {
    formData.append("image", values.image[0]);
  }

  try {
    const res = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`, 
      formData,
      {
        headers: {
          token: localStorage.getItem("user token"),
        },
      }
    );

    toast.success("✅ Post Updated Successfully");
    queryClient.invalidateQueries(["userPosts", userId]);
    reset();
  } catch (error) {
    console.log(error.response?.data?.error);
    toast.error("❌ Failed to update post");
  }
}


  return (
    <form onSubmit={handleSubmit(handlePost)}>
      <div className="p-4 bg-slate-200 my-4">
        <input
          type="text"
          placeholder="Write your post..."
          className="border-slate-700 w-full rounded-lg border-4 p-2"
          {...register("body", { required: true })}
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="photo"
          className="bg-teal-600 p-4 w-full text-center cursor-pointer block text-white"
        >
          <i className="fas fa-image fa-2xl"></i> Upload Image
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          className="hidden"
          {...register("image")}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 w-full text-white p-4 rounded-lg cursor-pointer"
        >
          Update Post
        </button>
      </div>
    </form>
  );
}























/*
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePost({ userId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  const queryClient = useQueryClient();

  async function handlePost(values) {
    const formData = new FormData();
    formData.append("body", values.body);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/posts/66875b3b006c4ff191a61a89",
        formData,
        {
          headers: {
            token: localStorage.getItem("user token"),
          },
        }
      );

      toast.success("✅ Post Created Successfully");
      queryClient.invalidateQueries(["userPosts", userId]);
      reset();
    } catch (error) {
      console.log(error.response?.data?.error);
      toast.error("❌ Failed to create post");
    }
  }

  return (
    <form onSubmit={handleSubmit(handlePost)}>
      <div className="p-4 bg-slate-200 my-4">
        <input
          type="text"
          placeholder="Write your post..."
          className="border-slate-700 w-full rounded-lg border-4 p-2"
          {...register("body", { required: true })}
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="photo"
          className="bg-teal-600 p-4 w-full text-center cursor-pointer block text-white"
        >
          <i className="fas fa-image fa-2xl"></i> Upload Image
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          className="hidden"
          {...register("image")}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 w-full text-white p-4 rounded-lg cursor-pointer"
        >
          Add Post
        </button>
      </div>
    </form>
  );
}
  */
