"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";

export default function UnderReviewFlow() {
  const [active, setActive] = useState<
    | "under review"
    | "copyediting"
    | "production"
    | "final approved"
    | "rejected"
  >("under review");

  const steps = [
    { status: "Under Review", color: "yellow", icon: "hourglass" },
    { status: "Copyediting", color: "blue", icon: "edit" },
    { status: "Production", color: "purple", icon: "gear" },
    { status: "Final Approved", color: "green", icon: "check" },
    { status: "Rejected", color: "red", icon: "x" },
  ];

  const activeIndex = steps.findIndex(
    (step) => step.status.toLowerCase() === active,
  );

  const getStepColor = (index: number) => {
    const step = steps[index];
    const isActive = index === activeIndex;
    const isCompleted = index < activeIndex;

    if (isActive)
      return `bg-${step.color}-500 ring-4 ring-${step.color}-100 shadow-${step.color}-glow`;
    if (isCompleted) return `bg-${step.color}-400`;
    return "bg-gray-300";
  };

  return (
    <div className="flex justify-center py-12 bg-gradient-to-b from-gray-50 to-white overflow-x-auto px-4">
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(255, 255, 255, 0);
          }
        }
        .shadow-yellow-glow {
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          animation: pulse 2s infinite;
        }
        .shadow-blue-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          animation: pulse 2s infinite;
        }
        .shadow-purple-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          animation: pulse 2s infinite;
        }
        .shadow-green-glow {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
          animation: pulse 2s infinite;
        }
        .shadow-red-glow {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          animation: pulse 2s infinite;
        }
      `}</style>

      <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.status} className="flex items-center">
              {/* Step Node */}
              <div
                onClick={() =>
                  setActive(
                    step.status.toLowerCase() as
                      | "under review"
                      | "copyediting"
                      | "production"
                      | "final approved"
                      | "rejected",
                  )
                }
                className={`
                  flex flex-col items-center cursor-pointer group
                  transition-all duration-300 transform hover:scale-110
                `}
              >
                <div
                  className={`
                    relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center
                    font-bold text-white text-lg md:text-xl
                    transition-all duration-500 ease-out
                    ${getStepColor(index)}
                    ${isActive ? "scale-125 z-10" : "scale-100"}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 md:w-7 md:h-7" />
                  ) : isActive && step.status === "Rejected" ? (
                    <X className="w-6 h-6 md:w-7 md:h-7" />
                  ) : (
                    index + 1
                  )}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p
                    className={`
                      text-xs md:text-sm font-semibold tracking-wide
                      transition-colors duration-300
                      ${isActive ? `text-${step.color}-600` : "text-gray-600"}
                      group-hover:text-${step.color}-500
                    `}
                  >
                    {step.status}
                  </p>
                </div>
              </div>

              {/* Gradient Connector Line */}
              {!isLast && (
                <div
                  className={`
                    h-1 w-16 md:w-24 lg:w-32 mx-2 rounded-full
                    transition-all duration-700 ease-in-out
                    ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-400 to-[#00b4d8]"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    }
                    ${isActive ? "h-2" : "h-1"}
                  `}
                  style={{
                    backgroundImage: isCompleted
                      ? "linear-gradient(90deg, #86efac, #22c55e)"
                      : "linear-gradient(90deg, #d1d5db, #9ca3af)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
