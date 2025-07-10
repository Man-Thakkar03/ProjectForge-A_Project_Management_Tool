import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

const ViewNotification = ({ open, setOpen, el }) => {
  const title = el?.task?.title || "Notification";
  const message = el?.text || "No additional details.";

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl px-6 py-8 rounded-2xl shadow-lg border border-white/10 text-white text-center flex flex-col items-center gap-6">
        <Dialog.Title
          as="h3"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {title}
        </Dialog.Title>

        <Dialog.Description className="text-sm text-gray-300 leading-relaxed">
          {message}
        </Dialog.Description>

        <Button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-2 rounded-md hover:scale-105 transition-transform shadow-md"
          onClick={() => setOpen(false)}
          label="OK"
        />
      </div>
    </ModalWrapper>
  );
};

export default ViewNotification;
