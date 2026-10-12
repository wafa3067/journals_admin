"use client";
import React from "react";
import CustomInput from "./custom_input";

type Props = {
  countries: Array<string>;
  height?: string;
  onChange: (v: string) => void;
  country: string;
};

const DropDownMenu = (props: Props) => {
  const [active, setActive] = React.useState(false);
  // const [search, setSearch] = React.useState("");

  return (
    <div className="relative max-w-full">
      <button onClick={() => setActive(!active)}>
        <CustomInput
          readonly={true}
          style="w-[250px] sm:w-[300px] lg:w-[500px]"
          placeholder="None"
          value={props.country}
        />
      </button>
      {active && (
        <div className=" absolute bg-gray-50  w-[250px] sm:w-[300px] lg:w-[500px] rounded-[8px] overflow-auto p-4 shadow-2xl z-10">
          {props.countries.map((country) => (
            <div
              onClick={() => props.onChange(country.toString())}
              key={country.toString()}
            >
              <div
                className="p-2 hover:bg-gray-200 border-b-1 border-b-gray-200 cursor-pointer"
                onClick={() => {
                  setActive(false);
                  // setSearch(country.toString());
                }}
              >
                {country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
