import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "./Dialogs";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => {
    console.log("Duplicate clicked");
  };
  const deleteClicks = () => {
    setOpenDialog(true);
  };
  const deleteHandler = () => {
    console.log("Delete confirmed");
    setOpenDialog(false);
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='inline-flex justify-center p-2 rounded-full hover:bg-blue-500/20 transition-all duration-200 text-blue-400 hover:text-white'>
            <BsThreeDots className='text-xl' />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-[#0e0e2e] text-white shadow-lg ring-1 ring-blue-500/30 focus:outline-none z-50 backdrop-blur-md border border-blue-700/40'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active
                            ? "bg-gradient-to-r from-blue-700 to-purple-600 text-white shadow-md"
                            : "text-gray-200"
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm hover:scale-[1.02] transition-all duration-200`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        active
                          ? "bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md"
                          : "text-red-400"
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm hover:scale-[1.02] transition-all duration-200`}
                    >
                      <RiDeleteBin6Line className='mr-2 h-5 w-5' aria-hidden='true' />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask open={openEdit} setOpen={setOpenEdit} task={task} key={new Date().getTime()} />
      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default TaskDialog;
