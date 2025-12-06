import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
import CreateModal from "../CreateModal/CreateModal";

;
export default  function UserPosts({ id }) {
console.log(id)

 async  function getUserPosts() {
    return await  axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts?limit=10`,
      {
        headers: {
          token: localStorage.getItem("user token"),
        },
      }
    );
  }

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["userPosts", id],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
    enabled: !!id,
  });
console.log(data)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id} className="border-b pb-4">
          <Link to={`/PostDetails/${post._id}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={post.user.photo}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <p className="font-medium">{post.user.name}</p>
              </div>
              <div className="text-sm text-slate-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>

            {post.body && <h2 className="mb-4">{post.body}</h2>}

            {post.image && (
              <img
                src={post.image}
                className="w-full rounded-md "
                alt={post.body}
              />
            )}

            {Array.isArray(post.comments) && post.comments.length > 0 && (
              <Comments comment={post.comments[0]} />
            )}
          </Link>

          {data?.data?.posts && <CreateModal postId={post._id} />}
        </div>
      ))}
    
    </div>
  );
}
