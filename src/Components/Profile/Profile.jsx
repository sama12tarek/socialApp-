import React from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserPosts from "../UserPosts/UserPosts";
import ChangePasswordModal from "./../ChangePasswordModal/ChangePasswordModal";
import UploadFilePhoto from "../UploadFilePhoto/UploadFilePhoto";
import CreatePost from "../CreatePost/CreatePost";


function Profile() {

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("user token"),
      },
    });
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  console.log(data)

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error.message}
      </div>
    );

  return (
    <>
      <div className="w-full md:w-[60%] mx-auto border-2 border-slate-800 rounded-lg p-4 text-center">
        <img
          src={data?.photo}
          className="size-[50px] mx-auto rounded-full"
          alt={data?.name}
        />
        <p>
          <strong>Name:</strong> {data?.name}
        </p>
        <p>
          <strong>Gender:</strong> {data?.gender}
        </p>
        <p>
          <strong>Email:</strong> {data?.email}
        </p>
        <p>
          <strong>DOB:</strong> {data?.dateOfBirth}
        </p>
      </div>

      <div className=" d-flex justify-between iteams-center gap-2 w-full md:w-[60%] mx-auto border-2 border-slate-800 rounded-lg p-4 text-center mt-6">
        <ChangePasswordModal />

        <UploadFilePhoto />
      </div>
      {data && <UserPosts id={data._id}  />}

      <div>
        {data?._id && <CreatePost userId={data._id} />}

        
      </div>
    </>
  );
}

export default Profile;
