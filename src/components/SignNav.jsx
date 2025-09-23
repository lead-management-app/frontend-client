import React from "react";
import Logo from "../assets/lts-logo-icon-custom.svg";
import { useNavigate, useLocation } from "react-router-dom";

const SignNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="flex justify-between items-center h-[72px] px-4 border-b-[1px] border-[#666666]">
        <div>
          <img src={Logo} alt="logo" className="h-12 w-auto " />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className={`btn-active ${
              location.pathname === "/"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`btn-active ${
              location.pathname === "/register"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default SignNav;
