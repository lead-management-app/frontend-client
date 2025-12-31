import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/index";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { container, formVariant, item } from "../../animation";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const result = await authRegister(data);
      if (result.success) {
        navigate("/verifyemail");
      } else {
        setError(result.error || "Register failed, please try again");
      }
    } catch (err) {
      setError(err, "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SIGN UP PAGE */}
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
          {/* Error message */}
          <ErrorMessage message={error} />
          <motion.div variants={item}>
            <h1 className="text-[32px] text-[#333333] font-medium">Sign up</h1>
            <p className="text-[16px] text-[#666666] ">
              Sign up for Verata Management Syatem
            </p>
          </motion.div>

          <motion.form
            variants={item}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Name:</span>
              <input
                type="name"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("name")}
              />
            </label>

            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Email Address</span>
              <input
                type="email"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("email")}
              />
            </label>

            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <label className="flex flex-col gap-1">
              <span className="text-[16px] text-[#666666]">Password</span>
              <input
                type="password"
                className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                {...register("password")}
              />
            </label>
            <p style={{ color: "red" }}>{errors.email?.message}</p>

            <input
              type="submit"
              value={loading ? "Signing Up..." : "Sign Up"}
              className="bg-[#D9D9D9] text-[22px] text-white py-2 rounded-[32px] mt-[40px] w-[250px] h-[64px] 
               hover:bg-[#af9b87] hover:text-white active:bg-[#af9b87] active:text-white transition-colors duration-300"
            />
            <p className="text-[16px] text-[#666666] ">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="underline cursor-pointer"
              >
                Log In
              </span>
            </p>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Register;
