"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName={() =>
        "rounded-2xl border border-[#7042f861] bg-[#030014cc] backdrop-blur-md text-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.35)] px-3 py-2 text-sm"
      }
    />
  );
}

