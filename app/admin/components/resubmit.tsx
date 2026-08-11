"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

export default function ReSubmit({
  title = "Resubmit Article",
  button = "Resubmit",
  description = "Please enter your message and upload the corrected document before resubmitting.",
  onConfirm,
}: {
  button?: string;
  title?: string;
  description?: string;
  onConfirm?: (value: string, file?: File | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null); // ✅ single file only
  };

  const handleConfirm = () => {
    if (!inputValue.trim()) {
      setError("Please enter a message or note before resubmitting.");
      return;
    }
    if (!selectedFile) {
      setError("Please upload a document before resubmitting.");
      return;
    }

    if (onConfirm) onConfirm(inputValue, selectedFile);

    // Reset and close dialog
    setError(null);
    setOpen(false);
    setInputValue("");
    setSelectedFile(null);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button className="text-black rounded-lg hover:underline">
          {button}
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-[#00b4d8]/50 backdrop-blur-sm z-40" />
        <AlertDialog.Content
          onEscapeKeyDown={(e) => {
            if (error || !inputValue.trim() || !selectedFile)
              e.preventDefault();
          }}
          className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 
                     bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <AlertDialog.Title className="text-xl font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-gray-600 text-sm">
            {description}
          </AlertDialog.Description>

          {/* Input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kindly confirm if you have made the necessary corrections.
              <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter your message or note"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* File picker (single file) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload corrected document <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium pt-2">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setInputValue("");
                  setSelectedFile(null);
                  setError(null);
                }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Resubmit
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
