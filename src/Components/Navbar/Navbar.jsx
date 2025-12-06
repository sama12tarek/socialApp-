import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
let navigate=useNavigate()
  const handleLogout = () => {
    setUserLogin(null);
    localStorage.removeItem("user token");
    
     navigate("/login");
  };
async  function getUserData() {
    return await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      
          headers:{token: localStorage.getItem("user token"),

          }
      
    });
  }
  let { data } =useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {userLogin === null ? (
          
            <>
              <Link
                to="/login"
                className="text-white bg-blue-700 px-3 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-blue-700 border border-blue-700 px-3 py-2 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={data?.photo}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block z-50">
                <li>
                  <label htmlFor="">{data?.name}</label>
                </li>
                <li>
                  <label htmlFor="">
                  {data?.email}</label>
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <span
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
