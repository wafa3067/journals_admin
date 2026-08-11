"use client";
import EditorComponent from "@/app/components/editor_component";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { useEffect, useState } from "react";
import { GetTeamThunk } from "../../adminSlice/team/getTeamSlice";

import CategoryDropdown from "@/app/components/category_dropdown";
import {
  addCategory,
  addTeamPage,
  deleteCategory,
  deleteTeam,
  editCategory,
  editTeam,
  updateOrder,
} from "../../adminSlice/team/addTeamSlice";

interface addTeam {
  id: number;
  title?: string;
  descriptions?: string;
  heading?: string;
  email?: string;
  link?: string;
  affiliation?: string;
  uni?: string;
  category?: number;
}

const Page = () => {
  const [homeFormData, setHomeFormData] = useState<addTeam>({
    id: 0,
    title: "",
    descriptions: "",
    heading: "",
    email: "",
    link: "",
    affiliation: "",
    uni: "",
    category: 0,
  });

  const [cat, setCat] = useState<string>("");
  const [catId, setCatId] = useState<number>(0);
  const handleHomeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setHomeFormData({ ...homeFormData, [e.target.name]: e.target.value });
  };
  const dispatch = useAppDispatch();
  const [openModel, setOpenModel] = useState<string | null>();
  const { getTeam, success, loading } = useAppSelector(
    (state) => state.getTeam,
  );

  const [catData, setCatData] = useState({ id: 0, value: 0, title: "" });
  const [changeData, setChangeData] = useState({ id: 0, value: 0 });

  useEffect(() => {
    dispatch(GetTeamThunk());
  }, [dispatch]);

  const handleAddTeam = ({}) => {
    dispatch(addTeamPage(homeFormData)).then((res) => {
      dispatch(GetTeamThunk()); // Refresh the team list after adding a new member
    });
    // Logic to add a new team member
  };

  const handleEditAddTeam = () => {
    const dataToSend = {
      id: catId,
      title: homeFormData.title,
      descriptions: homeFormData.descriptions,
      heading: homeFormData.heading,
      email: homeFormData.email,
      link: homeFormData.link,
      affiliation: homeFormData.affiliation,
      uni: homeFormData.uni,
    };
    dispatch(editTeam(dataToSend)).then((res) => {
      alert(`Team member added successfully! `); // Show the message from the response
      dispatch(GetTeamThunk()); // Refresh the team list after adding a new member
    });
    // Logic to add a new team member
  };

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Select Type");

  const handleEditTeam = () => {
    // Logic to edit the team page
  };
  return (
    <div className="w-full ">
      <header className="md:bg-[#00b4d8] p-5 flex justify-center items-center ">
        <h1 className="text-sm font-semibold flex items-center gap-2 text-white">
          Team Page Management
        </h1>
      </header>
      <div className="w-full p-5 ">
        {openModel == "add" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <input
                type="text"
                name="title"
                value={homeFormData.title}
                onChange={handleHomeChange}
                placeholder="Name"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <textarea
              name="descriptions"
              value={homeFormData.descriptions}
              onChange={handleHomeChange}
              placeholder="Institutetion"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
              <input
                type="text"
                name="heading"
                value={homeFormData.heading}
                onChange={handleHomeChange}
                placeholder="Title/Position"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="email"
                value={homeFormData.email}
                onChange={handleHomeChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="link"
                value={homeFormData.link}
                onChange={handleHomeChange}
                placeholder="Link website/profile"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex  mb-4">
                <CategoryDropdown
                  options={getTeam?.map((cat) => ({
                    label: cat.title,
                    id: cat.id,
                  }))}
                  onChange={(value, id) => {
                    setHomeFormData({
                      ...homeFormData,
                      category: id,
                    });
                    setSelectedCategory(value);
                  }}
                  selectedOption={selectedCategory}
                  starting={selectedCategory}
                  is_optins={true}
                />
              </div>
              <input
                type="text"
                name="affiliation"
                value={homeFormData.affiliation}
                onChange={handleHomeChange}
                placeholder="Affiliation"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="uni"
                value={homeFormData.uni}
                onChange={handleHomeChange}
                placeholder="University"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOpenModel(null);
                    handleAddTeam(homeFormData);
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
        )}

        {openModel == "editTeam" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <input
                type="text"
                name="title"
                value={homeFormData.title}
                onChange={handleHomeChange}
                placeholder="Name"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="heading"
                value={homeFormData.heading}
                onChange={handleHomeChange}
                placeholder="Title/Position"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="email"
                value={homeFormData.email}
                onChange={handleHomeChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="link"
                value={homeFormData.link}
                onChange={handleHomeChange}
                placeholder="Link website/profile"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="affiliation"
                value={homeFormData.affiliation}
                onChange={handleHomeChange}
                placeholder="Affiliation"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="uni"
                value={homeFormData.uni}
                onChange={handleHomeChange}
                placeholder="University"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOpenModel(null);
                    handleEditAddTeam();
                  }}
                  className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setOpenModel(null);
                    setHomeFormData({
                      id: 0,
                      title: "",
                      descriptions: "",
                      heading: "",
                      email: "",
                      link: "",
                      affiliation: "",
                      uni: "",
                      category: 0,
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {openModel == "editCat" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <p className="p-2">Edit type for members </p>
              <div>
                <input
                  type="text"
                  name="title"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModel(null);
                      dispatch(editCategory({ name: cat, id: catId })).then(
                        (res) => {
                          dispatch(GetTeamThunk());
                        },
                      );
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

        {openModel == "changeOrder" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <p className="p-2">Change Order </p>
              <div>
                <p>Change Order of {catData.title}</p>
                <CategoryDropdown
                  options={getTeam?.map((cat) => ({
                    label: cat.assignOrder.toString(),
                    id: cat.id,
                  }))}
                  onChange={(value, id) => {
                    setChangeData({
                      id: id,
                      value: parseInt(value),
                    });
                    setSelectedCategory(value);
                  }}
                  selectedOption={selectedCategory}
                  starting={selectedCategory}
                  is_optins={true}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModel(null);
                      dispatch(
                        updateOrder({
                          catid: catData.id,
                          catValue: catData.value,
                          changeValue: changeData.value,
                          changeID: changeData.id,
                        }),
                      ).then((res) => {
                        dispatch(GetTeamThunk());
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
        {openModel == "addCat" && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-full overflow-y-scroll">
              <p className="p-2">Add type for members </p>
              <div>
                <input
                  type="text"
                  name="title"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModel(null);
                      dispatch(addCategory({ name: cat })).then((res) => {
                        dispatch(GetTeamThunk());
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
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Existing Types:</h2>
                <div>
                  <ul className="list-disc list-inside">
                    {getTeam?.map((cat) => (
                      <div
                        className="flex flex-row gap-2 m-2 justify-between items-center"
                        key={cat.id}
                      >
                        <p key={cat.id} className="mb-1">
                          {cat.title}
                        </p>
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-2 text-sm rounded-md hover:bg-blue-600 transition-colors"
                            onClick={() => {
                              setCat(cat.title);
                              setCatId(cat.id);
                              setOpenModel("editCat");
                            }}
                          >
                            Edit Type
                          </button>

                          <button
                            className="bg-blue-500 text-white px-2 text-sm py-2 rounded-md hover:bg-blue-600 transition-colors"
                            onClick={() => {
                              setCatData({
                                id: cat.id,
                                value: cat.assignOrder,
                                title: cat.title,
                              });
                              setOpenModel("changeOrder");
                            }}
                          >
                            Change Order
                          </button>
                          <button
                            onClick={() =>
                              dispatch(deleteCategory({ id: cat.id })).then(
                                (v) => dispatch(GetTeamThunk()),
                              )
                            }
                            className="bg-red-500 text-white px-2 py-2 text-sm rounded-md hover:bg-gray-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className=" gap-2 mb-5">
          <button
            className="bg-[#00b4d8] mr-2 text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors ml-2"
            onClick={() => setOpenModel("add")}
          >
            Add Team Member
          </button>

          <button
            className="bg-[#00b4d8] mr-2 text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors ml-2"
            onClick={() => setOpenModel("addCat")}
          >
            Add Type
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold  ">Team Page Preview</h1>
        </div>
        <div className="gap-3 bg-blue-50 p-3 rounded-lg overflow-y-auto  grid grid-cols-1  lg:grid-cols-2  h-[calc(100vh-130px)] w-full">
          {/* <div className="w-full gap-3  "> */}
          {loading == false &&
            getTeam.length > 0 &&
            getTeam.map((value) => (
              <div className="" key={value.id}>
                <EditorComponent heading={value.title} />
                {value.team &&
                  value.team.map((team) => (
                    <div
                      className=" shadow-2xs rounded-lg p-3 bg-white mb-3"
                      key={team.id}
                    >
                      <EditorComponent
                        key={team.title}
                        style={"p-0"}
                        heading={""}
                        title={team.heading}
                        name={team.title}
                        desc={team.uni}
                        email={team.email}
                        link={team.link}
                      />
                      <div className="gap-2">
                        <button
                          onClick={() => {
                            setOpenModel("editTeam");
                            setHomeFormData({
                              id: team.id,
                              title: team.title,
                              descriptions: "",
                              heading: team.heading,
                              email: team.email,
                              link: team.link,
                              affiliation: team.affiliation,
                              uni: team.uni,
                              category: value.id,
                            });
                            setCatId(team.id);
                            // dispatch(editTeam({ name: cat })).then((res) => {
                            //   alert("Category added successfully!"); // Show the message from the response
                            // });
                          }}
                          className="bg-[#00b4d8] mr-2 text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setCatId(team.id);

                            dispatch(deleteTeam(team.id)).then((res) => {
                              // Show the message from the response
                              dispatch(GetTeamThunk()); // Refresh the team list after deletion
                            });
                            setOpenModel(null);
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
