"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/adminsidebar";
import SubAdminSidebar from "../sub-admin/subadmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<Boolean>(false);
  const [permissions, setPermissions] = useState<Array<String>>(["2"]);

  const getPermissions = async () => {
    setLoading(true);
    var permit = await localStorage.getItem("permissions");
    if (permit != null) {
      const permis: string[] = JSON.parse(
        localStorage.getItem("permissions") || "[]",
      );
      setPermissions(permis);
    }
    if (permit == null) {
      setPermissions([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden font-inter bg-gray-50 text-gray-900 flex-col md:flex-row ">
      <div className="md:max-h-max  md:w-75">
        {permissions.length == 0 ? (
          <AdminSidebar />
        ) : (
          <SubAdminSidebar permit={permissions} />
        )}
      </div>
      <div className="w-full  ">{children}</div>
    </div>
  );
}
