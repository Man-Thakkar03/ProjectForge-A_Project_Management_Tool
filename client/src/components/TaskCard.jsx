import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "w-full h-fit p-4 rounded-xl shadow-lg transition duration-300",
          "bg-gradient-to-br from-[#0f172a] to-[#1e293b] backdrop-blur-lg border border-white/10 hover:scale-105 hover:shadow-[0_0_20px_#ff00ff30]"
        )}
      >
        {/* Priority + Menu */}
        <div className='flex justify-between items-start'>
          <div
            className={clsx(
              "flex items-center gap-2 text-sm font-semibold",
              PRIOTITYSTYELS[task?.priority],
              "drop-shadow-glow"
            )}
          >
            <span className='text-xl'>{ICONS[task?.priority]}</span>
            <span className='uppercase tracking-wide'>
              {task?.priority} Priority
            </span>
          </div>
          { <TaskDialog task={task} />}
        </div>

        {/* Title */}
        <div className='mt-3'>
          <div className='flex items-center gap-2'>
            <div
              className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task?.stage])}
            />
            <h4 className='line-clamp-1 text-white text-lg font-medium'>
              {task?.title}
            </h4>
          </div>
          <p className='text-sm text-slate-400 mt-1'>
            {formatDate(new Date(task?.date))}
          </p>
        </div>

        {/* Metadata */}
        <div className='border-t border-slate-700 my-4' />
        <div className='flex justify-between items-center text-sm'>
          <div className='flex items-center gap-4 text-slate-400'>
            <span className='flex items-center gap-1'>
              <BiMessageAltDetail /> {task?.activities?.length}
            </span>
            <span className='flex items-center gap-1'>
              <MdAttachFile /> {task?.assets?.length}
            </span>
            <span className='flex items-center gap-1'>
              <FaList /> 0/{task?.subTasks?.length}
            </span>
          </div>

          <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-xs -mr-1 border border-white/10",
                  BGS[index % BGS.length],
                  "hover:ring-2 active:scale-105"
                )}
              >
                <UserInfo user={m} tasks={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Sub Task Section */}
        <div className='mt-4 border-t border-slate-700 pt-4'>
          {task?.subTasks?.length > 0 ? (
            <>
              <p className='text-white font-medium line-clamp-1'>
                {task?.subTasks[0].title}
              </p>
              <div className='flex items-center gap-4 mt-2'>
                <span className='text-sm text-slate-400'>
                  {formatDate(new Date(task?.subTasks[0]?.date))}
                </span>
                <span className='text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium'>
                  {task?.subTasks[0]?.tag}
                </span>
              </div>
            </>
          ) : (
            <span className='text-sm text-slate-500'>No Sub Task</span>
          )}
        </div>

        {/* Add Subtask */}
        <div className='w-full mt-4'>
          <button
            onClick={() => setOpen(true)}
            disabled={!user?.isAdmin}
            className={clsx(
              "w-fit flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all",
              "bg-white/5 text-slate-300 hover:text-blue-400 hover:bg-white/10",
              "disabled:cursor-not-allowed disabled:text-slate-500"
            )}
          >
            <IoMdAdd className='text-lg' />
            Add Subtask
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
