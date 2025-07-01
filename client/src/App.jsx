import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { Toaster } from "sonner";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import TasksDetails from "./pages/TasksDetails";

function Layout() {
  const user = " "; 
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/5 h-screen sticky top-0 bg-[#111] border-r border-white/10">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const isSidebarOpen = useSelector((state) => state.auth.isSidebarOpen);
  const dispatch = useDispatch();

  const closeSidebar = () => dispatch(setOpenSidebar(false));

  return (
    <Transition
  show={isSidebarOpen}
  as={Fragment}
  enter="transition-opacity duration-700"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="transition-opacity duration-700"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div
    className={clsx(
      "fixed inset-0 z-[9999] md:hidden bg-[#0a0a0a] transition-all duration-700 transform",
      isSidebarOpen ? "translate-x-0" : "translate-x-full"
    )}
    onClick={closeSidebar}
  >
    <div
  className="bg-[#0b0b0f] w-3/4 h-full text-white overflow-y-auto flex flex-col"
  onClick={(e) => e.stopPropagation()}
>
  <div className="w-full flex justify-end px-5 mt-5">
    <button onClick={closeSidebar}>
      <IoClose size={25} />
    </button>
  </div>

  <Sidebar /> 
</div>

  </div>
</Transition>

  );
};

function App() {
  return (
    <main className="w-full min-h-screen font-nunito bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TasksDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </main>
  );
}

export default App;
