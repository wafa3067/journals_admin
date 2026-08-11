"use client";

import { BACKEND_URL } from "@/app/api/actions/articleActions";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ChangeEventHandler, useState } from "react";

export default function ArticleCheckDialogApprove({
  title = "Review Admin Changes",
  button = "Review Changes",
  description = "The admin has made changes to your article. Please review and choose whether to accept or reject them.",
  onConfirm,
  selectedFile,
  setSelectedFile,
}: {
  setSelectedFile: ChangeEventHandler<HTMLInputElement>;
  button?: string;
  title?: string;
  selectedFile: string;
  description?: string;
  articleId: number;
  onConfirm?: (accepted: boolean, reason?: string, file?: File) => void; // added file
}) {
  const [open, setOpen] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  // const [selectedFile, setSelectedFile] = useState<File>(); // file state
  const [error, setError] = useState<string | null>(null);

  const handleAccept = () => {
    if (onConfirm) onConfirm(true, undefined); // pass file
    setOpen(false);
    setShowReason(false);
    setReason("");
    setError(null);
  };

  const handleReject = () => {
    if (!showReason) {
      setShowReason(true);
      setError(null);
      return;
    }

    if (!reason.trim()) {
      setError("Please provide a reason for rejecting the changes.");
      return;
    }

    if (onConfirm) onConfirm(false, reason); // pass file
    setOpen(false);
    setShowReason(false);
    setReason("");

    setError(null);
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
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 
                     bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <AlertDialog.Title className="text-xl font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-gray-600 text-sm">
            {description}
          </AlertDialog.Description>
          <h1>Download Template File below </h1>
          <a
            href={`${BACKEND_URL}/uploads/IEEE_Conference_Template.pdf`}
            className="text-[#00b4d8] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Template
          </a>
          {/* ✅ File Upload Input */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File
            </label>
            <input
              type="file"
              onChange={setSelectedFile}
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {selectedFile && (
              <p className="text-gray-500 text-xs mt-1">
                Selected file name: {selectedFile}
              </p>
            )}
          </div>

          {/* Rejection reason input (only shown after clicking Reject) */}
          {showReason && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please provide a reason for rejection{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-[150px]"
                rows={3}
              />
            </div>
          )}

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between space-x-3 pt-4">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setShowReason(false);
                  setReason("");

                  setError(null);
                }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <div className="flex space-x-2">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-lg bg-[#00b4d8] text-white hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                {showReason ? "Submit Rejection" : "Reject"}
              </button>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
