"use client";
import React from "react";

interface DeleteUserModalProps {
  show: boolean;
  username: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({
  show,
  username,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00b4d8]/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeScaleIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-red-600">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-gray-900">{username}</strong>? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
