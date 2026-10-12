"use client";

import dynamic from "next/dynamic";
import CustomText from "./custom_text";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
type EditorInputProps = {
  placeholder?: string;
  width?: string;
  style?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
};
const EditorInput = ({ style, onChange, value, error }: EditorInputProps) => {
  return (
    <div className={`w-62.5 sm:w-75 lg:w-125  ${style}`}>
      <ReactQuill
        className={` ${style ? style : "rounded-2xl outline-none md:h-50"}`}
        theme="snow"
        style={{
          borderRadius: "1rem",
        }}
        value={value}
        onChange={onChange}
        placeholder="Write something here..."
      />
      {error && <CustomText text={error} style={"text-red-400 mt-10"} />}
    </div>
  );
};
export default EditorInput;
