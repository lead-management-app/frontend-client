import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { CheckCircle, XCircle } from "lucide-react"; // nice icons
import LoadingSreen from "../components/LoadingSreen";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { verifyEmail } = useAuth();

  const handleVerification = useCallback(
    async (token) => {
      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setVerified(true);
          // Redirect to set password page after 3 seconds
          setTimeout(() => {
            navigate(`/setpassword?token=${token}`);
          }, 3000);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Email verification error:", err);
        setError("Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [verifyEmail, navigate]
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Invalid verification link");
      setLoading(false);
      return;
    }

    handleVerification(token);
  }, [searchParams, handleVerification]);

  if (loading) {
    return <LoadingSreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        {verified ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Email Verified 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Your email has been successfully verified. Redirecting you to set
              your password...
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-shake" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/register")}
              className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Back to Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
