import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className, onClick }) => {
  return (
    <div className='w-full h-10 md:h-12 px-3 md:px-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-sm flex items-center justify-between transition-all hover:scale-105 hover:shadow-[0_0_30px_#ff00ff40] duration-500 '>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-3.5 h-3.5 md:w-4 md:h-4 rounded-full", className)} />
        <p className='text-sm md:text-base text-white/90 font-medium tracking-wide'>{label}</p>
      </div>

      <button
        onClick={onClick}
        className='hidden md:flex items-center justify-center text-white cursor-default'
      >
        <IoMdAdd className='text-xl' />
      </button>
    </div>
  );
};

export default TaskTitle;
