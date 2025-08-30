import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function UploadFilePhoto() {
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      photo: "",
    },
  });

  function changeShow() {
    setIsShow(!isShow);
  }

  async function handleUploadPhoto(values) {
    try {
      const formData = new FormData();
      formData.append("photo", values.photo[0]);

      const res = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            token: localStorage.getItem("user token"),
          },
        }
      );

      if (res.data.message === "success") {
        alert("✅ Photo uploaded successfully!");
        reset();
        setIsShow(false);
      }
    } catch (error) {
      console.error(
        "❌ Upload error:",
        error.response?.data?.error?.message || error.message
      );
      alert("❌ Failed to upload photo.");
    }
  }

  return (
    <div>
      <button
        onClick={changeShow}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Upload Photo
      </button>

      {isShow && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Photo</h3>
              <button
                onClick={changeShow}
                type="button"
                className="text-gray-500 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit(handleUploadPhoto)}>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  className="block w-full border rounded p-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Uploading..." : "Confirm Upload"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/*
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
export default function UploadFilePhoto() {
  const [isShow, setisShow] = useState(false);
  const form = useForm({
    defaultValues: {
      photo:'',
    },
  });
    let { register, handleSubmit } = form;
    function changeShow() {
      setisShow(!isShow);
    }
  
    function handleUploadPhoto(values){
      let photo=new FormData()
      photo.append('photo',values.photo[0])
      axios.put("https://linked-posts.routemisr.com/users/upload-photo",photo,{
        headers:{
          token:localStorage.getItem('user token')
        }
      })
    
    .then((res) =>{
      if(res.data.message){
        console.log("success")
      }

    })
    .catch((error) =>{
      console.log(error.response.data.error)
    })
    }
  return (
    <div>
      <div>
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          photo
        </button>
        {isShow && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    upload photo
                  </h3>
                  <button
                    onClick={changeShow}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <i className="fa fa-close"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    action="#"
                    onSubmit={handleSubmit(handleUploadPhoto)}
                  >
                    <div>
                      <input
                        type="file"
                        name="newpassword"
                        {...register("photo")}
                        id="newpassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        onClick={handleUploadPhoto}
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        confirm upload photo
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

*/
