import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Button from "./Button";
import { toast } from "sonner"; // If using toast notifications

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Placeholder mutation handler
  const handleOnSubmit = async (data) => {
    console.log({ ...data, taskId: id });
    toast.success("Sub-task added!");
    setTimeout(() => {
      reset();
      setOpen(false);
    }, 600);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='text-white bg-[#11172b] rounded-xl shadow-lg border border-blue-500/30 p-4'
      >
        <Dialog.Title
          as='h2'
          className='text-lg font-bold text-blue-400 tracking-wide border-b border-blue-500/20 pb-2 mb-4'
        >
          ✨ Add Sub-Task
        </Dialog.Title>

        <div className='flex flex-col gap-6'>
          <Textbox
            placeholder='Sub-Task title'
            type='text'
            name='title'
            label='Title'
            className='w-full bg-transparent border border-gray-600 text-white rounded'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title?.message}
          />

          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <Textbox
              placeholder='Date'
              type='date'
              name='date'
              label='Task Date'
              className='w-full bg-transparent border border-gray-600 text-white rounded'
              register={register("date", {
                required: "Date is required!",
              })}
              error={errors.date?.message}
            />
            <Textbox
              placeholder='Tag'
              type='text'
              name='tag'
              label='Tag'
              className='w-full bg-transparent border border-gray-600 text-white rounded'
              register={register("tag", {
                required: "Tag is required!",
              })}
              error={errors.tag?.message}
            />
          </div>
        </div>

        <div className='mt-6 flex flex-col sm:flex-row-reverse gap-4'>
          <Button
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-purple-700 hover:opacity-90 shadow-lg text-white text-sm font-semibold rounded px-6 py-2 transition-all'
            label='Add Task'
          />

          <Button
            type='button'
            className='bg-gray-800 border border-gray-600 text-white text-sm font-semibold rounded px-6 py-2 transition-all hover:bg-gray-700'
            onClick={() => {
              setOpen(false);
              reset();
            }}
            label='Cancel'
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
