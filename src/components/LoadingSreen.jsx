import React from "react";
import { ClipLoader } from "react-spinners";

function LoadingSreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <ClipLoader color="#4F46E5" size={80} />
    </div>
  );
}

export default LoadingSreen;
