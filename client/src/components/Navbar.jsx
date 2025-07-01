import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSlidebar } from '../redux/slices/authSlice';
import UserAvtar from './UserAvtar';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-white/5 backdrop-blur-md px-4 py-3 2xl:py-4 sticky z-10 top-0 shadow-[0_0_20px_#ff00ff10] border-b border-white/10'>
      <div className='flex gap-4 items-center'>

        {/* Mobile Menu Button */}
        <button
          onClick={() => dispatch(setOpenSlidebar(true))}
          className='text-2xl text-fuchsia-400 block md:hidden'
        >
          ☰
        </button>

        {/* Search Bar */}
        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-4 gap-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-inner shadow-fuchsia-400/10'>
          <MdOutlineSearch className='text-fuchsia-300 text-xl' />
          <input
            type='text'
            placeholder='Search...'
            className='flex-1 outline-none bg-transparent placeholder:text-fuchsia-300 text-white'
          />
        </div>
      </div>

      {/* Avatar */}
      <div className='flex gap-2 items-center'>
        <UserAvtar />
      </div>
    </div>
  );
};

export default Navbar;
