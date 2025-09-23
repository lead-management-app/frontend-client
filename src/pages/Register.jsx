import { React, useState } from "react";
import SignNav from "../components/SignNav";
import Background from "../assets/Image.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../hooks/useAuth";
import * as yup from "yup";
import ErrorMessage from "../components/ErrorMessage";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
      <SignNav />
      <div className="flex min-h-screen">
        {/* Left Image Section */}
        <div className="hidden md:flex flex-1 bg-gray-100  justify-center items-center">
          <img
            src={Background}
            alt="Sign In"
            className=" w-full object-cover h-full"
          />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 flex  justify-center items-center p-8 max-w-[659px]">
          <div className="w-full max-w-[473px] flex flex-col gap-[40px]">
            {/* Error message */}
            <ErrorMessage message={error} />
            <div>
              <h1 className="text-[32px] text-[#333333] font-medium">
                Sign up
              </h1>
              <p className="text-[16px] text-[#666666] ">
                Sign up for Lead Management Syatem
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <p style={{ color: "red" }}>{errors.fullName?.message}</p>
              <label className="flex flex-col gap-1">
                <span className="text-[16px] text-[#666666]">
                  Email Address
                </span>
                <input
                  type="email"
                  className="border border-[#666666] rounded-[12px] px-4 py-2 opacity-100"
                  {...register("email")}
                />
              </label>
              <p style={{ color: "red" }}>{errors.email?.message}</p>

              <input
                type="submit"
                value={loading ? "Signing Up..." : "Sign In"}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
