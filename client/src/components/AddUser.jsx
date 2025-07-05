import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Button from "./Button";

const AddUser = ({ open, setOpen, userData }) => {
  const defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const isLoading = false;
  const isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = () => {
    // Your API logic goes here
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="text-white">
        {/* Title */}
        <Dialog.Title
          as="h2"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text tracking-wider mb-6"
        >
          {userData ? "Update Profile" : "Add New User"}
        </Dialog.Title>

        {/* Form */}
        <div className="flex flex-col gap-6 bg-[#13151c]/80 p-6 rounded-2xl shadow-xl border border-[#2f3142] backdrop-blur-xl">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full"
            register={register("name", { required: "Full name is required!" })}
            error={errors.name?.message}
          />

          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            className="w-full"
            register={register("title", { required: "Title is required!" })}
            error={errors.title?.message}
          />

          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full"
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email?.message}
          />

          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full"
            register={register("role", { required: "User role is required!" })}
            error={errors.role?.message}
          />
        </div>

        {/* Actions */}
        {isLoading || isUpdating ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-4 mt-6 flex justify-end gap-4 border-t border-[#2e3040] pt-4">
            <Button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:shadow-pink-500/40 hover:scale-105 transition-all"
              label={userData ? "Update" : "Submit"}
            />
            <Button
              type="button"
              className="px-6 py-2 bg-white/10 text-gray-300 hover:bg-white/20 rounded-full font-medium transition"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
