"use client";

import { adminLogin } from "@/app/admin/adminSlice/adminAuthSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.adminAuth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(adminLogin(formData)).then((V) => {
      console.log("Login response:", V.payload);
      if (V.payload["message"] === "Login successful ✅") {
        router.push("/admin/pending");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-lg outline-none bg-white"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-lg outline-none bg-white"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        {/* Footer text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
