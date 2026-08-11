// "use client";
// import React, { useState, cloneElement, ReactElement } from "react";

// interface AlertDialogProps {
//   title?: string;
//   message?: string;
//   onConfirm?: () => void;
//   /**
//    * A single React element that will act as the trigger for opening the dialog.
//    * (e.g., <button />, <svg />, <MyIcon />)
//    */
//   children: ReactElement<any, any>;
// }

// const AlertDialog: React.FC<AlertDialogProps> = ({
//   title = "Confirm Action",
//   message = "Are you sure?",
//   onConfirm = () => {},
//   children,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // cloneElement requires typings that don't always match runtime usage when children can be any element.
//   // We cast to 'any' only where necessary to satisfy TypeScript while keeping runtime behavior predictable.
//   const trigger = React.isValidElement(children)
//     ? cloneElement(
//         children as ReactElement,
//         {
//           ...(children.props as any),
//           onClick: (e: React.MouseEvent) => {
//             // call original onClick if present
//             try {
//               const original = (children.props as any)?.onClick;
//               if (typeof original === "function") original(e);
//             } catch {
//               /* ignore errors from original handler */
//             }
//             setIsOpen(true);
//           },
//         } as any
//       )
//     : children;

//   const handleConfirm = () => {
//     try {
//       onConfirm();
//     } finally {
//       setIsOpen(false);
//     }
//   };

//   const handleCancel = () => setIsOpen(false);

//   return (
//     <>
//       {trigger}

//       {isOpen && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="alert-dialog-title"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[#00b4d8]/50"
//         >
//           <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center animate-fadeIn">
//             <h2 id="alert-dialog-title" className="text-lg font-semibold mb-2">
//               {title}
//             </h2>
//             <p className="text-gray-600 mb-5">{message}</p>

//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={handleConfirm}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 aria-label="Confirm"
//               >
//                 OK
//               </button>

//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 aria-label="Cancel"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AlertDialog;
"use client";
import React, { useState, cloneElement, ReactElement, MouseEvent } from "react";

interface AlertDialogProps {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm = () => {},
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = React.isValidElement(children)
    ? cloneElement(children, {
        onClick: (e: MouseEvent) => {
          // Call original onClick if exists
          children.props.onClick?.(e);
          setIsOpen(true);
        },
      })
    : children;

  const handleConfirm = () => {
    try {
      onConfirm();
    } finally {
      setIsOpen(false);
    }
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <>
      {trigger}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="alert-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00b4d8]/50"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center animate-fadeIn">
            <h2 id="alert-dialog-title" className="text-lg font-semibold mb-2">
              {title}
            </h2>
            <p className="text-gray-600 mb-5">{message}</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                aria-label="Confirm"
              >
                OK
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertDialog;
