"use client";

import { adminLogin } from "@/app/admin/adminSlice/adminAuthSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  UserCog,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { loginSubUser } from "@/app/admin/adminSlice/subuser/subuserslice";

type LoginRole = "ADMIN" | "SUB_ADMIN" | null;

const AdminLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.adminAuth);

  const [selectedRole, setSelectedRole] = useState<LoginRole>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const selectRole = (role: LoginRole) => {
    setSelectedRole(role);
    setFormData({ username: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData, "Role:", selectedRole);
    if (selectedRole === "ADMIN") {
      const result = await dispatch(adminLogin(formData));

      if (adminLogin.fulfilled.match(result)) {
        const payload = result.payload as { role?: string; message?: string };

        router.push("/admin/pending");
      }
    }
    if (selectedRole === "SUB_ADMIN") {
      const result = await dispatch(loginSubUser(formData));
      localStorage.setItem("tokenSubAdmin", result.payload.token);
      localStorage.setItem("email", result.payload.username);
      localStorage.setItem(
        "permissions",
        JSON.stringify(result.payload.permissions),
      );

      console.log("Sub Admin :", result.payload.permissions);
      if (loginSubUser.fulfilled.match(result)) {
        const payload = result.payload;

        router.push(`/admin`);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #c7d2fe 50%, #e9d5ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: "840px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              borderColor: "#a5b4fc",
              borderWidth: "1px",
              borderStyle: "solid",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={28} style={{ color: "#4f46e5" }} />
          </div>

          <h1
            style={{
              color: "#111827",
              fontSize: "32px",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to Admin Portal
          </h1>

          <p
            style={{
              color: "#4b5563",
              marginTop: "8px",
              fontSize: "15px",
              margin: "8px 0 0 0",
            }}
          >
            Select your account type to continue
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ROLE SELECTION */}
          {!selectedRole && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* ADMIN CARD */}
              <motion.button
                type="button"
                onClick={() => selectRole("ADMIN")}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "32px 28px",
                  borderRadius: "20px",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "260px",
                  boxSizing: "border-box",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                }}
                className="group cursor-pointer transition-all duration-300"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#f3e8ff",
                        borderColor: "#e9d5ff",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Shield size={24} style={{ color: "#7c3aed" }} />
                    </div>

                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e5e7eb",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight size={17} style={{ color: "#6b7280" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: "24px" }}>
                    <p
                      style={{
                        color: "#7c3aed",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        margin: 0,
                      }}
                    >
                      Full Access
                    </p>

                    <h2
                      style={{
                        color: "#111827",
                        fontSize: "22px",
                        fontWeight: 700,
                        margin: "6px 0 0 0",
                      }}
                    >
                      Administrator
                    </h2>

                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        margin: "10px 0 0 0",
                      }}
                    >
                      Manage the entire platform, users, services, providers,
                      payments and system settings.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    borderColor: "#e5e7eb",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    paddingTop: "16px",
                    marginTop: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#374151" }}>Continue as Admin</span>
                  <span style={{ color: "#7c3aed" }}>Login →</span>
                </div>
              </motion.button>

              {/* SUB ADMIN CARD */}
              <motion.button
                type="button"
                onClick={() => selectRole("SUB_ADMIN")}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "32px 28px",
                  borderRadius: "20px",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "260px",
                  boxSizing: "border-box",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                }}
                className="group cursor-pointer transition-all duration-300"
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#e0e7ff",
                        borderColor: "#c7d2fe",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UserCog size={24} style={{ color: "#4f46e5" }} />
                    </div>

                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e5e7eb",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight size={17} style={{ color: "#6b7280" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: "24px" }}>
                    <p
                      style={{
                        color: "#4f46e5",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        margin: 0,
                      }}
                    >
                      Limited Access
                    </p>

                    <h2
                      style={{
                        color: "#111827",
                        fontSize: "22px",
                        fontWeight: 700,
                        margin: "6px 0 0 0",
                      }}
                    >
                      Sub Admin
                    </h2>

                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        margin: "10px 0 0 0",
                      }}
                    >
                      Access the dashboard with permissions assigned by the main
                      administrator.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    borderColor: "#e5e7eb",
                    borderTopWidth: "1px",
                    borderTopStyle: "solid",
                    paddingTop: "16px",
                    marginTop: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#374151" }}>
                    Continue as Sub Admin
                  </span>
                  <span style={{ color: "#4f46e5" }}>Login →</span>
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* LOGIN FORM */}
          {selectedRole && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ maxWidth: "440px", margin: "0 auto", width: "100%" }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  borderColor: "#ffffff",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Header */}
                <div style={{ padding: "32px 32px 0 32px" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    style={{
                      color: "#4b5563",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      marginBottom: "24px",
                      fontWeight: 500,
                    }}
                  >
                    <ArrowLeft size={15} />
                    Change account type
                  </button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          selectedRole === "ADMIN" ? "#f3e8ff" : "#e0e7ff",
                        borderColor:
                          selectedRole === "ADMIN" ? "#e9d5ff" : "#c7d2fe",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selectedRole === "ADMIN" ? (
                        <Shield size={24} style={{ color: "#7c3aed" }} />
                      ) : (
                        <UserCog size={24} style={{ color: "#4f46e5" }} />
                      )}
                    </div>

                    <div>
                      <h2
                        style={{
                          color: "#111827",
                          fontSize: "20px",
                          fontWeight: 800,
                          margin: 0,
                        }}
                      >
                        {selectedRole === "ADMIN"
                          ? "Administrator Login"
                          : "Sub Admin Login"}
                      </h2>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "13px",
                          margin: "2px 0 0 0",
                        }}
                      >
                        Enter your credentials
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#374151",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      EMAIL ADDRESS
                    </label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <Mail
                        size={18}
                        style={{
                          color: "#9ca3af",
                          position: "absolute",
                          left: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type="email"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                        placeholder="Enter your email"
                        required
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          color: "#111827",
                          width: "100%",
                          height: "48px",
                          borderRadius: "12px",
                          paddingLeft: "44px",
                          paddingRight: "16px",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        color: "#374151",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      PASSWORD
                    </label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <Lock
                        size={18}
                        style={{
                          color: "#9ca3af",
                          position: "absolute",
                          left: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                        required
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          color: "#111827",
                          width: "100%",
                          height: "48px",
                          borderRadius: "12px",
                          paddingLeft: "44px",
                          paddingRight: "48px",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          color: "#9ca3af",
                          position: "absolute",
                          right: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {selectedRole === "SUB_ADMIN" && (
                    <div
                      style={{
                        backgroundColor: "#e0e7ff",
                        borderColor: "#c7d2fe",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "12px",
                        padding: "14px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        style={{
                          color: "#4f46e5",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      />
                      <p
                        style={{
                          color: "#374151",
                          fontSize: "12px",
                          lineHeight: "1.5",
                          margin: 0,
                        }}
                      >
                        Your access will be limited to the permissions assigned
                        by the main administrator.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div
                      style={{
                        backgroundColor: "#fef2f2",
                        borderColor: "#fecaca",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        color: "#dc2626",
                        padding: "12px",
                        borderRadius: "12px",
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      backgroundColor: "#4f46e5",
                      color: "#ffffff",
                      height: "48px",
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      marginTop: "6px",
                      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    {loading
                      ? "Signing in..."
                      : selectedRole === "ADMIN"
                        ? "Sign in as Administrator"
                        : "Sign in as Sub Admin"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>
            © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
