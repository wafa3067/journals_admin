"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewers,
  clearReviewerError,
  clearReviewerMessage,
  registerReviewer,
} from "../../adminSlice/reviewer/reviewerSlice";
import {
  sendArticleEmail,
  sendReviewerEmail,
} from "../../adminSlice/emailSlice";

export default function ReviewersPage() {
  const dispatch = useAppDispatch();

  const { reviewers, loading, error, message } = useAppSelector(
    (state) => state.reviewer,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewers());
  }, [dispatch]);

  const openDialog = () => {
    dispatch(clearReviewerError());
    dispatch(clearReviewerMessage());
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (submitting) return;

    setIsDialogOpen(false);
    setEmail("");
    setPassword("");
    dispatch(clearReviewerError());
  };

  const handleAddReviewer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) return;

    dispatch(clearReviewerError());
    dispatch(clearReviewerMessage());
    setSubmitting(true);

    try {
      await dispatch(
        registerReviewer({
          username: trimmedEmail,
          password: trimmedPassword,
          name: name.trim(),
        }),
      ).unwrap();
      dispatch(
        sendReviewerEmail({
          toEmail: email,
          authorName: name,
          articleTitle: "Reviewer Account Created",
          status: "Created",
          body: `
         <!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">

            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#2563eb; padding:25px;">
                <h1 style="margin:0; color:#ffffff; font-size:22px;">
                  Reviewer Account Created
                </h1>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px; font-size:18px; color:#111827;">
                Hello <strong>${name} </strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px; font-size:15px; color:#374151; line-height:1.7;">
                <p>
                  Your reviewer account has been created successfully.
                  You can use the login credentials below to access the
                  reviewer dashboard and manage your assigned articles.
                </p>
              </td>
            </tr>

            <!-- Login Details -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 18px; color:#2563eb; font-size:18px;">
                  Your Login Details
                </h3>

                <table cellpadding="10" cellspacing="0" width="100%"
                       style="color:#374151; font-size:14px; border-collapse:collapse;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Email:</td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Password:</td>
                    <td>${password}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Role:</td>
                    <td>Reviewer</td>
                  </tr>
                </table>
              </td>
            </tr>

           

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px 35px 10px; font-size:14px; color:#6b7280;">
                Thank you for joining our reviewer team.
                <br />
                <strong>The Editorial Team</strong>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:12px; color:#9ca3af; padding:15px 35px 30px;">
                © 2026 Journal Name. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
            `,
        }),
      );
      setEmail("");
      setPassword("");
      setName("");
      setIsDialogOpen(false);

      await dispatch(fetchReviewers()).unwrap();
    } catch {
      // Registration or fetching errors are stored in Redux.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0 }}>Reviewers</h2>

        <button
          type="button"
          onClick={openDialog}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          + Add Reviewer
        </button>
      </div>

      {message && (
        <p style={{ color: "#15803d", marginBottom: 16 }}>{message}</p>
      )}

      {error && !isDialogOpen && (
        <p role="alert" style={{ color: "#dc2626", marginBottom: 16 }}>
          {error}
        </p>
      )}

      {isDialogOpen && (
        <div
          onClick={closeDialog}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 16,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 420,
              maxWidth: "100%",
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: 0 }}>Add Reviewer</h3>

              <button
                type="button"
                onClick={closeDialog}
                disabled={submitting}
                aria-label="Close dialog"
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                ×
              </button>
            </div>

            {error && (
              <p
                role="alert"
                style={{
                  color: "#dc2626",
                  background: "#fef2f2",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {error}
              </p>
            )}

            <form onSubmit={handleAddReviewer}>
              <div style={{ marginBottom: 12 }}>
                <label
                  htmlFor="reviewer-name"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Name
                </label>

                <input
                  id="reviewer-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter reviewer name"
                  autoComplete="name"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label
                  htmlFor="reviewer-email"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Email
                </label>

                <input
                  id="reviewer-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter reviewer email"
                  autoComplete="email"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  htmlFor="reviewer-password"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Password
                </label>

                <input
                  id="reviewer-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={submitting}
                  style={{
                    background: "#e2e8f0",
                    color: "#0f172a",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        style={{
          background: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {loading && reviewers.length === 0 ? (
          <div style={{ padding: 24, color: "#64748b" }}>
            Loading reviewers...
          </div>
        ) : reviewers.length === 0 ? (
          <div style={{ padding: 24, color: "#64748b" }}>
            No reviewers added yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#e2e8f0" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px" }}>
                    Name
                  </th>
                  <th style={{ textAlign: "left", padding: "12px 16px" }}>
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {reviewers.map((reviewer) => (
                  <tr
                    key={reviewer.id}
                    style={{ borderTop: "1px solid #e2e8f0" }}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      {" "}
                      #{reviewer.id} {reviewer.name}
                    </td>
                    <td style={{ padding: "12px 16px" }}>{reviewer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
