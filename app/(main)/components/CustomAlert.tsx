"use client";
import { useEffect } from "react";

interface CustomAlertProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function CustomAlert({
  message,
  onClose,
  duration = 3000,
}: CustomAlertProps) {
  
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-white border shadow-lg text-gray-800 text-sm font-medium transition-all duration-300">
      {message}
    </div>
  );
}
