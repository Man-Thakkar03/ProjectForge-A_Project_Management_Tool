import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='py-6 px-6 sm:px-10 w-full flex flex-col gap-5 items-center justify-center text-gray-300'>
        <Dialog.Title as='h3'>
          <p
            className={clsx(
              "p-4 rounded-full shadow-lg",
              type === "restore" || type === "restoreAll"
                ? "text-yellow-400 bg-yellow-900/20"
                : "text-red-400 bg-red-900/20"
            )}
          >
            <FaQuestion size={50} />
          </p>
        </Dialog.Title>

        <p className='text-center text-sm text-gray-400 max-w-xs'>
          {msg ?? "Are you sure you want to delete the selected record?"}
        </p>

        <div className='w-full flex justify-center gap-4 pt-2'>
          <Button
            type='button'
            onClick={onClick}
            className={clsx(
              "px-6 py-2 text-sm font-semibold text-white rounded-md shadow",
              type === "restore" || type === "restoreAll"
                ? "bg-yellow-500 hover:bg-yellow-400"
                : "bg-red-600 hover:bg-red-500"
            )}
            label={type === "restore" ? "Restore" : "Delete"}
          />
          <Button
            type='button'
            onClick={closeDialog}
            className='px-6 py-2 text-sm font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md'
            label='Cancel'
          />
        </div>
      </div>
    </ModalWrapper>
  );
}


export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='py-6 px-6 sm:px-10 w-full flex flex-col gap-5 items-center justify-center text-gray-300'>
        <Dialog.Title as='h3'>
          <p className='p-4 rounded-full bg-red-900/20 text-red-400 shadow-lg'>
            <FaQuestion size={50} />
          </p>
        </Dialog.Title>

        <p className='text-center text-sm text-gray-400 max-w-xs'>
          Are you sure you want to activate or deactivate this account?
        </p>

        <div className='w-full flex justify-center gap-4 pt-2'>
          <Button
            type='button'
            onClick={onClick}
            className='px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md shadow'
            label='Yes'
          />
          <Button
            type='button'
            onClick={closeDialog}
            className='px-6 py-2 text-sm font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md'
            label='No'
          />
        </div>
      </div>
    </ModalWrapper>
  );
}
