import React from "react";
import { AlertCircle } from "lucide-react"; // nice error icon

function ErrorMessage({ message }) {
  if (!message) return null; // nothing if no error

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 animate-fadeIn">
      <AlertCircle className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export default ErrorMessage;
