import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import TasksDetails from "./pages/TasksDetails";
import { Toaster } from "sonner";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function Layout() {
  const user = " "; // fake auth for now
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white">
      {/* Sidebar */}
      <aside className="hidden md:block w-1/5 h-screen sticky top-0 bg-[#111] border-r border-white/10 shadow-inner shadow-fuchsia-500/5">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen font-nunito bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TasksDetails />} />
        </Route>

        <Route path="/log-in" element={<Login />} />
      </Routes>

      {/* Toast notifications */}
      <Toaster richColors position="top-right" />
    </main>
  );
}

export default App;
