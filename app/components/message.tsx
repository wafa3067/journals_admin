"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { BiMessageRounded } from "react-icons/bi";

export default function MessageDialog({
  title = "Enter your input",

  description = "Please provide a value below.",

  onConfirm,
}: {
  button?: string;
  title?: string;
  bg?: string;
  description?: string;

  onConfirm?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (onConfirm) onConfirm(inputValue);
    setOpen(false);
    setInputValue("");
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <BiMessageRounded size={22} />
        {/* <button className={`px-4 py-2  text-white rounded-lg ${bg}`}>
          {button}
        </button> */}
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

          <div className="flex justify-end space-x-3 pt-4">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => setInputValue("")}
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
