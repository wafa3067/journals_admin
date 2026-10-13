"use client";

import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReviewerPassword } from "../../adminSlice/reviewer/reviewerSlice";
import { useAppDispatch } from "@/app/api/hooks/hooks";

// Update this import path to match your actual Redux slice or action file.

export default function ReviewerUpdatePage() {
  const dispatch = useAppDispatch();
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (event?: FormEvent) => {
    event?.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const resultMessage = await dispatch(
        updateReviewerPassword({
          email: reviewerEmail,
          currentPassword,
          newPassword,
        }),
      ).unwrap();

      setMessage(resultMessage || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      setMessage(error?.message || "Failed to update password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-6 text-2xl font-semibold text-slate-800">
          Update Reviewer Password
        </h1>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label
              htmlFor="reviewerEmail"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Reviewer Email
            </label>
            <input
              id="reviewerEmail"
              type="email"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="reviewer@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Enter new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 px-4 py-2.5 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
              message.toLowerCase().includes("success")
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
