import React from "react";
interface ModelComponentProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  homeFormData: {
    title: string;
    descriptions: string;
  };
  handleHomeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSaveAbout: (title: string, descriptions: string) => void;
  heading: string;
}

const ModelComponent = ({
  setOpenModal,
  homeFormData,
  handleHomeChange,
  handleSaveAbout,
  heading,
}: ModelComponentProps) => {
  return (
    <div className="fixed inset-0 bg-[#00b4d8] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>
        {/* <input
              type="text"
              name="heading"
              value={homeFormData.heading}
              onChange={handleHomeChange}
              placeholder="Heading"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
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
              handleSaveAbout(homeFormData.title, homeFormData.descriptions);
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

export default ModelComponent;
