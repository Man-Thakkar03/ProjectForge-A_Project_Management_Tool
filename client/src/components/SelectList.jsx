import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-sm text-gray-700 font-medium mb-1">{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2.5 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          >
            <span className="block truncate font-medium text-gray-800">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <BsChevronExpand className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-xl ring-1 ring-black/10 focus:outline-none"
            >
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  value={list}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all ${
                      active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                        {list}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectList;
