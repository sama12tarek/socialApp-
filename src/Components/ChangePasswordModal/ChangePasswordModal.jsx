import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ChangePasswordModal() {
  const [isShow, setisShow] = useState(false);

  const form = useForm({
    defaultValues: {
      password: "",
      newpassword: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  function changeShow() {
    setisShow(!isShow);
  }

  function handleChangePassword(values) {
    axios
      .patch(
        "https://linked-posts.routemisr.com/users/change-password",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("user token", res.data.token);
          console.log("Password changed successfully");
          reset(); // تفضية الفورم
          setisShow(false); // إغلاق المودال
        }
      })
      .catch((error) => {
        console.log(
          "Error changing password:",
          error.response?.data?.message || error.message
        );
      });
  }

  return (
    <div>
      <button
        onClick={changeShow}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Change Password
      </button>

      {isShow && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  {...register("password", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="New Password"
                  {...register("newpassword", { required: true })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={changeShow}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
