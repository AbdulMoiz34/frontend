import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";

const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const queryClient = useQueryClient();
    const user = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            queryClient.invalidateQueries(["user"]);
            message.success("Logged out!");
            setOpen(false);
        } catch {
            message.error("Logout failed!");
        }
    };

    // Close menu if user clicks outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!user) return null; // No menu if user not logged in

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center bg-white hover:bg-gray-100 transition p-1 rounded-full shadow-sm"
            >
                <img
                    src={user.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-1 w-52 bg-white shadow-xl rounded-xl py-2 border border-gray-100 animate-fadeIn z-50">

                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        My Profile
                    </Link>

                    <Link to="/my-appointments" className="block px-4 py-2 hover:bg-gray-100">
                        My Appointments
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="block text-left w-full px-4 py-2 hover:bg-red-50 text-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
