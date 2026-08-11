"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { useEffect, useState } from "react";
import { getContactIngo } from "../../adminSlice/contact_info/getContactInfo";
import {
  deletecontactData,
  editcontactData,
  sendMail,
} from "../../adminSlice/contact_info/addContactInfo";
import DeleteModel from "@/app/components/deleteModel";
import { deleteContact } from "../../adminSlice/contact/addContactSlice";
import CustomText from "@/app/components/custom_text";

function Page() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    agree: false,
  });
  const { contact } = useAppSelector((state) => state.getContactInfo);
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
  const EditHandler = () => {
    dispatch(
      editcontactData({
        firstName: form.firstName,
        lastName: form.firstName,
        phone: form.firstName,
        emailName: form.firstName,
        message: form.firstName,
        id: catId,
      }),
    ).then((res) => {
      dispatch(getContactIngo()); // Show the message from the response
    });
    setOpenModel(null);
  };

  useEffect(() => {
    dispatch(getContactIngo());
  }, []);
  return (
    <div className="p-6">
      {openModel == "add" && (
        <div className="fixed inset-0  bg-transparent bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
            <CustomText text={`Response to ${email}`} style="font-bold mb-4" />
            <div>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Subject"
                className="w-full p-2 mt-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
                placeholder="Email Body"
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (title != "" && des != "") {
                      setOpenModel(null);
                      dispatch(
                        sendMail({
                          email: email,
                          subject: title,
                          body: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="margin:0; padding:0; background-color:#0b0f19; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111827; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.3); overflow:hidden; border:1px solid #1f2937;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#1e3a8a; padding:30px; border-bottom:2px solid #3b82f6;">
                <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:1px; text-transform:uppercase;">
                  Echos <span style="color:#3b82f6;">Quantum</span>
                </h1>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:16px; color:#ffffff;">
                Hello <strong>${email}</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#9ca3af; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                ${des}
                </p>
               
              </td>
            </tr>

            
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px; font-size:12px; color:#4b5563; border-top:1px solid #1f2937;">
                &copy; 2026 Echos Quantum. All rights reserved.<br>
                <span style="font-size:11px; color:#374151; display:inline-block; margin-top:5px;">This is an automated transmission acknowledgment.</span>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
                        }),
                      )
                        .then((res) => {
                          alert("Email sent successfully");
                        })
                        .catch((err) => {
                          alert("Failed to send email");
                        });
                    } else {
                      alert("Subject and Email Body cannot be empty");
                    }
                  }}
                  className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#00b4d8] transition-colors"
                >
                  Send Response
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
      <h1 className="text-2xl font-semibold mb-6">Contact Info</h1>

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
            dispatch(deletecontactData(catId)).then(() => {
              dispatch(getContactIngo());
              setDeleteContacts(null);
            });
          }}
          setOpenModal={setDeleteContacts}
        />
      )}
      <div className="grid gap-4 overflow-y-scroll h-[calc(100vh-300px)]">
        {contact.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.firstName} {item.lastName}
                </h3>
                <p className="text-sm text-gray-500">{item.emailName}</p>
              </div>

              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md">
                Inquiry
              </span>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Phone:</span>{" "}
                {item.phone || "N/A"}
              </p>
            </div>

            {/* Message Box */}
            <div className="mt-4 rounded-lg bg-gray-50 p-3 border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.message}
              </p>
            </div>
            <button
              onClick={() => {
                setOpenModel("add");
                setEmail(item.emailName ?? "");
              }}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
            >
              Response Back
            </button>
            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setDeleteContacts("deleteEdit");
                  setCatId(item.id);
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
