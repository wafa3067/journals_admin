import React from "react";
import CustomText from "./custom_text";
import { TbFileTypePdf } from "react-icons/tb";
import { BACKEND_URL } from "@/app/api/actions/articleActions";
type Props = {
  title1?: string;
  title12?: string;
  style1?: string;
  style2?: string;
  cited?: string;
  citedstyle?: string;
  onClick?: () => void;
  pdfUrl?: string;
};

const Articles = (props: Props) => {
  const pdfUrlonline = `${BACKEND_URL}${props.pdfUrl}`;

  return (
    <div className="p-5">
      {props.title1 && <CustomText style={props.style1} text={props.title1} />}
      <div className="flex flex-row">
        {props.title12 && (
          <CustomText style={props.style2} text={props.title12 ?? ""} />
        )}
        {props.cited && (
          <CustomText style={props.citedstyle} text={props.cited ?? ""} />
        )}
      </div>
      {/* <a
        href={pdfUrlonline}
        target="_blank"
        rel="noopener noreferrer"
        className=" disabled"
      >
        <div
          className="flex 
      flex-row gap-1.5 items-center pl-2 pr-2 mt-2 bg-[#00b4d8] hover:bg-[#00b4d8] text-white rounded-sm  w-fit"
        >
          <TbFileTypePdf width={50} height={50} />
          <CustomText text={"PDF"} />
        </div>
      </a> */}
    </div>
  );
};

export default Articles;
