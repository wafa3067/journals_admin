"use client";
import React, { useEffect, useState } from "react";

interface EditStatusModalProps {
  show: boolean;
  username: string;
  currentStatus: "Active" | "Inactive";
  onClose: () => void;
  onUpdate: (newStatus: "Active" | "Inactive") => void;
}

export default function EditStatusModal({
  show,
  username,
  currentStatus,
  onClose,
  onUpdate,
}: EditStatusModalProps) {
  const [status, setStatus] = useState<"Active" | "Inactive">(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00b4d8]/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeScaleIn">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            Edit User Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          Change status for <strong>{username}</strong>
        </p>

        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onUpdate(status);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
