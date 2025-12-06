import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z.string().min(1, "name is required").max(10, "name maximum is 10"),
      email: z.string().email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          "Password must include uppercase, lowercase, number, special char, and be 8+ chars"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD")
        .refine((date) => {
          const userDate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return userDate < now;
        }, "Can't be future date"),
      gender: z.enum(["male", "female"], {
        message: "gender must be male or female",
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "password and repassword not matched",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      if (res.data.message === "success") {
        navigate("/login");
          setIsLoading(true);
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
        onSubmit={handleSubmit(handleRegister)}
      >
        {apiError && (
          <h1 className="bg-red-100 text-red-700 p-2 text-center rounded-md mb-4">
            {apiError}
          </h1>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Enter your Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-4 w-full border border-gray-300 rounded-md"
            placeholder=" "
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="rePassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm your Password
          </label>
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-4 w-full border border-gray-300 rounded-md"
            placeholder=" "
          />
          {errors.rePassword && (
            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium mb-1"
          >
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-4 w-full border border-gray-300 rounded-md"
            placeholder=" "
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="flex gap-4 content-center my-6">
          <div className="flex items-center mb-4">
            <input
              id="male"
              type="radio"
              {...register("gender")}
              value="male"
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="male" className="ml-2 text-sm font-medium">
              Male
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="female"
              type="radio"
              {...register("gender")}
              value="female"
              className="w-4 h-4 text-pink-600"
            />
            <label htmlFor="female" className="ml-2 text-sm font-medium">
              Female
            </label>
          </div>
        </div>

        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}

        <button 
      
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 ..."
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Register;
