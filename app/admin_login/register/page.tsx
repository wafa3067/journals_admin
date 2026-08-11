"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, UserPlus } from "lucide-react";
import { adminRegister } from "@/app/admin/adminSlice/adminAuthSlice";

const AdminRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.adminAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    dispatch(
      adminRegister({
        username: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all p-3 w-full rounded-lg outline-none bg-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
              className="pl-10 border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all p-3 w-full rounded-lg outline-none bg-white"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all p-3 w-full rounded-lg outline-none bg-white"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/admin/login"
            className="text-pink-600 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
