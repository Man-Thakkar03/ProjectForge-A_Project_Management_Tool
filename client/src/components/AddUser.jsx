import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Button from "./Button";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen, userData }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Reset form with default values on open
  useEffect(() => {
    if (open) {
      reset({
        name: userData?.name || "",
        title: userData?.title || "",
        email: userData?.email || "",
        role: userData?.role || "",
      });
    }
  }, [open, userData, reset]);

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser({ ...data, id: userData._id }).unwrap();
        toast.success(result?.message);

        if (userData._id === user?._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        const result = await addNewUser({ ...data, password: data.email }).unwrap();
        toast.success("New user added successfully!");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="text-white">
        <Dialog.Title
          as="h2"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text tracking-wider mb-6"
        >
          {userData ? "Update Profile" : "Add New User"}
        </Dialog.Title>

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
            disabled={!!userData}
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
