"use client";

import { MouseEventHandler, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  options: Array<{ label: string; id: number }>;
  starting: string;
  selectedOption?: string;
  is_optins: boolean;
  onTap?: MouseEventHandler;
  onChange: (value: string, id: number) => void;
};

export default function CategoryDropdown({
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
      className="relative w-full cursor-default"
    >
      <div
        className={`flex items-center justify-between w-full  p-2 rounded-md  ${
          selectedOption === starting ? "border-[#e8ebef] border-2" : ""
        }`}
      >
        <p
          className={`  hover:text-[#e8ebef] 
           hover:border-b-2 hover:border-[#ffffff] text-gray-500 `}
        >
          {starting}
        </p>
        {is_optins && (
          <MdOutlineKeyboardArrowDown size={30} className="text-gray-200" />
        )}
      </div>

      {/* Menu */}
      {open && is_optins && (
        <ul className="absolute w-full h-60 bg-gray-200 rounded-sm overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.label}
              className="px-4 py-2 text-black hover:bg-[#00b4d8] hover:text-white"
              onClick={() => {
                setOpen(false);
                onChange(option.label, option.id);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
