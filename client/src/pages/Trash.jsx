import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmatioDialog from "../components/Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMsg("Do you want to delete this task permanently?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const deleteRestoreHandler = () => {
    // Your handler logic goes here
  };

  const TableHeader = () => (
    <thead className="border-b border-[#292c35] text-lg text-left text-fuchsia-300">
      <tr>
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2">Modified</th>
        <th className="py-2 text-right">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-[#1f222a] text-sm text-white hover:bg-[#1a1d27]/80 transition">
      <td className="py-3">
        <div className="flex items-center gap-3">
          <div className={clsx("w-3 h-3 rounded-full", TASK_TYPE[item.stage])} />
          <p className="line-clamp-2">{item?.title}</p>
        </div>
      </td>

      <td className="py-3 capitalize">
        <div className="flex gap-2 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span>{item?.priority}</span>
        </div>
      </td>

      <td className="py-3 capitalize">{item?.stage}</td>
      <td className="py-3 text-sm text-gray-400">
        {new Date(item?.date).toDateString()}
      </td>

      <td className="py-3 flex gap-3 justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-fuchsia-400 hover:text-pink-400 transition" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-500 hover:text-red-400 transition" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" className="text-fuchsia-400" />

         <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full sm:w-auto">
  <Button
    label="Restore All"
    icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
    className="flex flex-row-reverse justify-center gap-2 items-center text-sm px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-fuchsia-300 transition w-[150px]  ml-9 sm:w-auto"
    onClick={restoreAllClick}
  />
  <Button
    label="Delete All"
    icon={<MdDelete className="text-lg hidden md:flex" />}
    className="flex flex-row-reverse justify-center gap-2 items-center text-sm px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition w-[150px] ml-9 sm:w-auto sm:ml-1 mt-1 sm:mt-0"
    onClick={deleteAllClick}
  />
</div>

        </div>

        <div className="bg-[#13151b] border border-[#222430] px-4 py-5 shadow-inner rounded-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#2c2e3a] scrollbar-track-transparent">
            <table className="w-full">
              <TableHeader />
              <tbody>
                {tasks?.map((task, i) => (
                  <TableRow key={i} item={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
