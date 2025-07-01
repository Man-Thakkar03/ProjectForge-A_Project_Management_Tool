import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";

const UserInfo = ({ user }) => {
  return (
    <div className="px-2">
      <Popover className="relative">
        <>
          <Popover.Button className="group inline-flex items-center justify-center outline-none w-7 h-7 rounded-full text-white bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-sm font-semibold shadow-md transition duration-300 hover:scale-105 hover:ring-1 hover:ring-black/50">
            <span>{getInitials(user?.name)}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-20 mt-3 w-80 -translate-x-1/2 transform px-4 sm:px-0">
              <div className="flex items-center gap-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-2xl p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  <span>{getInitials(user?.name)}</span>
                </div>
                <div className="flex flex-col gap-y-1 text-white">
                  <p className="text-xl font-bold">{user?.name}</p>
                  <span className="text-sm text-gray-300">{user?.title}</span>
                  <span className="text-fuchsia-300">
                    {user?.email ?? "email@example.com"}
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
};

export default UserInfo;
