"use client";

import CustomText from "@/app/(main)/components/custom_text";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "../adminSlice/adminAuthSlice";
import { useAppDispatch } from "@/app/api/hooks/hooks";

const AdminSidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isProfessionalOpen, setIsProfessionalOpen] = useState(false);
  const [isAdvertisingOpen, setIsAdvertisingOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // --------------------------------------------------
  // Articles
  // --------------------------------------------------

  const articleStages = [
    {
      name: "Pending",
      href: "/admin/pending",
    },
    {
      name: "Approved",
      href: "/admin/approved",
    },
    {
      name: "Rejected",
      href: "/admin/rejected",
    },
  ];

  // --------------------------------------------------
  // Review
  // --------------------------------------------------

  const reviewStages = [
    {
      name: "Under Review",
      href: "/admin/underreview",
    },
    {
      name: "Copyediting",
      href: "/admin/copyeditor",
    },
    {
      name: "Production",
      href: "/admin/production",
    },
  ];

  // --------------------------------------------------
  // Professional Development
  // --------------------------------------------------

  const professionalDevelopments = [
    {
      name: "Awards",
      icon: "🏆",
      href: "/admin/professional/awards",
    },
    {
      name: "Careers",
      icon: "💼",
      href: "/admin/professional/careers",
    },
    {
      name: "Conferences",
      icon: "🎤",
      href: "/admin/professional/conferences",
    },
  ];

  // --------------------------------------------------
  // Advertising & Services
  // --------------------------------------------------

  const advertising = [
    {
      name: "Advertising",
      icon: "📢",
      href: "/admin/advertising/advertising",
    },
    {
      name: "Services",
      icon: "🛠️",
      href: "/admin/advertising/services",
    },
    {
      name: "Partnership",
      icon: "🤝",
      href: "/admin/advertising/partnership",
    },
  ];

  // --------------------------------------------------
  // Settings
  // --------------------------------------------------

  const settingsStages = [
    {
      name: "Home",
      icon: "🏠",
      href: "/admin/setting/home",
    },
    {
      name: "Team",
      icon: "👥",
      href: "/admin/setting/team",
    },
    {
      name: "Contact",
      icon: "📞",
      href: "/admin/setting/contact",
    },
    // {
    //   name: "Announcements",
    //   icon: "📢",
    //   href: "/admin/setting/announcement",
    // },
    {
      name: "Publication Ethics",
      icon: "⚖️",
      href: "/admin/setting/publications",
    },
    {
      name: "Aims and Scope",
      icon: "🎯",
      href: "/admin/setting/aims",
    },
    {
      name: "Journal Insights",
      icon: "📊",
      href: "/admin/setting/insights",
    },
    {
      name: "Contact Info",
      icon: "📞",
      href: "/admin/setting/contact_info",
    },
    {
      name: "Authors Guidelines",
      icon: "📝",
      href: "/admin/setting/author_guidlines",
    },
    {
      name: "Privacy Policy",
      icon: "🔒",
      href: "/admin/setting/privacy",
    },
  ];

  // user management
  const userMangement = [
    {
      name: "registered users",
      icon: "👥",
      href: "/admin/users/user",
    },
    {
      name: "reviewers",
      icon: "🛠️",
      href: "/admin/users/reviewers",
    },
    {
      name: "subadmin",
      icon: "🤝",
      href: "/admin/users/subadmin",
    },
  ];

  // --------------------------------------------------
  // Active states
  // --------------------------------------------------

  const isArticlesActive = articleStages.some((item) => pathname === item.href);

  const isReviewActive = reviewStages.some((item) => pathname === item.href);

  const isProfessionalActive = professionalDevelopments.some(
    (item) => pathname === item.href,
  );

  const isAdvertisingActive = advertising.some(
    (item) => pathname === item.href,
  );

  const isSettingsActive = settingsStages.some(
    (item) => pathname === item.href,
  );

  // --------------------------------------------------
  // Menu item component
  // --------------------------------------------------

  const DropdownButton = ({
    name,
    icon,
    isOpen,
    isActive,
    onClick,
  }: {
    name: string;
    icon: string;
    isOpen: boolean;
    isActive: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-between w-full px-6 py-3 font-medium rounded-lg transition-all ${
          isActive
            ? "bg-white text-black"
            : "text-white hover:bg-white hover:text-black"
        }`}
      >
        <div className="flex items-center">
          <span className="mr-3 text-xl">{icon}</span>
          <span>{name}</span>
        </div>

        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
    );
  };

  // --------------------------------------------------
  // Sidebar content
  // --------------------------------------------------
  const dispatch = useAppDispatch();
  const SidebarContent = () => {
    return (
      <>
        {/* Header */}
        <div className="p-5 border-b border-white/30 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Admin Portal</h2>
          <LogOut
            size={25}
            color="white"
            onClick={() => {
              dispatch(logout());
              navigation.navigate("/splash_screen");
            }}
          />
          {/* Mobile close button */}
          {open && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white text-xl md:hidden"
            >
              ✕
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 flex flex-col p-2 h-[calc(100vh-70px)] overflow-y-auto">
          {/* ---------------------------------------- */}
          {/* Articles */}
          {/* ---------------------------------------- */}

          <div className="mb-2">
            <DropdownButton
              name="Articles"
              icon="📄"
              isOpen={isArticlesOpen}
              isActive={isArticlesActive}
              onClick={() => setIsArticlesOpen(!isArticlesOpen)}
            />

            {isArticlesOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {articleStages.map((stage) => {
                  const isActive = pathname === stage.href;

                  return (
                    <Link
                      key={stage.href}
                      href={stage.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current mr-3" />
                      {stage.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------------------------------- */}
          {/* Under Review */}
          {/* ---------------------------------------- */}

          <div className="mb-2">
            <DropdownButton
              name="Under Review"
              icon="👥"
              isOpen={isReviewOpen}
              isActive={isReviewActive}
              onClick={() => setIsReviewOpen(!isReviewOpen)}
            />

            {isReviewOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {reviewStages.map((stage) => {
                  const isActive = pathname === stage.href;

                  return (
                    <Link
                      key={stage.href}
                      href={stage.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current mr-3" />
                      {stage.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------------------------------- */}
          {/* Professional Development */}
          {/* ---------------------------------------- */}

          <div className="mb-2">
            <DropdownButton
              name="Professional Development"
              icon="🎓"
              isOpen={isProfessionalOpen}
              isActive={isProfessionalActive}
              onClick={() => setIsProfessionalOpen(!isProfessionalOpen)}
            />

            {isProfessionalOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {professionalDevelopments.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>

                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------------------------------- */}
          {/* Advertising & Services */}
          {/* ---------------------------------------- */}

          <div className="mb-2">
            <DropdownButton
              name="Advertising & Services"
              icon="📢"
              isOpen={isAdvertisingOpen}
              isActive={isAdvertisingActive}
              onClick={() => setIsAdvertisingOpen(!isAdvertisingOpen)}
            />

            {isAdvertisingOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {advertising.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>

                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {/* ---------------------------------------- */}
          {/* User Management */}
          {/* ---------------------------------------- */}

          <div className="mb-2">
            <DropdownButton
              name="User Management"
              icon="👥"
              isOpen={user}
              isActive={isAdvertisingActive}
              onClick={() => setUser(!user)}
            />

            {user && (
              <div className="ml-8 mt-1 space-y-1">
                {userMangement.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>

                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-2">
            <DropdownButton
              name="Settings"
              icon="⚙️"
              isOpen={isSettingsOpen}
              isActive={isSettingsActive}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />

            {isSettingsOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {settingsStages.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-black font-medium"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>

                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="my-4 border-t border-white/30" />
        </nav>
      </>
    );
  };

  return (
    <div className="h-full">
      {/* ================================================== */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================== */}

      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-[#00b4d8] shadow-lg z-30">
        <SidebarContent />
      </aside>

      {/* ================================================== */}
      {/* MOBILE HEADER */}
      {/* ================================================== */}

      <div className="bg-[#00b4d8] flex flex-row items-center w-full h-16 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="p-3 text-white hover:text-black h-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <CustomText text="Admin Panel" style="text-white" />
      </div>

      {/* ================================================== */}
      {/* MOBILE OVERLAY */}
      {/* ================================================== */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ================================================== */}
      {/* MOBILE DRAWER */}
      {/* ================================================== */}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-[#00b4d8] shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </div>
  );
};

export default AdminSidebar;
