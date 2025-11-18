import Background from "../assets/Image.svg";
import SignNav from "../components/SignNav";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
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
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;
