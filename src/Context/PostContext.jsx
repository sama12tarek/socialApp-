import { createContext } from "react";
import { UserContext } from "./UserContext";


export let PostContext=createContext()
export default function PostContextProvider(props){
  return <PostContext.Provider>{props.children}</PostContext.Provider>;
}
/*
function getAllPosts(){
 return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
  headers: {
    token:localStorage.getItem("user token")
    
  },
})
.then((res)=>{
return(res.data.posts);
})
.catch((err) => {
return "error";
})


}
*/

