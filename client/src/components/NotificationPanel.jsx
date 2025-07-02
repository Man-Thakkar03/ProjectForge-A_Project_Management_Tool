import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
  {
    _id: "1",
    team: ["u1", "u2", "u3"],
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority.",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2025-06-09T05:45:23.353Z",
  },
  {
    _id: "2",
    team: ["u1", "u2", "u3"],
    text: "New task assigned with high priority. Check immediately.",
    task: { _id: "task1", title: "Test Task" },
    notiType: "alert",
    isRead: [],
    createdAt: "2025-06-09T09:32:26.810Z",
  },
];

const ICONS = {
  alert: <HiBellAlert className="h-9 w-9 text-gray-600 group-hover:text-fuchsia-400" />,
  message: <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-500" />,
};

const NotificationPanel = () => {
  const readHandler = () => {};
  const viewHandler = () => {};

  const callsToAction = [
    { name: "Cancel", href: "#" },
    {
      name: "Mark All Read",
      href: "#",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center outline-none transition-all duration-300 rounded-full p-1 group">
        <div className="w-10 h-10 flex items-center justify-center relative rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-lg group-hover:scale-105 group-active:scale-110 transition-all">
          <IoIosNotificationsOutline className="text-white text-xl z-10" />
          {data?.length > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-white">
              {data.length}
            </span>
          )}
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute -right-16 md:-right-2 z-50 mt-5 flex w-screen max-w-max px-4">
          {({ close }) =>
            data.length > 0 && (
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-[#111827] text-sm leading-6 shadow-2xl ring-1 ring-white/10 border border-gray-700">
                <div className="p-4">
                  {data.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id + index}
                      className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-800 transition-all duration-200"
                    >
                      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-700 group-hover:bg-gray-600">
                        {ICONS[item.notiType]}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => viewHandler(item)}
                      >
                        <div className="flex items-center gap-3 font-semibold text-white capitalize">
                          <p>{item.notiType}</p>
                          <span className="text-xs font-normal text-gray-400 lowercase">
                            {moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="line-clamp-1 mt-1 text-gray-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-700 bg-gray-900">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      onClick={
                        item.onClick ? () => item.onClick() : () => close()
                      }
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-fuchsia-300 hover:bg-gray-800 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
