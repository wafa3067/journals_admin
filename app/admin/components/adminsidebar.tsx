// "use client";

// import CustomText from "@/app/components/custom_text";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// interface type {
//   open: boolean;
//   setOpen(val: boolean): void;
// }

// const AdminSidebar = () => {
//   const pathname = usePathname();
//   const [isReviewOpen, setIsReviewOpen] = useState(false);
//   const [isArticlesOpen, setIsArticlesOpen] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState("");

//   const reviewStages = [
//     {
//       name: "Under Review",
//       href: "/admin/underreview",
//       status: "under review",
//     },
//     {
//       name: "Copyediting",
//       href: "/admin/copyeditor",
//       status: "copyediting",
//     },
//     {
//       name: "Production",
//       href: "/admin/production",
//       status: "production",
//     },
//   ];

//   const articleStages = [
//     { name: "Pending", href: "/admin/pending", status: "pending" },
//     { name: "Approved", href: "/admin/approved", status: "approved" },
//     { name: "Rejected", href: "/admin/rejected", status: "rejected" },
//   ];

//   const menuItems = [
//     { name: "Articles", href: "#", icon: "📄", hasDropdown: true },
//     { name: "Under Review", href: "#", icon: "👥", hasDropdown: true },
//     {
//       name: "Professional Development",
//       href: "#",
//       icon: "👥",
//       hasDropdown: true,
//     },
//     {
//       name: "Advertising & Services",
//       href: "#",
//       icon: "👥",
//       hasDropdown: true,
//     },
//     { name: "User Management", href: "/admin/users", icon: "👥" },
//     { name: "Settings", href: "#", icon: "⚙️" },
//   ];

//   const settingsStages = [
//     { name: "Home", icon: "🏠", href: "/admin/setting/home" },
//     { name: "Team", icon: "👥", href: "/admin/setting/team" },
//     { name: "Contact", icon: "📞", href: "/admin/setting/contact" },

//     { name: "Announcements", icon: "📢", href: "/admin/setting/announcement" },
//     {
//       name: "publication ethics",
//       icon: "⚖️", // Scales/Gavel to represent ethics, law, or fairness
//       href: "/admin/setting/publications",
//     },
//     {
//       name: "Aims and Scope",
//       icon: "🎯", // Bullseye to represent goals and scope
//       href: "/admin/setting/aims",
//     },
//     {
//       name: "Journal Insights",
//       icon: "📊", // Chart to represent data, analytics, and insights
//       href: "/admin/setting/insights",
//     },
//     {
//       name: "Contact info",
//       icon: "📞", // Telephone or Email (✉️) to represent communication
//       href: "/admin/setting/contact_info",
//     },
//     {
//       name: "Authors Guidelines", // Corrected spelling
//       icon: "📝", // Memo/Pencil to represent writing and instructions
//       href: "/admin/setting/author_guidlines",
//     },
//     {
//       name: "Privacy Policy", // Corrected spelling
//       icon: "📝", // Memo/Pencil to represent writing and instructions
//       href: "/admin/setting/privacy",
//     },
//   ];

//   const professionalDevelopments = [
//     { name: "Awards", icon: "📰", href: "/admin/setting/news" },
//     { name: "Careers", icon: "📰", href: "/admin/setting/news" },
//     { name: "Conferences", icon: "📰", href: "/admin/setting/news" },
//   ];
//   const advertising = [
//     { name: "Advertising", icon: "📰", href: "/admin/setting/news" },
//     { name: "Services", icon: "📰", href: "/admin/setting/news" },
//     { name: "Partnership", icon: "📰", href: "/admin/setting/news" },
//   ];

//   const isReviewActive = reviewStages.some((stage) =>
//     pathname.includes(stage.href),
//   );
//   const isArticlesActive = articleStages.some((stage) =>
//     pathname.includes(stage.href),
//   );

//   const [open, setOpen] = useState(false);

//   return (
//     <div className="h-full">
//       <div className="w-72 bg-[#00b4d8]  shadow-lg  flex-col h-full hidden  md:block">
//         {/* Header */}
//         <div className="p-5 border-b border-gray-200 flex items-center">
//           <h2 className="    text-sm font-bold text-white">Admin Portal</h2>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 flex flex-col p-2  h-[calc(100vh-80px)] px-2 overflow-x-scroll">
//           {menuItems.map((item, index) => {
//             const isActive =
//               (item.hasDropdown &&
//                 ((item.name === "Articles" && isArticlesActive) ||
//                   (item.name === "Under Review" && isReviewActive))) ||
//               pathname === item.href;

