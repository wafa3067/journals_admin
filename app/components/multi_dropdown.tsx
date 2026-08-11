"use client";

import { MouseEventHandler, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

type MenuOption = {
  label: string;
  children?: MenuOption[];
};

type Props = {
  options: MenuOption[];
  starting: string;
  selectedOption?: string;
  is_optins: boolean;
  onTap?: MouseEventHandler;
  onChange: (value: string) => void;
  onChangeSub: (value: string) => void;
};

export default function MultiDropdown({
  options,
  starting,
  is_optins,
  selectedOption,
  onTap,
  onChange,
  onChangeSub,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <div
      onClick={onTap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setHoveredMenu(null);
      }}
      className="relative w-64 cursor-default z-50"
    >
      <div className="flex items-center justify-between w-fit">
        <p
          className={`text-white hover:text-[#e8ebef] ${
            selectedOption === starting ? "border-b-2 border-[#e8ebef]" : ""
          } hover:border-b-2 hover:border-white`}
        >
          {starting}
        </p>

        {is_optins && (
          <MdOutlineKeyboardArrowDown color="#fff" size={25} className="ml-2" />
        )}
      </div>

      {open && is_optins && (
        <ul className="absolute left-0  w-64 bg-gray-200 rounded shadow-lg z-50">
          {options.map((option) => (
            <li
              key={option.label}
              className="relative"
              onMouseEnter={() => setHoveredMenu(option.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div
                className="flex items-center justify-between px-4 py-2 hover:bg-[#00b4d8] hover:text-white cursor-pointer"
                onClick={() => {
                  if (!option.children) {
                    setOpen(false);
                    onChange(option.label);
                  }
                }}
              >
                {option.label}

                {option.children && <MdKeyboardArrowRight size={20} />}
              </div>

              {/* Submenu */}
              {option.children && hoveredMenu === option.label && (
                <ul className="absolute left-full top-0 w-64 bg-gray-200 rounded shadow-lg">
                  {option.children.map((child) => (
                    <li
                      key={child.label}
                      className="px-4 py-2 hover:bg-[#00b4d8] hover:text-white cursor-pointer"
                      onClick={() => {
                        setOpen(false);
                        onChangeSub(child.label);
                      }}
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
