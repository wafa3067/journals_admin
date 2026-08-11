"use client";
import EditorInput from "@/app/components/editor_input";
import { useAppDispatch } from "@/app/api/hooks/hooks";
import React from "react";
import { addAuthorPage } from "../../adminSlice/author/addAuthorSlice";

function Page() {
  const [value, setValue] = React.useState("");

  const dispatch = useAppDispatch();
  const handle = () => {
    dispatch(addAuthorPage({ descriptions: value })).then((res) => {
      alert(res);
    });
  };
  return (
    <div>
      <p className="text-2xl justify-center content-center text-bold">
        Add author information
      </p>
      <div className=" p-4 mb-4 h-[80vh] rounded-sm">
        <EditorInput
          onChange={(v) => setValue(v)}
          value={value}
          style="h-[75vh] w-[75vw]"
        />
      </div>

      <button
        className="bg-green-700 m-10 p-2 rounded-sm text-white hover:bg-[#00b4d8] transition-colors duration-300"
        onClick={handle}
      >
        Add Author Info
      </button>
    </div>
  );
}

export default Page;
