"use client";
import CategoryDropdown from "@/app/components/category_dropdown";
import CustomDropdown from "@/app/components/custom_dropdown";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  AddPrivacy,
  editPrivacyData,
  deletePrivacyData,
} from "../../adminSlice/privacy/addPrivacy";
import DeleteModel from "@/app/components/deleteModel";
import { Link } from "lucide-react";
import CustomText from "@/app/components/custom_text";
import { getPrivacyInsights } from "../../adminSlice/privacy/getPrivacy";

function Page() {
  const dispatch = useAppDispatch();
  const [bullets, setBullets] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<
    | "add"
    | "edit"
    | "about"
    | "editHome"
    | "sideEdit"
    | "editorEdit"
    | "addCat"
    | "editCat"
    | "editTeam"
    | null
  >();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [catId, setCatId] = useState(0);
  const [type, setType] = useState("Select Type");
  const [deleteContacts, setDeleteContacts] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);

  const { Privacy } = useAppSelector((state) => state.getPrivacy);

  useEffect(() => {
    dispatch(getPrivacyInsights());
    // Fetch contact data when the component mounts
  }, []);

  const EditHandler = () => {
    console.log("Editing publication with ID:", bullets); // Log the ID being edited
    dispatch(
      editPrivacyData({
        title: title,
        descriptions: des,
        id: catId,
        bullets: bullets,
      }),
    ).then((res) => {
      dispatch(getPrivacyInsights()); // Show the message from the response
    });
    setOpenModel(null);
  };

  return (
    <div className="min-h-screen  w-full">
      <header className="md:bg-[#00b4d8] p-5  flex justify-between items-center ">
        <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
          Privacy Policy Management
        </h1>
      </header>
      <div className="min-h-screen bg-gray-50 px-6 py-12 w-full">
        {openModel == "add" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
              <p className="p-2">Add Privacy Policy </p>
              <div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mt-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bullets}
                    onChange={(e) => setBullets(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span>is description data added as bullets?</span>
                </label>

                <textarea
                  name="description"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModel(null);
                      dispatch(
                        AddPrivacy({
                          title: title,
                          descriptions: des,
                          bullets: bullets,
                        }),
                      ).then((res) => {
                        dispatch(getPrivacyInsights());
                      });
                    }}
                    className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setOpenModel(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {openModel == "edit" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
              <p className="p-2">Edit Privacy Policy </p>
              <div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mt-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bullets}
                    onChange={(e) => {
                      if (bullets === true) setBullets(false);
                      else setBullets(true);
                    }}
                    className="form-checkbox"
                  />
                  <span>is description data added as bullets?</span>
                </label>
                <textarea
                  name="description"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      EditHandler();
                    }}
                    className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setOpenModel(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteContacts === "deleteEdit" && (
          <DeleteModel
            heading="Delete"
            handleSaveAbout={() => {
              dispatch(deletePrivacyData(catId)).then(() => {
                dispatch(getPrivacyInsights());
                setDeleteContacts(null);
              });
            }}
            setOpenModal={setDeleteContacts}
          />
        )}
        {/* Breadcrumb */}
        <div className=" gap-2 mb-5">
          <button
            className="bg-[#00b4d8] mr-2 text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors ml-2"
            onClick={() => {
              setOpenModel("add");
              setTitle("");
              setDes("");
              setType("Select Type");
            }}
          >
            Add Privacy Policy
          </button>
        </div>
        {/* Page Title */}

        {/* Main Content */}
        <div className=" overflow-y-auto h-[calc(100vh-200px)] space-y-10 ">
          {/* Editor in Chief */}
          <div>
            {Privacy.length > 0 ? (
              Privacy.map((contact) => (
                <div key={contact.id} className="">
                  <CustomText
                    text={contact.title}
                    style="font-bold text-2xl mb-2"
                  />
                  <CustomText style="mb-2" text={contact.descriptions} />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpenModel("edit");
                        setTitle(contact.title);
                        setDes(contact.descriptions ?? "");
                        setCatId(contact.id);
                        setBullets(contact.bullets);
                      }}
                      className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteContacts("deleteEdit");
                        setCatId(contact.id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Data Added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
