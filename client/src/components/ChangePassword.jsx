import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loading";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords don't match");
      return;
    }

    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Password updated successfully");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='w-full bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/10 text-white space-y-6'
      >
        <Dialog.Title
          as='h2'
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text tracking-wider mb-6 drop-shadow-md"
        >
          Change Password
        </Dialog.Title>

        <div className='space-y-5'>
          <Textbox
            placeholder='New Password'
            type='password'
            name='password'
            label='New Password'
            className='w-full rounded bg-transparent text-white border border-white/20 focus:ring-2 focus:ring-blue-500'
            register={register("password", {
              required: "New Password is required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Textbox
            placeholder='Confirm New Password'
            type='password'
            name='cpass'
            label='Confirm Password'
            className='w-full rounded bg-transparent text-white border border-white/20 focus:ring-2 focus:ring-purple-500'
            register={register("cpass", {
              required: "Confirmation is required!",
            })}
            error={errors.cpass?.message}
          />
        </div>

        <div className='pt-4 flex justify-end gap-4'>
          {isLoading ? (
            <div className='py-4 w-full'>
              <Loading />
            </div>
          ) : (
            <>
              <Button
                type='submit'
                label='Save'
                className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform duration-200'
              />

              <button
                type='button'
                onClick={() => setOpen(false)}
                className='px-5 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 transition'
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;
