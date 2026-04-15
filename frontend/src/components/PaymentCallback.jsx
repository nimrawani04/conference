import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiUrl } from "../config/api";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const orderId = searchParams.get("orderId");
    const transactionId = searchParams.get("transactionId");
    const signature = searchParams.get("signature");
    const paymentStatus = searchParams.get("status");

    if (!orderId || !transactionId || !signature) {
      setStatus("error");
      setMessage("Invalid payment response");
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/verify-payment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, transactionId, signature }),
      });

      const result = await response.json();

      if (result.verified && paymentStatus === "success") {
        setStatus("success");
        setMessage("Payment confirmed. Saving your registration…");

        const registrationData = JSON.parse(sessionStorage.getItem("pendingRegistration"));

        if (registrationData) {
          await completeRegistration(registrationData, transactionId);
        } else {
          setStatus("error");
          setMessage("Registration data not found. Please contact support.");
        }
      } else {
        setStatus("error");
        setMessage("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setStatus("error");
      setMessage("Failed to verify payment");
    }
  };

  const completeRegistration = async (registrationData, transactionId) => {
    try {
      setMessage("Generating your registration ticket…");

      const formData = new FormData();
      Object.keys(registrationData).forEach((key) => {
        if (key !== "paymentProof") {
          formData.append(key, registrationData[key]);
        }
      });
      formData.append("transactionId", transactionId);
      formData.append("paymentVerified", "true");
      formData.append("modeOfPayment", "Qfix Payment Gateway");
      formData.append("dateOfPayment", new Date().toISOString().split("T")[0]);

      const response = await fetch(apiUrl("/api/register"), {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.removeItem("pendingRegistration");

        const merged = {
          ...registrationData,
          registrationId: result.registrationId,
          qrCode: result.qrCode,
          transactionId,
          totalFeeUSD: registrationData.totalFeeUsd ?? registrationData.totalFeeUSD,
          totalFeeINR: registrationData.totalFeeInr ?? registrationData.totalFeeINR,
        };
        sessionStorage.setItem("registrationResult", JSON.stringify(merged));
        sessionStorage.setItem("openTicketAfterSuccess", "1");

        setMessage("All set! Opening your confirmation…");

        setTimeout(() => {
          navigate("/registration-success");
        }, 900);
      } else {
        setStatus("error");
        setMessage("Failed to complete registration");
      }
    } catch (error) {
      console.error("Registration completion error:", error);
      setStatus("error");
      setMessage("Failed to complete registration");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        {status === "verifying" && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="animate-pulse text-sm text-gray-500">
              Payment → confirmation → your ticket
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate("/registration")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentCallback;
