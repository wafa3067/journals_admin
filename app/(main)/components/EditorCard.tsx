import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

interface EditorProps {
  name: string;
  institution: string;
  location: string;
  imageUrl: string;
}

const EditorCard: React.FC<EditorProps> = ({
  name,
  institution,
  location,
  imageUrl,
}) => {
  return (
    <div className="p-6 rounded-lg   text-center text-white ">
      {/* {imageUrl && ( */}
      {/* {imageUrl ? ( */}
      <IoPersonCircleOutline className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
      {/* ) : (
        <img
          src={require(`http://localhost:3000/${imageUrl}`)}
          alt={name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
      )} */}

      {/* )} */}
      <div className="editor-details">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-200">{institution}</p>
        <p className="text-sm text-gray-200">{location}</p>
      </div>
    </div>
  );
};

export default EditorCard;
