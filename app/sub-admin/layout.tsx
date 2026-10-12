"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../admin/components/adminsidebar";
import SubAdminSidebar from "./subadmin";

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState();
  const [permissions, setPermissions] = useState<Array<String>>(["2"]);

  const getPermissions = async () => {
    var permit = await localStorage.getItem("permissions");
    if (permit != null) {
      const permis: string[] = JSON.parse(
        localStorage.getItem("permissions") || "[]",
      );
      setPermissions(permis);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden font-inter bg-gray-50 text-gray-900 flex-col md:flex-row ">
      <div className="md:max-h-max  md:w-75">
        <SubAdminSidebar permit={permissions} />
      </div>
      <div className="w-full  ">{children}</div>
    </div>
  );
}
