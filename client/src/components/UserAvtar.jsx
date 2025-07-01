import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg tracking-wide shadow-md transition-all duration-300 hover:ring-2 hover:ring-black focus:ring-2 focus:ring-black">
  <span>{getInitials(user?.name || "Project Forge")}</span>
</Menu.Button>

        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-[#121212] border border-white/10 rounded-xl shadow-xl ring-1 ring-white/10 backdrop-blur-md focus:outline-none text-white">
            <div className="p-3 space-y-2">
              <Menu.Item>
                {() => (
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaUser className="text-pink-400" />
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    onClick={() => setOpenPassword(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaUserLock className="text-purple-400" />
                    <span>Change Password</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <IoLogOutOutline />
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAvatar;
