import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black bg-opacity-80 backdrop-blur-sm transition-opacity' />
        </Transition.Child>

        {/* Modal container */}
        <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center px-4 py-12 sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] shadow-2xl ring-1 ring-white/10 transition-all sm:my-8 w-full sm:max-w-md text-white'>
                {/* Content */}
                <div className='px-6 py-6 sm:p-8'>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
