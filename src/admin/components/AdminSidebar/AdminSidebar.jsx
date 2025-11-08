import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

const AdminSidebar = () => {
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            queryClient.invalidateQueries(["user"]);
            message.success("Logged out!");
        } catch {
            message.error("Logout failed!");
        }
    };

    const menu = [
        { name: "Dashboard", to: "/admin/dashboard", icon: <MdOutlineDashboard /> },
        { name: "Appointments", to: "/admin/appointments", icon: <FaRegCalendarCheck /> },
        { name: "Add Doctor", to: "/admin/add-doctor", icon: <HiOutlineUserAdd /> },
        { name: "Doctors List", to: "/admin/doctors", icon: <FaUserDoctor /> },
        { name: "Patients", to: "/admin/patients", icon: <AiOutlineUser /> },
    ];

    return (
        <div className="h-screen sticky top-0 w-64 bg-linear-to-b from-slate-900 to-slate-800 flex flex-col select-none shadow-2xl">

            {/* Logo */}
            <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-700/50">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl text-blue-400 font-medium">Admin Panel</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 mt-6 px-3">
                {menu.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3.5 mb-2 text-sm font-medium cursor-pointer transition-all duration-200 rounded-xl
              ${isActive
                                ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>

            {/* User Info Card */}
            <div className="mx-3 mb-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">AD</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">Admin</span>
                        <span className="text-slate-400 text-xs">admin@gmai.com</span>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all duration-200 font-medium"
                >
                    <FiLogOut className="text-base" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;