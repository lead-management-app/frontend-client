import React from "react";
import Logo from "../assets/lts-logo-icon-custom.svg";
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { navContainer, navItem } from "../animation";

const SignNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <motion.div
        variants={navContainer}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center h-[72px] px-4 border-b-[1px] border-[#666666]"
      >
        <motion.div variants={navItem}>
          <img src={Logo} alt="logo" className="h-12 w-auto " />
        </motion.div>

        <motion.div variants={navItem} className="flex gap-2">
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
        </motion.div>
      </motion.div>
    </>
  );
};

export default SignNav;