//             // Dropdowns
//             if (item.hasDropdown) {
//               const stages =
//                 item.name === "Articles" ? articleStages : reviewStages;
//               const isOpen =
//                 item.name === "Articles" ? isArticlesOpen : isReviewOpen;
//               const toggleOpen =
//                 item.name === "Articles"
//                   ? () => setIsArticlesOpen(!isArticlesOpen)
//                   : () => setIsReviewOpen(!isReviewOpen);

//               return (
//                 <div key={index} className="mb-2">
//                   <button
//                     onClick={toggleOpen}
//                     className={`flex items-center justify-between w-full px-6 py-3 hover:text-black font-medium rounded-lg transition-all ${
//                       isActive ? "bg-white text-black" : "text-white"
//                     } hover:bg-white`}
//                   >
//                     <div className="flex items-center hover:text-black">
//                       <span
//                         className="mr-3 text-xl hover:color-white color-black "
//                         color={isActive ? "white" : "black"}
//                       >
//                         {item.icon}
//                       </span>
//                       {item.name}
//                     </div>
//                     <span
//                       className={`transform transition-transform ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     >
//                       ▼
//                     </span>
//                   </button>

//                   {isOpen && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       {stages.map((stage, stageIndex) => {
//                         const isStageActive = pathname === stage.href;
//                         return (
//                           <Link
//                             key={stageIndex}
//                             href={stage.href}
//                             className={`flex items-center px-4 py-2 hover:text-black text-sm rounded-lg transition-all ${
//                               isStageActive
//                                 ? "bg-blue-100 text-black font-medium"
//                                 : "text-white hover:bg-white"
//                             }`}
//                           >
//                             <span className="w-2 h-2 rounded-full bg-current mr-3"></span>
//                             {stage.name}
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             }

//             // Normal links
//             return (
//               <div key={index}>
//                 {item.name === "Settings" && (
//                   <button
//                     onClick={(v) => {
//                       if (item.name === "Settings") {
//                         if (isSettingsOpen === "Settings") {
//                           setIsSettingsOpen("");
//                         } else {
//                           setIsSettingsOpen("Settings");
//                         }
//                       }
//                     }}
//                     className={`flex items-center justify-between hover:text-black w-full px-6 py-3 font-medium rounded-lg transition-all ${
//                       isActive ? "bg-white text-black" : "text-white"
//                     } hover:bg-white`}
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-3 text-xl">{item.icon}</span>
//                       {item.name}
//                     </div>
//                     <span
//                       className={`transform transition-transform ${
//                         isSettingsOpen === "Settings" ? "rotate-180" : ""
//                       }`}
//                     >
//                       ▼
//                     </span>
//                   </button>
//                 )}
//                 {item.name === "User Management" && (
//                   <Link
//                     onClick={(v) => {
//                       if (item.name === "Settings") {
//                         if (isSettingsOpen === "Settings") {
//                           setIsSettingsOpen("");
//                         } else {
//                           setIsSettingsOpen("Settings");
//                         }
//                       }
//                     }}
//                     key={index}
//                     href={item.href}
//                     className={`flex items-center px-6 py-3 hover:text-black font-medium rounded-lg mb-2 transition-all ${
//                       isActive ? "bg-white text-black" : "text-white"
//                     } hover:bg-white`}
//                   >
//                     <span className="mr-3 text-xl">{item.icon}</span>
//                     {item.name}
//                   </Link>
//                 )}
//                 {item.name === isSettingsOpen && (
//                   <div className="ml-8 mt-1 space-y-1">
//                     {settingsStages.map((item, stageIndex) => {
//                       const isStageActive = pathname === item.href;
//                       return (
//                         <Link
//                           key={stageIndex}
//                           href={item.href}
//                           className={`flex items-center px-6 py-3 hover:text-black font-medium rounded-lg mb-2 transition-all ${
//                             isActive ? "bg-white text-black" : "text-white"
//                           } hover:bg-white`}
//                         >
//                           <span className="mr-3 text-xl">{item.icon}</span>
//                           {item.name}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           <div className="my-4 border-t border-gray-200"></div>
//         </nav>
//       </div>

//       <div className="bg-[#00b4d8] flex flex-row items-center w-full">
//         <button
//           onClick={() => setOpen(true)}
//           className="lg:hidden p-3  text-white hover:text-black  h-16 block   md:hidden"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         <CustomText text="Admin Panel" style="text-white" />
//       </div>

//       {/* Overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-[#00b4d8]/50 z-40"
//         />
//       )}

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#00b4d8] shadow-lg z-50 transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg text-white">Admin Portal</h2>
//           <button onClick={() => setOpen(false)} className="text-white">
//             ✖
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 p-2 flex flex-col  px-2  h-screen overflow-y-scroll">
//           {menuItems.map((item, index) => {
//             const isActive =
//               (item.hasDropdown &&
//                 ((item.name === "Articles" && isArticlesActive) ||
//                   (item.name === "Under Review" && isReviewActive))) ||
//               pathname === item.href;

