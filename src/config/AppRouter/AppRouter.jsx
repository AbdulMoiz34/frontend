import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout, AdminLayout } from "../../layout";
import Home from "../../pages/Home";
import { LoginPage, SignupPage, Contact, About, NotFound, Doctors, DoctorDetails, MyAppointments, PatientProfile } from "../../pages";
import { ProtectedRoute } from "../../components";
import DoctorAppointments from "../../doctor/pages/MyAppointment";
import DoctorProfile from "../../doctor/pages/Profile";
import AdminDashboard from "../../admin/pages/Dashboard";
import AddDoctor from "../../admin/pages/AddDoctor";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AppRouter = () => {
    const user = useContext(AuthContext);
    console.log(user);
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:docId" element={<DoctorDetails />} />
                < Route path="*" element={<NotFound />} />
                <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="/profile" element={<PatientProfile />} />
                </Route>
            </Route>


            <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/profile" element={<DoctorProfile />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/add-doctor" element={<AddDoctor />} />
                </Route>
            </Route>
        </Routes >
    );
}

export default AppRouter;