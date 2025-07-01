import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvtar from './UserAvtar';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-white/5 backdrop-blur-md px-4 py-3 sticky z-10 top-0 shadow-[0_0_20px_#ff00ff10] border-b border-white/10'>
      <div className='flex gap-4 items-center'>
        {/* Mobile Menu Button */}
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        {/* Search Bar */}
        <div className='w-40 sm:w-56 md:w-64 flex items-center py-2 px-3 gap-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md'>
          <MdOutlineSearch className='text-fuchsia-300 text-xl' />
          <input
            type='text'
            placeholder='Search...'
            className='flex-1 outline-none bg-transparent placeholder:text-fuchsia-300 text-white text-sm'
          />
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <div className='relative'>
          <NotificationPanel />
        </div>
        <UserAvtar />
      </div>
    </div>
  );
};

export default Navbar;