//             // Dropdowns
//             if (item.hasDropdown) {
//               const stages =
//                 item.name === "Articles" ? articleStages : reviewStages;
//               const isOpen =
//                 item.name === "Articles" ? isArticlesOpen : isReviewOpen;
//               const toggleOpen =
//                 item.name === "Articles"
//                   ? () => setIsArticlesOpen(!isArticlesOpen)
//                   : () => setIsReviewOpen(!isReviewOpen);

//               return (
//                 <div key={index} className="mb-2">
//                   <button
//                     onClick={toggleOpen}
//                     className={`flex items-center justify-between w-full px-6 py-3 font-medium rounded-lg transition-all ${
//                       isActive ? "bg-white text-black" : "text-white"
//                     } hover:bg-white`}
//                   >
//                     <div className="flex items-center  hover:text-black">
//                       <span className="mr-3 text-xl ">{item.icon}</span>
//                       {item.name}
//                     </div>
//                     <span
//                       className={`transform transition-transform ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     >
//                       ▼
//                     </span>
//                   </button>

//                   {isOpen && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       {stages.map((stage, stageIndex) => {
//                         const isStageActive = pathname === stage.href;
//                         return (
//                           <Link
//                             key={stageIndex}
//                             href={stage.href}
//                             className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
//                               isStageActive
//                                 ? "bg-blue-100 text-black font-medium"
//                                 : "text-white hover:bg-white"
//                             }`}
//                           >
//                             <span className="w-2 h-2 rounded-full bg-current mr-3"></span>
//                             {stage.name}
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               );
//             }

//             // Normal links
//             return (
//               <div key={index}>
//                 {item.name === "Settings" && (
//                   <button
//                     onClick={(v) => {
//                       if (item.name === "Settings") {
//                         if (isSettingsOpen === "Settings") {
//                           setIsSettingsOpen("");
//                         } else {
//                           setIsSettingsOpen("Settings");
//                         }
//                       }
//                     }}
//                     className={`flex items-center justify-between    w-full px-6 py-3 font-medium rounded-lg transition-all ${
//                       isActive ? "bg-white text-green-200" : "text-white"
//                     } hover:bg-white`}
//                   >
//                     <div className="flex items-center  ">
//                       <span className="mr-3 text-xl ">{item.icon}</span>
//                       {item.name}
//                     </div>
//                     <span
//                       className={`transform transition-transform ${
//                         isSettingsOpen === "Settings" ? "rotate-180" : ""
//                       }`}
//                     >
//                       ▼
//                     </span>
//                   </button>
//                 )}
//                 {item.name === "User Management" && (
//                   <Link
//                     onClick={(v) => {
//                       if (item.name === "Settings") {
//                         if (isSettingsOpen === "Settings") {
//                           setIsSettingsOpen("");
//                         } else {
//                           setIsSettingsOpen("Settings");
//                         }
//                       }
//                     }}
//                     key={index}
//                     href={item.href}
//                     className={`flex items-center px-6 py-3  font-medium rounded-lg mb-2 transition-all ${
//                       isActive ? "bg-white text-black" : "text-white"
//                     } hover:bg-white hover:text-black`}
//                   >
//                     <span className="mr-3 text-xl">{item.icon}</span>
//                     {item.name}
//                   </Link>
//                 )}
//                 {item.name === isSettingsOpen && (
//                   <div className="ml-8 mt-1 space-y-1">
//                     {settingsStages.map((item, stageIndex) => {
//                       const isStageActive = pathname === item.href;
//                       return (
//                         <Link
//                           key={stageIndex}
//                           href={item.href}
//                           className={`flex items-center px-6 py-3 font-medium rounded-lg mb-2 transition-all ${
//                             isActive ? "bg-white text-black" : "text-white"
//                           } hover:bg-white`}
//                         >
//                           <span className="mr-3 text-xl">{item.icon}</span>
//                           {item.name}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           <div className="my-4 border-t border-gray-200"></div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

"use client";

import CustomText from "@/app/components/custom_text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isProfessionalOpen, setIsProfessionalOpen] = useState(false);
  const [isAdvertisingOpen, setIsAdvertisingOpen] = useState(false);
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

  const SidebarContent = () => {
    return (
      <>
        {/* Header */}
        <div className="p-5 border-b border-white/30 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Admin Portal</h2>

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

          <Link
            href="/admin/users"
            onClick={() => setOpen(false)}
            className={`flex items-center px-6 py-3 font-medium rounded-lg mb-2 transition-all ${
              pathname === "/admin/users"
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            <span className="mr-3 text-xl">👥</span>
            User Management
          </Link>

          {/* ---------------------------------------- */}
          {/* Settings */}
          {/* ---------------------------------------- */}

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
