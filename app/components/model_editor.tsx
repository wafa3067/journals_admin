import React from "react";
interface ModelComponentProps {
  setOpenModal: React.Dispatch<React.SetStateAction<null | string>>;
  setImageSelected: React.Dispatch<React.SetStateAction<File | null>>;
  homeFormData: {
    id: number;
    title: string;
    descriptions: string;
  };
  handleHomeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSaveAbout: (title: string, descriptions: string, image: File) => void;
  heading: string;
  image: File | null;
}

const EditorModelComponent = ({
  setOpenModal,
  homeFormData,
  handleHomeChange,
  handleSaveAbout,
  heading,
  setImageSelected,
  image,
}: ModelComponentProps) => {
  return (
    <div className="fixed inset-0 bg-[#00b4d8] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageSelected(e.target.files[0]);
            }
          }}
          className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
        />
        <input
          type="text"
          name="title"
          value={homeFormData.title}
          onChange={handleHomeChange}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="descriptions"
          value={homeFormData.descriptions}
          onChange={handleHomeChange}
          placeholder="Descriptions"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setOpenModal(null);
              handleSaveAbout(
                homeFormData.title,
                homeFormData.descriptions,
                image!,
              );
            }}
            className="flex-1 px-4 py-2 bg-[#00b4d8] text-white rounded-lg hover:bg-[#00b4d8]"
          >
            Save
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

export default EditorModelComponent;
