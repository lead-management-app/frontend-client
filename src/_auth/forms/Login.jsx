import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginScheme } from "../../validation/index";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginScheme) });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const result = await login(data);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed, please try again");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Right Content Section */}

      <div className="flex-1 flex  justify-center items-center p-8 max-w-[659px]">
        <div className="w-full max-w-[473px] flex flex-col gap-[40px]">
          <ErrorMessage message={error} />

          <div>
            <h1 className="text-[32px] text-[#333333] font-medium">Log In</h1>
            <p className="text-[16px] text-[#666666] ">
              Log Into Lead Management System
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Email Address</span>
              <input
                type="email"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("email")}
              />
            </label>
            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Password</span>
              <input
                type="password"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("password")}
              />
            </label>
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <p className="text-[16px] text-[#666666] ">
              <span
                onClick={() => navigate("/forgotpassword")}
                className="underline cursor-pointer"
              >
                Forgot Your Password
              </span>
            </p>

            <input
              type="submit"
              value={loading ? "Logging in..." : "Log In"}
              className="bg-[#D9D9D9] text-[22px] text-white py-2 rounded-[32px] mt-[40px] w-[250px] h-[64px] 
                hover:bg-[#af9b87] hover:text-white active:bg-[#af9b87] active:text-white transition-colors duration-300 cursor-pointer"
            />
            <p className="text-[16px] text-[#666666] ">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/forgetpassword")}
                className="underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
