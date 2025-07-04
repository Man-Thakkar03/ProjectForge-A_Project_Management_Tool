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
    // Your API submission logic here
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <Dialog.Title
          as='h2'
          className='text-xl font-semibold leading-6 text-[#00FFF7] mb-6 uppercase tracking-wide'
        >
          {userData ? "Update Profile" : "Add New User"}
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Full name'
            type='text'
            name='name'
            label='Full Name'
            className='w-full rounded'
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name?.message}
          />

          <Textbox
            placeholder='Title'
            type='text'
            name='title'
            label='Title'
            className='w-full rounded'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title?.message}
          />

          <Textbox
            placeholder='Email Address'
            type='email'
            name='email'
            label='Email Address'
            className='w-full rounded'
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email?.message}
          />

          <Textbox
            placeholder='Role'
            type='text'
            name='role'
            label='Role'
            className='w-full rounded'
            register={register("role", {
              required: "User role is required!",
            })}
            error={errors.role?.message}
          />
        </div>

        {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-6 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-[#00FFF7] text-black font-semibold hover:bg-[#00e4db] px-6 py-2 sm:w-auto'
              label={userData ? "Update" : "Submit"}
            />
            <Button
              type='button'
              className='bg-gray-800 border border-gray-600 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
