"use client";
import { useState } from "react";

export default function ArticleStatusCards() {
  const [active, setActive] = useState<"approved" | "pending" | "rejected">(
    "pending",
  );

  const cards = [
    { status: "Approved", icon: "check-circle", color: "green" },
    { status: "Pending", icon: "clock", color: "yellow" },
    { status: "Rejected", icon: "x-circle", color: "red" },
  ];

  return (
    <div className="flex justify-center gap-6 py-6 bg-gray-50">
      {cards.map(({ status, icon, color }) => {
        const isActive = active === status.toLowerCase();
        return (
          <div
            key={status}
            onClick={() =>
              setActive(
                status.toLowerCase() as "approved" | "pending" | "rejected",
              )
            }
            className={`
              flex flex-col items-center justify-center w-48 p-4 rounded-lg bg-white 
              shadow-md transition-all cursor-pointer border-t-4 
              ${
                isActive
                  ? `border-${color}-500 scale-105 shadow-xl`
                  : `border-transparent hover:shadow-lg`
              }
            `}
          >
            <div className={`text-${color}-500 text-3xl mb-2`}>
              <i className={`fas fa-${icon}`}></i>
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">
              {status} Articles
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              View {status.toLowerCase()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
