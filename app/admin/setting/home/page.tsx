"use client";
import CustomText from "@/app/components/custom_text";
import EditorsList from "@/app/components/EditorsList";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  AboutHomePage,
  deleteAboutData,
  editAboutData,
} from "../../adminSlice/home/homePageSlice";
import { AboutHomeGetPage } from "../../adminSlice/home/GetHomeAboutSlice";
import {
  createSideHomeSlice,
  deleteSideData,
  editSideData,
} from "../../adminSlice/sideHomeSlice/addSideHomeSlice";
import { CreateGetSideHome } from "../../adminSlice/sideHomeSlice/getHomeSideSlice";
import {
  createEditorHome,
  deleteEditorData,
  editEditorData,
} from "../../adminSlice/editor/addEditorSlice";
import {
  CreateEditorHomeState,
  GetEditorHomeState,
} from "../../adminSlice/editor/getEditorSlice";
import ModelComponent from "@/app/components/model_component";
import DeleteModel from "@/app/components/deleteModel";
import EditorModelComponent from "@/app/components/model_editor";
import EditorCard from "@/app/components/EditorCard";
import Carousel from "@/app/components/mini_crasual";
import { BACKEND_URL } from "@/app/api/actions/articleActions";

interface HomeData {
  id: number;
  title: string;
  descriptions: string;
}

interface SidebarItem {
  image: File;
}

interface EditorData {
  id: number;

  title: string;
  descriptions: string;
}

const homeData: HomeData = {
  id: 0,

  title: "",
  descriptions: "",
};

const editorData: EditorData = {
  id: 0,
  title: "",
  descriptions: "",
};

