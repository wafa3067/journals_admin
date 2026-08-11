import React from "react";

type Props = {
  textColor?: string;
  bgColor?: string;
  rounded?: string;
  fontSize?: string;
  fontStyle?: string;
  hoverEffect?: string;
  width?: string;
  text: string;
  onClick?: () => void;
};

const CustomButton = ({
  textColor = "white",
  bgColor = "bg-blue-700",
  rounded,
  fontSize = "16px",
  fontStyle = "normal",
  hoverEffect = "hover:bg-[#0096c7]",
  text = "Submit",
  width,
  onClick,
}: Props) => {
  return (
    <div className={`${width}`}>
      <button
        onClick={onClick}
        className={`${textColor}  ${bgColor}  ${rounded} ${fontSize} ${fontStyle} ${hoverEffect} py-2 px-4  ${width} `}
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderRadius: rounded,
          fontSize: fontSize,
          fontStyle: fontStyle,
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
