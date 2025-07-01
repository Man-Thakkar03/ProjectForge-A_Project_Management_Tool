import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvtar from './UserAvtar';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative z-10 flex justify-between items-center px-4 py-3 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_#ff00ff10]">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 md:hidden"
        >
          ☰
        </button>
        <div className="w-full sm:w-56 md:w-[350px] flex items-center py-2 px-3 gap-2 rounded-full bg-white/10 border border-white/10">
          <MdOutlineSearch className="text-fuchsia-300 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-fuchsia-300"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex gap-4 items-center relative">
        <NotificationPanel />
        <UserAvtar />
      </div>
    </div>
  );
};

export default Navbar;
