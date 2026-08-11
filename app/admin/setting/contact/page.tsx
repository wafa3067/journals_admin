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
import { GetContactThunk } from "../../adminSlice/contact/getContactSlice";
import DeleteModel from "@/app/components/deleteModel";
import { Link } from "lucide-react";

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
  const [deleteContacts, setDeleteContacts] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);

  const { getContact } = useAppSelector((state) => state.getContact);

  useEffect(() => {
    dispatch(GetContactThunk());
    // Fetch contact data when the component mounts
  }, []);

  const EditHandler = () => {
    dispatch(
      editContact({
        title: title,
        descriptions: des,
        id: catId,
        type: type,
      }),
    ).then((res) => {
      dispatch(GetContactThunk()); // Show the message from the response
    });
    setOpenModel(null);
  };

  return (
    <div className="min-h-screen  w-full">
      <header className="md:bg-[#00b4d8] p-5  flex justify-between items-center ">
        <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
          Contact Page Management
        </h1>
      </header>
      <div className="min-h-screen bg-gray-50 px-6 py-12 w-full">
        {openModel == "editCat" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <p className="p-2">Edit type for members </p>
              <div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModel(null);
                      // dispatch(addCategory({ name: cat })).then((res) => {
                      //   alert("Category added successfully!"); // Show the message from the response
                      // });
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

        {openModel == "add" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
              <p className="p-2">Add type for members </p>
              <div>
                <div className=" rounded-2xl border-2">
                  <CategoryDropdown
                    options={[
                      { label: "None", id: 1 },
                      { label: "Phone Number", id: 2 },
                      { label: "Email Address", id: 3 },
                    ]}
                    onChange={(value) => setType(value)}
                    starting={type}
                    is_optins={true}
                  />
                </div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mt-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                        addContactPage({
                          title: title,
                          descriptions: des,
                          id: 0,
                          type: type,
                        }),
                      ).then((res) => {
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
              <p className="p-2">Add type for members </p>
              <div>
                <div className=" rounded-2xl border-2">
                  <CategoryDropdown
                    options={[
                      { label: "Phone Number", id: 1 },
                      { label: "Email Address", id: 2 },
                    ]}
                    onChange={(value) => setType(value)}
                    starting={type}
                    is_optins={true}
                  />
                </div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mt-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
              dispatch(deleteContact(catId)).then(() => {
                dispatch(GetContactThunk());
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
            Add Contact
          </button>
        </div>
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Contact Information:
        </h1>

        {/* Main Content */}
        <div className=" overflow-y-auto h-[calc(100vh-200px)] space-y-10 ">
          {/* Editor in Chief */}
          <div>
            {getContact.length > 0 &&
              getContact.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {contact.title}
                  </h2>
                  {contact.type != "None" && contact.type != "" && (
                    <h2 className="text-2xl #00b4d8 mb-4">
                      <a
                        href={
                          contact.type == "Email Address"
                            ? `mailto:${contact.descriptions}`
                            : `tel:${contact.descriptions}`
                        }
                        type="emal"
                        target="_blank"
                      >
                        {contact.descriptions}
                      </a>
                    </h2>
                  )}
                  {contact.type === "None" && (
                    <h2 className="text-2xl  text-gray-800 mb-4">
                      {contact.descriptions}
                    </h2>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpenModel("edit");
                        setTitle(contact.title);
                        setDes(contact.descriptions ?? "");
                        setCatId(contact.id);
                        setType(contact.type ?? "Select Type");
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
