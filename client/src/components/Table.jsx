import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaList } from "react-icons/fa";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import clsx from "clsx";
import UserInfo from "./UserInfo";
import Button from "./Button";
import ConfirmatioDialog from "./Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {
    toast.success("Task deleted.");
    setOpenDialog(false);
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-700'>
      <tr className='text-left text-sm text-gray-300'>
        <th className='py-3'>Task Title</th>
        <th className='py-3'>Priority</th>
        <th className='py-3'>Created At</th>
        <th className='py-3'>Assets</th>
        <th className='py-3'>Team</th>
        <th className='py-3 text-right'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-800 hover:bg-white/5 transition-all'>
      <td className='py-3'>
        <div className='flex items-center gap-3'>
          <div className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task.stage])} />
          <p className='text-white truncate max-w-[160px]'>{task?.title}</p>
        </div>
      </td>

      <td className='py-3'>
        <div className='flex items-center gap-1 text-sm text-gray-200'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize'>{task?.priority} Priority</span>
        </div>
      </td>

      <td className='py-3'>
        <span className='text-gray-400 text-sm'>{formatDate(new Date(task?.date))}</span>
      </td>

      <td className='py-3'>
        <div className='flex items-center gap-3 text-sm text-gray-300'>
          <div className='flex items-center gap-1'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex items-center gap-1'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex items-center gap-1'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-3'>
        <div className='flex'>
           {task?.team?.map((m, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                            BGS[index % BGS?.length],
                            "hover:ring-2 active:scale-105"
                          )}
                        >
                          <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-3 flex gap-2 justify-end'>
        <Button
          className='text-cyan-400 hover:text-cyan-300 text-sm'
          label='Edit'
          type='button'
        />
        <Button
          className='text-red-500 hover:text-red-400 text-sm'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='bg-[#111827] rounded-xl px-4 py-6 shadow-xl border border-gray-800 overflow-x-auto'>
        <table className='w-full min-w-[700px] text-sm'>
          <TableHeader />
          <tbody>
            {tasks.map((task, index) => (
              <TableRow key={index} task={task} />
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Table;
