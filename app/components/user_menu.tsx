"use client";

import { MouseEventHandler, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Option = {
  id: string | number;
  label: string;
};

type Props = {
  options: Option[];
  starting: string;
  is_optins: boolean;
  selectedOpt: (text: string) => void;
  onTap?: MouseEventHandler;
  // Colors
  textColor?: string; // Username text
  bgColor?: string; // Dropdown button background
  hoverBgColor?: string; // Dropdown button hover background
  avatarBgColor?: string; // Avatar background
  avatarTextColor?: string; // Avatar text color
  dropdownBgColor?: string; // Dropdown menu background
  dropdownHoverBgColor?: string; // Dropdown option hover background
  dropdownTextColor?: string; // Dropdown option text color
  dropdownHoverTextColor?: string; // Dropdown option hover text color
  arrowColor?: string; // Dropdown arrow color
  fontSize?: string; // Username font size
};

export default function UserMenu(props: Props) {
  const [open, setOpen] = useState(false);
  // const [, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    // setSelected(label);
    setOpen(false);
    if (
      props.is_optins &&
      props.options.length &&
      props.options[0] &&
      props.options[0].label
    ) {
      props.selectedOpt(label);
    }
  };

  const displayName = props.starting;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  return (
    <div
      onClick={props.onTap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit cursor-pointer"
    >
      {/* Dropdown Button */}
      <div
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition`}
        style={{
          backgroundColor: props.bgColor ?? "#00b4d8",
        }}
      >
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div
            className=" text-sm md:text-base w-8 h-8 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: props.avatarBgColor ?? "#F3C5A0",
              color: props.avatarTextColor ?? "#00b4d8",
            }}
          >
            {initial}
          </div>

          {/* Username */}
          <p
            className={`font-semibold text-sm md:text-base`}
            style={{
              color: props.textColor ?? "#fff",
            }}
          >
            {displayName}
          </p>
        </div>

        {/* Arrow */}
        {props.is_optins && (
          <MdOutlineKeyboardArrowDown
            className={`ml-2 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            size={20}
            color={props.arrowColor ?? "#fff"}
          />
        )}
      </div>

      {/* Dropdown Options */}
      {open && props.is_optins && (
        <ul
          className="absolute  w-full max-h-60 overflow-auto rounded shadow-lg z-50 animate-fade-in"
          style={{
            backgroundColor: props.dropdownBgColor ?? "#F3C5A0",
          }}
        >
          {props.options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.label)}
              className="px-4 py-2 cursor-pointer transition"
              style={{
                color: props.dropdownTextColor ?? "#00b4d8",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  props.dropdownHoverBgColor ?? "#E6B48C";
                e.currentTarget.style.color =
                  props.dropdownHoverTextColor ?? "#00b4d8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  props.dropdownBgColor ?? "#F3C5A0";
                e.currentTarget.style.color =
                  props.dropdownTextColor ?? "#00b4d8";
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
