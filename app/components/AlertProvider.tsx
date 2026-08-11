"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AlertContextType {
  showAlert: (message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside an AlertProvider");
  return ctx;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showAlert = (msg: string, duration: number = 3000) => {
    // Clear any existing alert timeout
    if (timeoutId) clearTimeout(timeoutId);

    setMessage(msg);

    // Auto-close after specified duration
    const id = setTimeout(() => setMessage(null), duration);
    setTimeoutId(id);
  };

  const closeAlert = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setMessage(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00b4d8]/40">
          <div className="bg-white rounded-xl shadow-lg w-80 p-6 text-center animate-fadeIn">
            {/* <h2 className="text-lg font-semibold mb-3 text-red-600">Alert</h2> */}
            <p className="text-gray-700 mb-5">{message}</p>
            <button
              onClick={closeAlert}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
