import React from "react";
import CustomText from "./custom_text";
interface ModelComponentProps {
  setOpenModal: React.Dispatch<
    React.SetStateAction<"deleteEdit" | "deleteSide" | "deleteEditor" | null>
  >;

  handleSaveAbout: () => void;
  heading: string;
}

const DeleteModel = ({
  setOpenModal,

  handleSaveAbout,
  heading,
}: ModelComponentProps) => {
  return (
    <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>

        <CustomText
          text="Are you sure want to delete "
          style="text-red-600 mb-5 "
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setOpenModal(null);
              handleSaveAbout();
            }}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => setOpenModal(null)}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
