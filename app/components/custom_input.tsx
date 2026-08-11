import React from "react";
import CustomText from "./custom_text";

type Props = {
  style: string;
  type?: string;
  error?: string;
  readonly?: boolean;
  placeholder: string;
  value?: string;
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  style,
  readonly = false,
  placeholder,
  value,
  type,
  error,
  height = "h-[46px]",
  onChange,
}: Props) => {
  return (
    <div>
      <input
        type={type}
        readOnly={readonly}
        style={{
          border: "solid 1px #e5e5e5",

          borderRadius: "8px",
        }}
        className={`p-4 ${style} ${height} placeholder-black  `}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <CustomText text={error} style={"text-red-400"} />}
    </div>
  );
};

export default CustomInput;
