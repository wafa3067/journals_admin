import React from "react";

const Page = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          padding: "48px 64px",
          textAlign: "center",
          maxWidth: "520px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b7280",
            marginBottom: "12px",
          }}
        >
          Welcome
        </div>
        <h1 style={{ margin: 0, color: "#111827", fontSize: "36px" }}>
          Sub Admin
        </h1>
        <p style={{ margin: "16px 0 0", color: "#4b5563", fontSize: "18px" }}>
          You are successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default Page;
