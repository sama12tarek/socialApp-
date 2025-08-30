
import React, { useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
function Login() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
let { userLogin, setUserLogin } = useContext(UserContext);

  const schema = z
    .object({
      email: z.email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          "Password must include uppercase, lowercase, number, special char, and be 8+ chars"
        ),
    
    
    })
    


  const form = useForm({
    defaultValues: {
    
      email: "",
      password: ""
      
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (res.data.message === "success") {
        localStorage.setItem("user token", res.data.token);
        setUserLogin(res.data.token);
        navigate("/home");
        
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form
        className="max-w-md mx-auto my-20"
        onSubmit={handleSubmit(handleLogin)}
      >
        {apiError && (
          <h1 className="bg-red-100 text-red-700 p-2 text-center rounded-md mb-4">
            {apiError}
          </h1>
        )}

        <div className="relative z-0 w-full mb-5">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-4 w-full border border-gray-300 rounded-md"
            placeholder=" "
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Enter your Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-4 w-full border border-gray-300 rounded-md"
            placeholder=" "
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
        
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"

        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
