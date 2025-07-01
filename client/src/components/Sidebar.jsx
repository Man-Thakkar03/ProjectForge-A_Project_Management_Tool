import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSlidebar } from "../redux/slices/authSlice";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSlidebar = () => {
    dispatch(setOpenSlidebar(false));
  };

  const SidebarLink = ({ element }) => {
    const isActive = path === element.link.split("/")[0];
    return (
      <Link
        to={`/${element.link}`}
        onClick={closeSlidebar}
        className={clsx(
          "w-full lg:w-3/4 flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 text-white shadow-lg shadow-pink-500/30 scale-[1.03]"
            : "text-gray-300 hover:text-fuchsia-400 hover:bg-white/5"
        )}
      >
        <span className="text-xl">{element.icon}</span>
        <span className="font-medium text-sm">{element.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-6 p-5 bg-[#0b0b0f] text-white">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-full shadow-md shadow-pink-400/30">
          <MdOutlineAddTask className="text-white text-xl" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          ProjectForge
        </span>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col gap-y-5 py-8 overflow-y-auto no-scrollbar">
        {sidebarLinks.map((link) => (
          <SidebarLink element={link} key={link.label} />
        ))}
      </div>

      {/* Settings */}
    
        
         <div className={clsx(
            "w-full lg:w-3/4 flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200",
            path === "settings"
              ? "bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 text-white shadow-lg shadow-pink-500/30 scale-[1.03]"
              : "text-gray-300 hover:text-fuchsia-400 hover:bg-white/5"
          )}
        >
          <MdSettings className="text-xl" />
          <span className="font-medium text-sm">Settings</span>
        
      </div>
    </div>
  );
};

export default Sidebar;
