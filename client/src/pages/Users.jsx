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
    <thead className="border-b border-[#292c35] text-lg text-left text-fuchsia-300">
      <tr>
        <th className="py-3">Full Name</th>
        <th className="py-3">Title</th>
        <th className="py-3">Email</th>
        <th className="py-3">Role</th>
        <th className="py-3">Status</th>
        <th className="py-3 text-right">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-[#1f222a] text-sm text-white hover:bg-[#1a1d27]/80 transition">
      <td className="p-3">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0",
              "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-md"
            )}
          >
            {getInitials(user.name)}
          </div>
          <span>{user.name}</span>
        </div>
      </td>
      <td className="p-3">{user.title}</td>
      <td className="p-3">{user.email || "user@email.com"}</td>
      <td className="p-3 capitalize">{user.role}</td>
      <td className="p-3">
        <span
          className={clsx(
            "px-4 py-1 rounded-full text-xs font-semibold",
            user?.isActive
              ? "bg-green-600/20 text-green-400"
              : "bg-yellow-400/10 text-yellow-400"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </span>
      </td>
      <td className="p-3 flex justify-end gap-3">
        <Button
          className="text-fuchsia-400 hover:text-pink-400 font-semibold px-0"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-400 hover:text-red-300 font-semibold px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-2 items-center px-4 py-2.5 rounded-md text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 transition-transform shadow-lg"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Table */}
        <div className="bg-[#13151b] border border-[#2c2f3d] px-3 md:px-5 py-4 shadow-lg rounded-2xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#2c2e3a] scrollbar-track-transparent">
            <table className="w-full">
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
