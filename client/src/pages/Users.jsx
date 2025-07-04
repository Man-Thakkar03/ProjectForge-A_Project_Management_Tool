import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-600 text-sm text-left text-gray-300'>
      <tr>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
        <th className='py-2 text-right'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-700 text-gray-300 hover:bg-white/5 transition'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div
            className={clsx(
              "flex items-center justify-center rounded-full text-white",
              "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
              "font-semibold shadow-md transition duration-300",
              "hover:shadow-[0_0_20px_#ff00ff30] hover:ring-1 hover:ring-black/50",
              "text-xs md:text-sm",
              "w-8 h-8 md:w-10 md:h-10",
              "min-w-[2rem] flex-shrink-0"
            )}
          >
            {getInitials(user.name)}
          </div>
          <span className='text-sm'>{user.name}</span>
        </div>
      </td>

      <td className='p-2 text-sm'>{user.title}</td>
      <td className='p-2 text-sm'>{user.email || "user.email.com"}</td>
      <td className='p-2 text-sm'>{user.role}</td>

      <td className='p-2'>
        <span
          className={clsx(
            "px-4 py-1 rounded-full text-xs font-medium",
            user?.isActive
              ? "bg-green-600/20 text-green-400"
              : "bg-yellow-400/10 text-yellow-400"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </span>
      </td>

      <td className='p-2 flex gap-3 justify-end text-sm'>
        <Button
          className='text-blue-400 hover:text-blue-300 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />
        <Button
          className='text-red-400 hover:text-red-300 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6 '>
        {/* Top Section */}
        <div className='flex items-center justify-between mb-8'>
          <Title title='Team Members' />
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transition-transform text-white px-4 py-2.5 rounded-md shadow-md'
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Table */}
        <div className='bg-[#0F1117] border border-gray-800 px-2 md:px-4 py-4 shadow-inner rounded-lg hover:scale-105 hover:shadow-[0_0_20px_#ff00ff30] transition duration-1000'>
          <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
            <table className='w-full text-sm'>
              <TableHeader />
              <tbody>
                {summary.users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
