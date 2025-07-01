import React from 'react';
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import Chart from '../components/Chart';
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from '../components/UserInfo';

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-fuchsia-400/20 text-fuchsia-300 text-sm uppercase tracking-wide">
      <tr className="text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Team</th>
        <th className="py-2 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-700/40 text-gray-300 hover:bg-white/5 transition-all">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
          <p className="text-base">{task.title}</p>
        </div>
      </td>
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 hidden md:block">
        <span className="text-sm">{moment(task?.date).fromNow()}</span>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-white/5 backdrop-blur-md border border-white/10 px-4 pt-4 pb-4 hover:shadow-[0_0_20px_#ff00ff30] hover:scale-105 duration-700 rounded-2xl">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="border-b border-fuchsia-400/20 text-fuchsia-300 text-sm uppercase tracking-wide">
      <tr className="text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-700/40 text-gray-300 hover:bg-white/5 transition-all">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white flex items-center justify-center text-sm">
            <span>{getInitials(user?.name)}</span>
          </div>
          <div>
            <p>{user.name}</p>
            <span className="text-xs text-gray-400">{user?.role}</span>
          </div>
        </div>
      </td>
      <td>
        <p className={clsx(
          "w-fit px-3 py-1 rounded-full text-sm",
          user?.isActive ? "bg-blue-600/20 text-blue-400" : "bg-yellow-600/20 text-yellow-300"
        )}>
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-4 hover:shadow-[0_0_20px_#ff00ff30] hover:scale-105 duration-700 rounded-2xl">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary?.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <LuClipboardList />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl  hover:shadow-[0_0_30px_#ff00ff40] transition-all duration-300 p-5 flex items-center justify-between group hover:scale-105">
        <div className="flex flex-col justify-between h-full">
          <p className="text-sm text-gray-300 tracking-wider">{label}</p>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md">
            {count}
          </span>
          <span className="text-xs text-gray-400">last month</span>
        </div>
        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white text-xl", bg)}>
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-2">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* Chart */}
      <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md my-16 p-6 rounded-2xl hover:shadow-[0_0_20px_#ff00ff30] hover:scale-105 duration-1000">
        <h4 className="text-xl font-bold text-fuchsia-300 mb-4 drop-shadow-sm">Chart by Priority</h4>
        <Chart />
      </div>

      {/* Tables */}
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={summary.last10Task} />
        <UserTable users={summary.users} />
      </div>
    </div>
  );
};

export default Dashboard;
