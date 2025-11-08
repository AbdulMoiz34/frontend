import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout, AdminLayout } from "../../layout";
import { LoginPage, SignupPage, Contact, About, NotFound, Doctors, DoctorDetails, MyAppointments, PatientProfile, Home } from "../../pages";
import { Dashboard as AdminDashboard, AddDoctor, Appointments, Doctors as AdminDoctors, Patients } from "../../admin/pages";
import { DoctorDashboard, MyAppointment as DoctorAppointments, Profile as DoctorProfile } from "../../doctor/pages";
import { useContext } from "react";
import { ProtectedRoute } from "../../components";
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
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/add-doctor" element={<AddDoctor />} />
                    <Route path="/admin/appointments" element={<Appointments />} />
                    <Route path="/admin/doctors" element={<AdminDoctors />} />
                    <Route path="/admin/patients" element={<Patients />} />
                </Route>
            </Route>
        </Routes >
    );
}

export default AppRouter;