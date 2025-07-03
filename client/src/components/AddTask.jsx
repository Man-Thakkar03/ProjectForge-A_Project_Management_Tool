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
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};
  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as="h2" className="text-xl font-bold text-gray-900 mb-4">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex flex-col md:flex-row gap-4">
            <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />

            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SelectList
              label="Priority Level"
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />

            <label
              htmlFor="imgUpload"
              className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-fuchsia-500 transition-colors"
            >
              <BiImages className="text-xl" />
              <span className="text-sm font-medium">Add Assets</span>
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

          <div className="flex flex-col sm:flex-row justify-end gap-4 bg-white/80 p-4 mt-6 rounded-md shadow-sm">
            {uploading ? (
              <span className="text-sm text-red-500">Uploading assets...</span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-md font-semibold hover:scale-105 transition-transform"
              />
            )}

            <Button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md font-medium"
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
