import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className="w-full">
      {label && (
        <p className="text-sm font-semibold text-fuchsia-400 tracking-wide mb-1">
          {label}
        </p>
      )}

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          {/* Button */}
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-xl bg-[#1c1f2a]/80 border border-[#3b3e4e] py-2.5 pl-4 pr-10 text-left shadow-md text-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
          >
            <span className="block truncate font-medium">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <BsChevronExpand className="h-4 w-4 text-fuchsia-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Dropdown */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#1c1f2a] py-1 text-sm shadow-xl ring-1 ring-fuchsia-500/20 backdrop-blur-xl focus:outline-none"
            >
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  value={list}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-md ${
                      active ? "bg-fuchsia-600/20 text-fuchsia-300" : "text-white"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fuchsia-400">
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
