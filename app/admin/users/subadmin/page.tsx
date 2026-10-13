"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Trash2, Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import {
  fetchSubUsers,
  registerSubUserWithPermissions,
  updateSubUserPermissions,
} from "../../adminSlice/subuser/subuserslice";
import { sendReviewerEmail } from "../../adminSlice/emailSlice";
import { sendMail } from "../../adminSlice/contact_info/addContactInfo";

interface User {
  id: number;
  username: string;
  permissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  "Articles",
  "Under Review",
  "Professional Development",
  "Advertising & Services",
  "User Management",
  "Reviewer Management",
  "Settings",
];

export default function SubAdminPage() {
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector((state) => state.subadmin);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchSubUsers());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setEmail("");
    setPassword("");
    setPermissions([]);
    setIsDialogOpen(true);
  };

  const handleCreateUser = async () => {
    if (!email.trim() || !password) {
      alert("Email and password are required");
      return;
    }

    setSaving(true);

    try {
      await dispatch(
        registerSubUserWithPermissions({
          username: email.trim(),
          password,
          permissions,
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(
            sendMail({
              email: email,

              subject: "Sub Admin Account Created",

              body: `
         <!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">

            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#2563eb; padding:25px;">
                <h1 style="margin:0; color:#ffffff; font-size:22px;">
                  Sub Admin Account Created
                </h1>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px; font-size:18px; color:#111827;">
                Hello <strong>${name}</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px; font-size:15px; color:#374151; line-height:1.7;">
                <p>
                  Your Sub Admin account has been created successfully.
                  You can use the login credentials below to access the
                  Sub Admin dashboard and manage your assigned administrative tasks.
                </p>
              </td>
            </tr>

            <!-- Login Details -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 18px; color:#2563eb; font-size:18px;">
                  Your Login Details
                </h3>

                <table cellpadding="10" cellspacing="0" width="100%"
                       style="color:#374151; font-size:14px; border-collapse:collapse;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Email:</td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Password:</td>
                    <td>${password}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Role:</td>
                    <td>Sub Admin</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px 35px 10px; font-size:14px; color:#6b7280;">
                Thank you for joining our administrative team.
                <br />
                <strong>The Editorial Team</strong>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:12px; color:#9ca3af; padding:15px 35px 30px;">
                © 2026 Journal Name. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
            `,
            }),
          );
        });

      setIsDialogOpen(false);
      setEmail("");
      setPassword("");
      setPermissions([]);
    } catch (err) {
      alert("Email already exists or unable to create user");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setPermissions(user.permissions ?? []);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePermissions = async () => {
    if (!editingUser) return;

    setSaving(true);

    try {
      await dispatch(
        updateSubUserPermissions({
          id: editingUser.id,
          permissions,
        }),
      ).unwrap();

      setIsEditDialogOpen(false);
      setEditingUser(null);
      setPermissions([]);
    } catch (err) {
      alert(typeof err === "string" ? err : "Unable to update permissions");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    alert(
      "Your backend does not currently provide a delete sub-user endpoint. Add that endpoint before enabling deletion.",
    );
  };

  const handlePermissionChange = (permission: string, isChecked: boolean) => {
    setPermissions((current) =>
      isChecked
        ? current.includes(permission)
          ? current
          : [...current, permission]
        : current.filter((p) => p !== permission),
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Sub Admin Users</h1>

        <Button onClick={handleOpenDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Create User
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Create User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Email and password are required. Permissions are optional.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <p className="font-medium">Permissions (Optional)</p>

              <div className="space-y-3 mt-3">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`create-${permission}`}
                      checked={permissions.includes(permission)}
                      onChange={(e) =>
                        handlePermissionChange(permission, e.target.checked)
                      }
                      className="w-4 h-4"
                    />

                    <label
                      htmlFor={`create-${permission}`}
                      className="cursor-pointer"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleCreateUser}
              disabled={saving}
              className="w-full"
            >
              {saving ? "Creating..." : "Create User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>
              Update permissions for {editingUser?.username}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <div key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`edit-${permission}`}
                  checked={permissions.includes(permission)}
                  onChange={(e) =>
                    handlePermissionChange(permission, e.target.checked)
                  }
                  className="w-4 h-4"
                />

                <label
                  htmlFor={`edit-${permission}`}
                  className="cursor-pointer"
                >
                  {permission}
                </label>
              </div>
            ))}

            <Button
              onClick={handleUpdatePermissions}
              disabled={saving}
              className="w-full"
            >
              {saving ? "Saving..." : "Save Permissions"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Users List */}
      <div className="h-[calc(100vh-120px)] overflow-y-auto space-y-3 ">
        {" "}
        {loading && users.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-lg">
            No users created yet
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className=" flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="font-medium text-gray-900 break-all">
                  {user.username}
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Permissions
                  </p>

                  {!user.permissions?.length ? (
                    <span className="text-gray-500 text-sm">None</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {user.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEditDialog(user)}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
