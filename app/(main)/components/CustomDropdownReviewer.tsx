"use client";

import { MouseEventHandler, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type ReviewerOption = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  options: ReviewerOption[];
  starting: string;
  selectedOption?: string;
  is_optins: boolean;
  onTap?: MouseEventHandler<HTMLDivElement>;
  onChange: (name: string, email: string, id: number) => void;
};

export default function CustomDropdownReviewer({
  options,
  starting,
  is_optins,
  selectedOption,
  onTap,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={onTap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative z-50 w-64 cursor-default"
    >
      <div className="flex w-fit items-center justify-between bg-gray-300 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200">
        <p
          className={`text-[#000000] hover:text-[#565758] ${
            selectedOption === starting ? "border-b-2 border-b-[#e8ebef]" : ""
          } hover:border-b-2 hover:border-[#000000]`}
        >
          {selectedOption ? `${selectedOption}` : starting}
        </p>

        {is_optins && (
          <MdOutlineKeyboardArrowDown
            color="#000000"
            size={25}
            className="ml-2"
          />
        )}
      </div>

      {open && is_optins && (
        <ul className="absolute left-0 top-full w-full min-w-64 overflow-hidden rounded-sm bg-gray-200 shadow-lg">
          {options.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500">
              No reviewers available
            </li>
          ) : (
            options.map((reviewer) => (
              <li
                key={reviewer.id}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(false);
                  onChange(reviewer.name, reviewer.email, reviewer.id);
                }}
                className={`cursor-pointer px-4 py-3 text-black hover:bg-[#00b4d8] hover:text-white ${
                  selectedOption === String(reviewer.id) ? "bg-[#d1d5db]" : ""
                }`}
              >
                <p className="text-sm font-semibold">{reviewer.name}</p>
                <p className="break-all text-xs opacity-80">{reviewer.email}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
