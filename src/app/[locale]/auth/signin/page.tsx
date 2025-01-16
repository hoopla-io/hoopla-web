"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

type SignInFormInputs = {
  username: string;
  password: string;
};

export default function SignInPage() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit = async (data: SignInFormInputs) => {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: "/en/admin/send-email",
    });

    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        {/* Display server error */}
        {serverError && (
          <p className="text-red-500 mb-4 text-sm">{serverError}</p>
        )}

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-4 py-2 border rounded ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-4 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
