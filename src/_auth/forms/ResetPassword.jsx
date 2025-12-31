import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetScheme } from "../../validation/index";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { container, formVariant, item } from "../../animation";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetScheme) });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    const token = searchParams.get("token");

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword(token, data.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed, please try again");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Right Content Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex-1 flex  justify-center items-center p-8 max-w-[659px]"
      >
        <motion.div
          variants={formVariant}
          className="w-full max-w-[473px] flex flex-col gap-[40px]"
        >
          <ErrorMessage message={error} />
          <motion.div variants={item}>
            <h1 className="text-[32px] text-[#333333] font-medium">
              Reset Your Password
            </h1>
            <p className="text-[16px] text-[#666666] ">
              Enter your new password below
            </p>
          </motion.div>

          <motion.form
            variants={item}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Password</span>
              <input
                type="password"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("password")}
              />
            </label>
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">
                Confirm Password
              </span>
              <input
                type="password"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("confirmPassword")}
              />
            </label>
            <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>

            <input
              type="submit"
              value={loading ? "Reseting..." : "Submit Password"}
              className="bg-[#D9D9D9] text-[22px] text-white py-2 rounded-[32px] mt-[40px] w-[250px] h-[64px] 
               hover:bg-[#af9b87] hover:text-white active:bg-[#af9b87] active:text-white transition-colors duration-300"
            />
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default ResetPassword;
