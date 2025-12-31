import Background from "../assets/Image.svg";
import SignNav from "../components/SignNav";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { authpageVariant, imageVariant } from "../animation";

function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <SignNav />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          {...authpageVariant}
          className="flex min-h-screen"
        >
          {/* Left Image Section */}
          <div className="hidden md:flex flex-1  justify-center items-center">
            <motion.img
              src={Background}
              alt="Sign In"
              className=" w-full object-cover h-full"
              variants={imageVariant}
              initial="hidden"
              animate="visible"
            />
          </div>

          {/* Right Content Section */}
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default AuthLayout;