function Page() {
  const [homeFormData, setHomeFormData] = useState<HomeData>(homeData);
  const [id, setId] = useState<number>(0);
  const [imageSelected, setimageSelected] = useState<File | null>(null);
  const [editorFormData, setEditorFormData] = useState<EditorData>(editorData);
  const [newSidebarItem, setNewSidebarItem] = useState<File>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [openModal, setOpenModal] = useState<string | null>(null);

  const [editDelete, setEditDelete] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);

  const handleHomeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setHomeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditorFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSidebarChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // setNewSidebarItem();
  };

  // const addSidebarItem = () => {
  //   setSidebarItems([...sidebarItems, newSidebarItem]);
  //   setNewSidebarItem({ heading: "", title: "", description: "" });
  //   setOpenModal(null);
  // };

  const dispatch = useAppDispatch();
  const { about, success } = useAppSelector((state) => state.homeGet);
  const { side } = useAppSelector((state) => state.getSideHome);
  const { editor } = useAppSelector((state) => state.getEditorHome);

  const [selectedFile, setSelectedFile] = useState<File>();
  // Track file
  const handleEditor = () => {
    dispatch(createEditorHome({ ...editorFormData, image: selectedFile! }));
    setOpenModal(null);
  };
  const handleSaveAboutData = () => {
    // Dispatch the AboutHomePage action with the form data
    dispatch(AboutHomePage(homeFormData)).then(() => {
      dispatch(AboutHomeGetPage());
    });
    setOpenModal(null);
  };

  const length = 3;
  const totalPages = Math.ceil(editor.length / length);
  const handleSaveSidebar = () => {
    dispatch(createSideHomeSlice({ image: newSidebarItem! })).then(() => {
      dispatch(CreateGetSideHome());
      dispatch(AboutHomeGetPage());
    });
    setOpenModal(null);
  };

  const editHomePageData = (title: string, descriptions: string) => {
    dispatch(
      editAboutData({
        title: title,
        descriptions: descriptions,
        id: homeFormData.id,
      }),
    ).then(() => {
      dispatch(AboutHomeGetPage());
    });
  };

  const editSidePageData = (title: string, descriptions: string) => {
    // dispatch(
    //   editSideData({
    //     title: title,
    //   }),
    // ).then(() => {
    //   dispatch(CreateGetSideHome());
    // });
  };

  const editEditorPageData = (
    title: string,
    descriptions: string,
    image: File,
  ) => {
    dispatch(
      editEditorData({
        title: title,
        image: image,
        descriptions: descriptions,
        id: editorFormData.id,
      }),
    ).then(() => {
      dispatch(CreateEditorHomeState());
    });
  };

  useEffect(() => {
    dispatch(AboutHomeGetPage());
  }, [AboutHomeGetPage, dispatch]);

  useEffect(() => {
    dispatch(CreateGetSideHome());
  }, [CreateGetSideHome, dispatch]);

  useEffect(() => {
    dispatch(CreateEditorHomeState());
  }, [CreateEditorHomeState, dispatch]);
  const totalEditors = editor.length / 3;

  const nextEditor = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalEditors);
  };

  const prevEditor = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalEditors - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="">
      {/* Header */}
      <header className="md:bg-[#00b4d8] p-5 flex justify-center items-center mb-4">
        <h2 className="text-sm font-semibold text-black md:text-white flex items-center gap-2 ">
          Home Page Management
        </h2>
      </header>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setOpenModal("about")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add About
        </button>
        <button
          onClick={() => {
            if (side.length == 0) {
              setOpenModal("sidebar");
            } else {
              alert("Delete Image First");
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Sidebar
        </button>
        <button
          onClick={() => setOpenModal("editor")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Editor
        </button>
      </div>

      {/* About Modal */}
      {openModal === "about" && (
        <div className="fixed inset-0 bg-[#00b4d8] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add About</h2>
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
                  handleSaveAboutData();
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
      )}

      {/* Sidebar Modal */}
      {openModal === "sidebar" && (
        <div className="fixed inset-0 bg-[#00b4d8] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Sidebar Item</h2>

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewSidebarItem(e.target.files[0]);
                }
              }}
            />

            <div className="flex gap-2">
              <button
                onClick={handleSaveSidebar}
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
      )}

      {/* Editor Modal */}
      {openModal === "editor" && (
        <div className="fixed inset-0 bg-[#00b4d8] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Editor</h2>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            />
            <input
              type="text"
              name="title"
              value={editorFormData.title}
              onChange={handleEditorChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="descriptions"
              value={editorFormData.descriptions}
              onChange={handleEditorChange}
              placeholder="Descriptions"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleEditor()}
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
      )}
      {/* about home section */}
      {openModal === "editHome" && (
        <ModelComponent
          heading="Edit About Home"
          setOpenModal={setOpenModal}
          homeFormData={homeFormData}
          handleHomeChange={handleHomeChange}
          handleSaveAbout={editHomePageData}
        />
      )}

      {editDelete === "deleteEdit" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteAboutData(id)).then(() => {
              dispatch(AboutHomeGetPage());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      {/* side edit modal */}
      {openModal === "sideEdit" && (
        <p>edit</p>
        // <ModelComponent
        //   heading="Edit Side Home"
        //   setOpenModal={setOpenModal}
        //   homeFormData={newSidebarItem}
        //   handleHomeChange={handleSidebarChange}
        //   handleSaveAbout={editSidePageData}
        // />
      )}

      {editDelete === "deleteSide" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteSideData(id)).then(() => {
              dispatch(CreateGetSideHome());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      {/* editor edit modal */}
      {openModal === "editorEdit" && (
        <EditorModelComponent
          heading="Edit Editor Home"
          setOpenModal={setOpenModal}
          homeFormData={editorFormData}
          handleHomeChange={handleEditorChange}
          handleSaveAbout={editEditorPageData}
          setImageSelected={setimageSelected}
          image={imageSelected}
        />
      )}

      {editDelete === "deleteEditor" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteEditorData(id)).then(() => {
              dispatch(CreateEditorHomeState());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      <div className="mb-8">
        <CustomText
          style={"text-black p-2 font-bold text-3xl"}
          text={"Preview Home Page"}
        />
      </div>
      {/* about section */}
      <div className=" h-[calc(100vh-200px)]  p-4 rounded-lg overflow-y-auto">
        <div className=" flex md:flex-row flex-col gap-3 pt-8 pb-8 w-full">
          <div className="md:w-[70%] bg-gray-100">
            {success === false ? (
              <p>Loading...</p>
            ) : (
              about.length > 0 &&
              about.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h2>
                  <p>{item.descriptions}</p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => {
                        setOpenModal("editHome");
                        setHomeFormData({
                          title: item.title,
                          descriptions: item.descriptions || "",
                          id: item.id,
                        });
                      }}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setId(item.id);
                        setEditDelete("deleteEdit");
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* sidebar section */}
          <div className="md:w-[30%]">
            {side.length > 0 &&
              side.map((item, index) => (
                <div key={index} className="mb-6">
                  <img
                    src={`${BACKEND_URL}` + item.image}
                    alt={`Sidebar Image ${index + 1}`}
                    className="w-full h-auto rounded-lg mb-2"
                  />

                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => {
                        alert(side.length);
                        if (side.length == 0) {
                          setOpenModal("sideEdit");
                        } else {
                          alert("Delete File First");
                        }
                        // setNewSidebarItem(
                        //   item.image,
                        // );
                      }}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setId(item.id);
                        setEditDelete("deleteSide");
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* editor section */}
        <div className="py-8 px-4 bg-[#00b4d8]  relative ">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Editors
          </h2>

          <Carousel
            items={editor}
            itemsPerPage={3}
            renderItem={(editor: GetEditorHomeState, index) => (
              <div className=" m-2  w-[30%]" key={index}>
                <EditorCard
                  name={editor.title}
                  institution={editor.descriptions}
                  location={""}
                  imageUrl={editor.image}
                />
                <div className="flex flex-row gap-2 justify-center">
                  <button
                    onClick={() => {
                      setOpenModal("editorEdit");
                      setEditorFormData({
                        title: editor.title,
                        descriptions: editor.descriptions || "",
                        id: editor.id,
                      });
                    }}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setId(editor.id);
                      setEditDelete("deleteEditor");
                    }}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
