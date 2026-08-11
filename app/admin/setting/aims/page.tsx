"use client";
import CategoryDropdown from "@/app/components/category_dropdown";
import CustomDropdown from "@/app/components/custom_dropdown";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  addContactPage,
  editContact,
  deleteContact,
} from "../../adminSlice/contact/addContactSlice";
import DeleteModel from "@/app/components/deleteModel";
import { Link } from "lucide-react";
import { GetAims } from "../../adminSlice/aims/getAims";
import CustomText from "@/app/components/custom_text";
import {
  AddAimsPage,
  deleteAims,
  editAims,
} from "../../adminSlice/aims/addAims";

function Page() {
  const dispatch = useAppDispatch();
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
  const [bullets, setBullets] = useState<boolean>(false);
  const [deleteContacts, setDeleteContacts] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);

  const { aims } = useAppSelector((state) => state.getAims);

  useEffect(() => {
    dispatch(GetAims());
    // Fetch contact data when the component mounts
  }, []);

  const EditHandler = () => {
    dispatch(
      editAims({
        title: title,
        descriptions: des,
        id: catId,
        bulletsPoints: bullets,
      }),
    ).then((res) => {
      dispatch(GetAims()); // Show the message from the response
    });
    setOpenModel(null);
  };

  return (
    <div className="min-h-screen  w-full">
      <header className="md:bg-[#00b4d8] p-5  flex justify-between items-center ">
        <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
          Aims and Scope Management
        </h1>
      </header>
      <div className="min-h-screen bg-gray-50 px-6 py-12 w-full">
        {openModel == "add" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
              <p className="p-2">Add Aims and Scope </p>
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
                      setOpenModel(null);
                      dispatch(
                        AddAimsPage({
                          title: title,
                          descriptions: des,
                          bulletsPoints: bullets,
                        }),
                      ).then((res) => {
                        dispatch(GetAims());
                        alert("Contact added successfully!"); // Show the message from the response
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
              <p className="p-2">Edit Aims </p>
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
              dispatch(deleteAims(catId)).then(() => {
                dispatch(GetAims());
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
            Add Aims
          </button>
        </div>

        {/* Main Content */}
        <div className=" overflow-y-auto h-[calc(100vh-200px)] space-y-10 ">
          {/* Editor in Chief */}
          <div className=" overflow-x-scroll h-[calc(100vh-100px)]">
            {aims.length > 0 &&
              aims.map((contact) => (
                <div key={contact.id} className="">
                  <CustomText
                    text={contact.title}
                    style="font-bold text-2xl mb-2"
                  />
                  {contact.bulletsPoints ? (
                    <ul className="list-disc ml-5 mb-2">
                      <li>{contact.descriptions}</li>
                    </ul>
                  ) : (
                    <CustomText style="mb-2" text={contact.descriptions} />
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpenModel("edit");
                        setTitle(contact.title);
                        setDes(contact.descriptions ?? "");
                        setCatId(contact.id);
                        setBullets(contact.bulletsPoints);
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
