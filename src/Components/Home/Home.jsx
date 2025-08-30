import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

import Comment from "../comments/comments";
import CreateModal from "../CreateModal/CreateModal";
import CreatePost from "../CreatePost/CreatePost";

function Home() {
  async function getAllPosts() {
    return await axios.get(
      "https://linked-posts.routemisr.com/posts?limit=50",
      {
        headers: {
          token: localStorage.getItem("user token"),
        },
      }
    );
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    select: (data) => data.data?.posts, // تأكد من أنك تتعامل مع البيانات بشكل صحيح
  });

  if (isLoading) {
    return <div className="p-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading posts.</div>;
  }

  const posts = data || [];

  return (
    <div className="space-y-6 p-4">
      <CreatePost userId={posts?.user?._id} />

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="border-b pb-4">
            <Link to={`/PostDetails/${post._id}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={post?.user?.photo || "/default-user.png"}
                    className="w-10 h-10 rounded-full"
                    alt={post?.user?.name || "User"}
                  />
                  <p className="font-medium">{post?.user?.name}</p>
                </div>
                <div className="text-sm text-slate-400">
                  {new Date(post?.createdAt).toLocaleDateString()}
                </div>
              </div>

              {post?.body && <h2 className="mb-4 text-lg">{post.body}</h2>}

              {post?.image && (
                <img
                  src={post.image}
                  className="w-full rounded-md shadow-lg"
                  alt={post.body || "Post Image"}
                />
              )}

              {/* عرض التعليقات إذا كانت موجودة */}
              {Array.isArray(post?.comments) && post.comments.length > 0 && (
                <div className="mt-4 space-y-4">
                  {post.comments.map((comment, index) => (
                    <div key={comment?._id || index}>
                      <Comment comment={comment} />
                    </div>
                  ))}
                </div>
              )}
            </Link>

            <CreateModal postId={post._id} />
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">No posts available.</div>
      )}
    </div>
  );
}

export default Home;

















/*
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Comment from "../comments/comments";
import { Link } from "react-router-dom";
import CreateModal from "../CreateModal/CreateModal";
import CreatePost from "../CreatePost/CreatePost";

function Home() {
function getAllPosts() {
  const token = localStorage.getItem("user token");
  console.log("token =>", token);

  return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
    headers: {
      token:token,
    },
  });
}



  const { data, isLoading, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <div className="p-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading posts.</div>;
  }

  const posts = data?.data?.posts;

  return (
    <div className="space-y-6 p-4">
    <CreatePost/>
      {
        posts.map((post) => (
          <div key={post._id} className="border-b pb-4">
            <Link to={`/PostDetails/${post?._id}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={post?.user?.photo}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <p className="font-medium">{post?.user?.name}</p>
                </div>
                <div className="text-sm text-slate-400">
                  {new Date(post?.createdAt).toLocaleDateString()}
                </div>
              </div>

              {post?.body && <h2 className="mb-4">{post?.body}</h2>}

              {post.image && (
                <img
                  src={post?.image}
                  className="w-full rounded-md "
                  alt={post?.body}
                />
              )}

              {Array.isArray(post.comments) && post.comments.length > 0 && (
                <Comment comment=c
              )}
            </Link>

      
            <CreateModal postId={post._id} />
          </div>
        ))}
    </div>
  );

}

export default Home;

/*
  const [posts, setPosts] = useState([]);
  const { getAllPosts } = useContext(PostContext);

  async function getPosts() {
    let result = await getAllPosts();
    if (result.length) {
      setPosts(result);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);
*/
