import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";

const UserInfo = ({ user, popupUp , tasks = false }) => {
  return (
    <div className="px-2">
      <Popover className="relative">
        <>
          <Popover.Button className="group inline-flex items-center justify-center outline-none w-7 h-7 rounded-full text-white bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-sm font-semibold shadow-md transition duration-300 hover:shadow-[0_0_20px_#ff00ff30] hover:ring-1 hover:ring-black/50">
            <span>{getInitials(user?.name)}</span>
          </Popover.Button>

          <Transition
  as={Fragment}
  enter="transition ease-out duration-300"
  enterFrom="opacity-0 translate-y-1"
  enterTo="opacity-100 translate-y-0"
  leave="transition ease-in duration-200"
  leaveFrom="opacity-100 translate-y-0"
  leaveTo="opacity-0 translate-y-1"
>
  <Popover.Panel
  className={`
    absolute z-20 
    right-0 sm:left-0.5  sm:-translate-x-1/2 
    w-[92vw] max-w-xs sm:w-80 
    px-2 sm:px-0  hover:scale-105 duration-300 hover:shadow-[0_0_20px_#ff00ff30]
    ${popupUp ? "bottom-10 mb-2" : "mt-3"}
    ${tasks ? "-ml-36 sm:left-0 sm:-translate-x-0 " : ""}
  `}
>
  <div className="flex items-center gap-3 sm:gap-4 rounded-xl bg-[#111827] w-full overflow-hidden border border-white/10 shadow-2xl p-4 sm:p-5">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-md">
      <span>{getInitials(user?.name || "U")}</span>
    </div>
    <div className="flex flex-col gap-y-0.5 sm:gap-y-1 text-white overflow-hidden">
      <p className="text-base sm:text-xl font-bold truncate">{user?.name}</p>
      <span className="text-xs sm:text-sm text-gray-300 truncate">{user?.title}</span>
      <span className="text-sm text-fuchsia-300 truncate">
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
