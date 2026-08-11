"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AdminSplash = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // Small delay to show splash screen (1.5s)
    const timeout = setTimeout(() => {
      if (token) {
        router.replace("/admin/pending"); // 👈 redirect if token exists
      } else {
        router.replace("/admin_login/login"); // 👈 redirect if not logged in
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center shadow-lg mb-4">
          <span className="text-4xl font-bold text-blue-700">A</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
        <p className="text-sm opacity-80">Checking authentication...</p>
      </motion.div>
    </div>
  );
};

export default AdminSplash;
