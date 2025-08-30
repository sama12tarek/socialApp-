import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comments from "../comments/comments"; // تأكدي من اسم المسار الصحيح

function PostDetails() {
  const { id } = useParams();

  // API call to get post by ID
  function getPostById() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("user token"),
      },
    });
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: getPostById,
  });

  if (isLoading) return <div>Loading post...</div>;
  if (error) return <div>Error loading post.</div>;

  const post = data?.data?.post;

  return (
    <div className="p-4 space-y-4">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold mb-2">{post.body}</h1>
        {post.image && (
          <img src={post.image} alt="Post" className="w-full rounded-md mb-4" />
        )}
      </div>

      {/* 🔽 التعليقات */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {Array.isArray(post.comments) && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <Comments key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
