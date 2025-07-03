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
      <p className="text-sm text-gray-700 font-medium mb-1">Assign Task To:</p>
      <Listbox value={selectedUsers} onChange={handleChange} multiple>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-3 py-2.5 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          >
            <span className="block truncate text-gray-800 font-medium text-sm">
              {selectedUsers?.map((user) => user.name).join(", ") || "Select team"}
            </span>
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
              className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-xl ring-1 ring-black/10 text-sm focus:outline-none"
            >
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 transition-all",
                      active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                    )
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div className={clsx("flex items-center gap-2", selected && "font-semibold")}>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full text-white bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-[10px]">
                          {getInitials(user.name)}
                        </div>
                        <span>{user.name}</span>
                      </div>
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

export default UserList;
