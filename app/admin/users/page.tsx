"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUsers, User } from "../adminSlice/userSlice";
import LoadingSpinner from "@/app/components/loading_spannier";
import { deleteUser, updateUserStatus } from "../adminSlice/updateUserSlice";
import { useAlert } from "@/app/components/AlertProvider";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.userdata);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSaveStatus = async () => {
    if (selectedUser) {
      await dispatch(
        updateUserStatus({ id: selectedUser.id, status: selectedUser.status }),
      ).then(() => {
        dispatch(fetchUsers());
        showAlert("User status updated successfully.");
      });
      setShowEdit(false);
    }
  };

  const { showAlert } = useAlert();

  const handleDeleteUser = async () => {
    if (selectedUser) {
      await dispatch(deleteUser(selectedUser.id)).then(() => {
        dispatch(fetchUsers());
      });
      setShowDelete(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-[Inter]">
      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="md:bg-[#00b4d8] shadow-sm p-5 flex justify-center items-center">
          <h2 className="text-sm font-semibold text-black md:text-white flex items-center gap-2">
            User Management System
          </h2>
        </header>

        {/* Content */}
        <section className="flex-1 overflow-y-auto ">
          <div className="bg-white overflow-hidden">
            <div className="max-h-[95vh] overflow-y-auto divide-y divide-gray-100">
              {loading && (
                <p className="text-gray-500 text-center py-6">
                  Loading users...
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center py-6">
                  Failed to load users: {error}
                </p>
              )}
              {!loading && !error && users.length === 0 && (
                <p className="text-gray-500 text-center py-6">
                  No users found.
                </p>
              )}

              {loading ? (
                <LoadingSpinner />
              ) : (
                users.map((u) => (
                  <div
                    key={u.id}
                    className="p-5 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {u.username}
                      </h4>
                      <p className="text-sm text-gray-500">{u.email || "—"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          u.status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.status}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowEdit(true);
                        }}
                        className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowDelete(true);
                        }}
                        className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Edit Modal */}
      {showEdit && selectedUser && (
        <div className="fixed inset-0 bg-[#00b4d8]/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit User Status
            </h2>
            <select
              className="w-full border rounded-lg p-2 mb-4"
              value={selectedUser.status}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, status: e.target.value })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDelete && selectedUser && (
        <div className="fixed inset-0 bg-[#00b4d8]/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-3 text-red-600">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-5">
              Are you sure you want to delete{" "}
              <strong>{selectedUser.username}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
