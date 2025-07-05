import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "./SelectList";
import { BiImages } from "react-icons/bi";
import Button from "./Button";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};
  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)} className="text-white">
        {/* Title */}
        <Dialog.Title
          as="h2"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text tracking-wider mb-6 drop-shadow-md"
        >
          {task ? "UPDATE TASK" : "CREATE NEW TASK"}
        </Dialog.Title>

        {/* Form Container */}
        <div className="flex flex-col gap-6 bg-[#13151c]/80 p-6 rounded-2xl shadow-2xl border border-[#2f3142] backdrop-blur-xl">

          {/* Task Title */}
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          {/* Team Members */}
          <UserList setTeam={setTeam} team={team} />

          {/* Stage & Date */}
          <div className="flex flex-col md:flex-row gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Due Date"
              className="w-full"
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          {/* Priority + File Upload */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            <label
              htmlFor="imgUpload"
              className="cursor-pointer flex items-center gap-2 text-fuchsia-400 hover:text-pink-400 transition-colors duration-200 border border-[#2e3040] px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10"
            >
              <BiImages className="text-2xl" />
              <span className="text-sm font-medium">Upload Assets</span>
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleSelect}
                accept=".jpg, .png, .jpeg"
                multiple
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 border-t border-[#2d2f3d] pt-4">
            {uploading ? (
              <span className="text-sm text-red-400">Uploading assets...</span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-500 text-white rounded-full font-semibold shadow-md hover:shadow-pink-500/40 hover:scale-105 transition-all"
              />
            )}

            <Button
              type="button"
              className="px-6 py-2 bg-white/10 text-gray-300 hover:bg-white/20 rounded-full font-medium transition"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
