// TaskDetails.jsx
import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loading";
import Button from "../components/Button";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-pink-500/10",
  medium: "bg-yellow-400/10",
  low: "bg-blue-400/10",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white shadow-md shadow-black'>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-purple-600 text-white shadow'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-500'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-fuchsia-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const task = tasks[3];

  return (
    <div className="w-full flex flex-col gap-3 mb-4 text-white">
      <h1 className="text-3xl font-bold text-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
        {task?.title}
      </h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-black/40 shadow-md rounded-xl p-8">
            {/* Left Section */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex items-center gap-5">
                <div
                  className={clsx(
                    "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                    PRIOTITYSTYELS[task?.priority],
                    bgColor[task?.priority],
                    "text-pink-400"
                  )}
                >
                  <span className="text-lg">{ICONS[task?.priority]}</span>
                  <span className="uppercase">{task?.priority} Priority</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                  <span className="uppercase text-fuchsia-400">{task?.stage}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300">Created At: {new Date(task?.date).toDateString()}</p>

              <div className="flex items-center gap-8 p-4 border-y border-gray-700 text-sm">
                <div className="space-x-2">
                  <span className="font-semibold">Assets :</span>
                  <span>{task?.assets?.length}</span>
                </div>
                <span className="text-gray-600">|</span>
                <div className="space-x-2">
                  <span className="font-semibold">Sub-Task :</span>
                  <span>{task?.subTasks?.length}</span>
                </div>
              </div>

              {/* Task Team */}
              <div className="space-y-4 py-6">
                <p className="text-fuchsia-400 font-semibold text-lg">TASK TEAM</p>
                {task?.team?.map((m, index) => (
                  <div key={index} className="flex gap-4 py-2 items-center border-t border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                      {getInitials(m?.name)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">{m?.name}</p>
                      <span className="text-sm text-gray-400">{m?.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sub Tasks */}
              <div className="space-y-4 py-6">
                <p className="text-fuchsia-400 font-semibold text-lg">SUB-TASKS</p>
                <div className="space-y-6">
                  {task?.subTasks?.map((el, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white">
                        <MdTaskAlt size={22} />
                      </div>
                      <div>
                        <div className="gap-2 flex items-center">
                          <span className="text-sm text-gray-400">{new Date(el?.date).toDateString()}</span>
                          <span className="px-2 py-0.5 text-xs rounded bg-fuchsia-900/30 text-fuchsia-400 font-semibold">{el?.tag}</span>
                        </div>
                        <p className="text-white">{el?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <p className="text-lg text-fuchsia-400 font-semibold">ASSETS</p>
              <div className="grid grid-cols-2 gap-4">
                {task?.assets.map((el, index) => (
                  <img
                    key={index}
                    src={el}
                    alt={task?.title}
                    className="w-full h-36 object-cover rounded-lg transition duration-500 hover:scale-105 shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Activities activity={task?.activities} id={id} />
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;

  const handleSubmit = async () => { };

  const Card = ({ item }) => (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          {TASKTYPEICON[item?.type]}
        </div>
        <div className="h-full flex items-center">
          <div className="w-0.5 bg-fuchsia-500/30 h-full"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 mb-8">
        <p className="font-semibold text-white">{item?.by?.name}</p>
        <div className="text-gray-400 space-x-2 text-sm">
          <span className="capitalize">{item?.type}</span>
          <span>{moment(item?.date).fromNow()}</span>
        </div>
        <div className="text-white">{item?.activity}</div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20 px-10 py-8 bg-black/40 rounded-xl shadow-xl text-white">
      <div className="w-full md:w-1/2">
        <h4 className="text-fuchsia-400 font-semibold text-lg mb-5">Activities</h4>
        <div className="space-y-0">{activity?.map((item, index) => <Card key={item.id} item={item} />)}</div>
      </div>

      <div className="w-full md:w-1/3">
        <h4 className="text-fuchsia-400 font-semibold text-lg mb-5">Add Activity</h4>
        <div className="flex flex-wrap gap-5">
          {act_types.map((item) => (
            <label key={item} className="flex gap-2 items-center text-gray-200 text-base">
              <input
                type="checkbox"
                className="accent-pink-500"
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              <span>{item}</span>
            </label>
          ))}
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your update..."
            className="w-full mt-6 p-4 bg-black/30 border border-pink-500 text-white rounded-lg focus:outline-none focus:ring-2 ring-pink-500"
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              label="Submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:brightness-125 text-white px-6 py-2 rounded-full shadow-lg transition"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
