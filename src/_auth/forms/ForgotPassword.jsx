import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth";
import { forgotpasswordScheme } from "../../validation/index";
import ErrorMessage from "../../components/ErrorMessage";
// // eslint-disable-next-line no-unused-vars
// import { AnimatePresence, motion } from "framer-motion";
// import { container, formVariant, item } from "../../animation";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(forgotpasswordScheme) });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await forgotPassword(data.email);
      if (result.success) {
        setSuccess(true);
        reset(); // Clear form
        // Don't navigate immediately - user needs to check email
      } else {
        setError(result.error || "Forgot Password failed, please try again");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <>
        <div className="flex min-h-screen">
          {/*Content Section */}
          <div className="flex-1 flex justify-center items-center p-8 max-w-[659px]">
            <div className="w-full max-w-[473px] flex flex-col gap-[40px]">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <h2 className="font-medium">Email Sent!</h2>
                <p>Please check your email for a password reset link.</p>
              </div>

              <div>
                <h1 className="text-[32px] text-[#333333] font-medium">
                  Check Your Email
                </h1>
                <p className="text-[16px] text-[#666666]">
                  We've sent a password reset link to your email address.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-[#D9D9D9] text-[22px] text-white py-2 rounded-[32px] w-[250px] h-[64px] 
                   hover:bg-[#af9b87] hover:text-white active:bg-[#af9b87] active:text-white transition-colors duration-300"
                >
                  Send Another Email
                </button>

                <p className="text-[16px] text-[#666666]">
                  Remember your password?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="underline cursor-pointer"
                  >
                    Log In
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Right Content Section */}
      <div className="flex-1 flex justify-center items-center p-8 max-w-[659px]">
        <div className="w-full max-w-[473px] flex flex-col gap-[40px]">
          {error && <ErrorMessage message={error} />}

          <div>
            <h1 className="text-[32px] text-[#333333] font-medium">
              Forgot Password
            </h1>
            <p className="text-[16px] text-[#666666]">Verata Management System</p>
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="submit"
              value={loading ? "Sending..." : "Send Reset Link"}
              disabled={loading}
              className="bg-[#D9D9D9] text-[22px] text-white py-2 rounded-[32px] mt-[40px] w-[250px] h-[64px] 
                 hover:bg-[#af9b87] hover:text-white active:bg-[#af9b87] active:text-white transition-colors duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <p className="text-[16px] text-[#666666]">
              Remember your password?{" "}
              <span
                onClick={() => navigate("/")}
                className="underline cursor-pointer"
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
