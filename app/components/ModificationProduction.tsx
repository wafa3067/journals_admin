"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";

export default function ModificationProduction({
  title = "Enter your input",
  button = "Reject ",
  description = "Please provide a value below.",
  bg = "bg-blue-600",
  onConfirm,
  onChange,
  inputValues,
}: {
  button?: string;
  title?: string;
  bg?: string;
  description?: string;
  inputValues: string;
  onConfirm?: (value: string, file?: File) => void; // Pass file too
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>(); // Track file

  const handleConfirm = () => {
    if (onConfirm) onConfirm(inputValue, selectedFile);
    setOpen(false);
    setInputValue("");
    // setSelectedFile(null);
  };

  useEffect(() => {
    setInputValue(inputValues);
  }, [inputValues]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button
          className={`px-4 py-2 text-white rounded-lg ${bg}`}
          onClick={() => setInputValue(inputValues)}
        >
          {button}
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-[#00b4d8]/50 backdrop-blur-sm z-40" />
        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2
                     bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <AlertDialog.Title className="text-xl font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-gray-600 text-sm">
            {description}
          </AlertDialog.Description>

          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="Type something..."
            className="w-full h-[150px] border border-gray-300 rounded-md px-3 py-2 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* ✅ File Upload Input */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose file:
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {selectedFile && (
              <p className="text-gray-500 text-xs mt-1">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setInputValue("");
                  //   setSelectedFile(null);
                }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                OK
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
