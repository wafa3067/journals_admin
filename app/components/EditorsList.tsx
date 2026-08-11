"use client";
import React, { useEffect, useState } from "react";
import EditorCard from "./EditorCard";
import { GetEditorHomeState } from "@/app/admin/adminSlice/editor/getEditorSlice";
import Carousel from "./mini_crasual";
import CarouselMobile from "./mini_card_mobile";
interface Editor {
  image: string;
  title: string;
  descriptions: string;

  // image: string; // Add image property if needed
}
const EditorsList: React.FC<{ options: Array<Editor> }> = ({ options }) => {
  const [openModal, setOpenModal] = useState<
    | "about"
    | "sidebar"
    | "editor"
    | "editHome"
    | "sideEdit"
    | "editorEdit"
    | null
  >(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check(); // initial check
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className=" md:w-full p-2 md:py-8 md:px-4 bg-[#00b4d8]  relative ">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">
        Editors
      </h2>
      {/* Carousel for desktop */}
      {isMobile ? null : (
        <Carousel
          items={options}
          itemsPerPage={3}
          renderItem={(editor, index) => (
            <div className=" m-2  w-[30%]" key={index}>
              <EditorCard
                name={editor.title}
                institution={editor.descriptions}
                location={""}
                imageUrl={editor.image}
              />
            </div>
          )}
        />
      )}
      {/* Carousel for mobile */}
      {isMobile && (
        <CarouselMobile
          items={options}
          itemsPerPage={1}
          renderItem={(editor, index) => (
            <div className="" key={index}>
              <EditorCard
                name={editor.title}
                institution={editor.descriptions}
                location={""}
                imageUrl={editor.image}
              />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default EditorsList;
