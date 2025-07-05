import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { summary } from "../assets/data";
import clsx from "clsx";
import { getInitials } from "../utils";
import { MdCheck } from "react-icons/md";

const UserList = ({ setTeam, team }) => {
  const data = summary.users;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      const filteredUsers = data.filter((u) => team.includes(u._id));
      setSelectedUsers(filteredUsers);
    }
  }, []);

  return (
    <div>
      <p className="text-sm font-semibold text-fuchsia-400 tracking-wide mb-1">
        Assign Task To:
      </p>

      <Listbox value={selectedUsers} onChange={handleChange} multiple>
        <div className="relative mt-1">
          {/* Button */}
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-xl bg-[#1c1f2a]/80 border border-[#3b3e4e] py-2.5 pl-4 pr-10 text-left shadow-md text-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
          >
            <span className="block truncate text-sm font-medium">
              {selectedUsers?.map((user) => user.name).join(", ") || "Select team"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <BsChevronExpand className="h-4 w-4 text-fuchsia-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Options Dropdown */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#1c1f2a] py-1 text-sm shadow-xl ring-1 ring-fuchsia-500/20 backdrop-blur-xl focus:outline-none"
            >
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  value={user}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-md",
                      active ? "bg-fuchsia-600/20 text-fuchsia-300" : "text-white"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2",
                          selected && "font-semibold"
                        )}
                      >
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white text-[10px] shadow-md">
                          {getInitials(user.name)}
                        </div>
                        <span>{user.name}</span>
                      </div>
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

export default UserList;
