import { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaClock, FaUserMd, FaUser, FaPhone, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye, FaEdit, FaBan, FaFilter, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdMedicalServices, MdRoom } from 'react-icons/md';

const Appointments = () => {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            appointmentId: "APT-2024-001",
            patientName: "John Smith",
            patientPhone: "+1234567890",
            patientEmail: "john.smith@email.com",
            doctorName: "Dr. Sarah Johnson",
            doctorSpecialization: "Cardiologist",
            date: "2024-11-08",
            time: "10:00 AM",
            room: "Room 1",
            status: "booked",
            symptoms: "Chest pain, shortness of breath",
            createdAt: "2024-11-05",
            duration: "30 mins"
        },
        {
            id: 2,
            appointmentId: "APT-2024-002",
            patientName: "Emily Davis",
            patientPhone: "+1234567891",
            patientEmail: "emily.davis@email.com",
            doctorName: "Dr. Michael Chen",
            doctorSpecialization: "Orthopedic",
            date: "2024-11-08",
            time: "11:00 AM",
            room: "Room 2",
            status: "checked-in",
            symptoms: "Knee pain, difficulty walking",
            createdAt: "2024-11-04",
            duration: "45 mins"
        },
        {
            id: 3,
            appointmentId: "APT-2024-003",
            patientName: "Michael Brown",
            patientPhone: "+1234567892",
            patientEmail: "michael.brown@email.com",
            doctorName: "Dr. Emily Rodriguez",
            doctorSpecialization: "Pediatrician",
            date: "2024-11-08",
            time: "02:00 PM",
            room: "Room 3",
            status: "completed",
            symptoms: "Fever, cough",
            diagnosis: "Common cold, prescribed rest and fluids",
            createdAt: "2024-11-03",
            duration: "30 mins"
        },
        {
            id: 4,
            appointmentId: "APT-2024-004",
            patientName: "Sarah Wilson",
            patientPhone: "+1234567893",
            patientEmail: "sarah.wilson@email.com",
            doctorName: "Dr. James Wilson",
            doctorSpecialization: "Neurologist",
            date: "2024-11-09",
            time: "09:00 AM",
            room: "Room 1",
            status: "booked",
            symptoms: "Headaches, dizziness",
            createdAt: "2024-11-06",
            duration: "40 mins"
        },
        {
            id: 5,
            appointmentId: "APT-2024-005",
            patientName: "David Martinez",
            patientPhone: "+1234567894",
            patientEmail: "david.martinez@email.com",
            doctorName: "Dr. Sarah Johnson",
            doctorSpecialization: "Cardiologist",
            date: "2024-11-07",
            time: "03:00 PM",
            room: "Room 1",
            status: "cancelled",
            symptoms: "Regular checkup",
            createdAt: "2024-11-02",
            duration: "30 mins"
        },
        {
            id: 6,
            appointmentId: "APT-2024-006",
            patientName: "Lisa Anderson",
            patientPhone: "+1234567895",
            patientEmail: "lisa.anderson@email.com",
            doctorName: "Dr. Michael Chen",
            doctorSpecialization: "Orthopedic",
            date: "2024-11-08",
            time: "04:00 PM",
            room: "Room 2",
            status: "booked",
            symptoms: "Back pain",
            createdAt: "2024-11-05",
            duration: "30 mins"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('all');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const statusConfig = {
        booked: {
            label: 'Booked',
            color: 'bg-blue-100 text-blue-700 border-blue-200',
            icon: FaCalendarAlt,
            iconColor: 'text-blue-500'
        },
        'checked-in': {
            label: 'Checked In',
            color: 'bg-purple-100 text-purple-700 border-purple-200',
            icon: FaHourglassHalf,
            iconColor: 'text-purple-500'
        },
        completed: {
            label: 'Completed',
            color: 'bg-green-100 text-green-700 border-green-200',
            icon: FaCheckCircle,
            iconColor: 'text-green-500'
        },
        cancelled: {
            label: 'Cancelled',
            color: 'bg-red-100 text-red-700 border-red-200',
            icon: FaTimesCircle,
            iconColor: 'text-red-500'
        }
    };

    // Get unique doctors
    const doctors = ['all', ...new Set(appointments.map(apt => apt.doctorName))];

    // Filter appointments
    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch =
            apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.patientPhone.includes(searchTerm);

        const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;
        const matchesDate = !selectedDate || apt.date === selectedDate;
        const matchesDoctor = selectedDoctor === 'all' || apt.doctorName === selectedDoctor;

        return matchesSearch && matchesStatus && matchesDate && matchesDoctor;
    });

    // Pagination
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

    // Stats
    const stats = {
        total: appointments.length,
        booked: appointments.filter(a => a.status === 'booked').length,
        checkedIn: appointments.filter(a => a.status === 'checked-in').length,
        completed: appointments.filter(a => a.status === 'completed').length,
        cancelled: appointments.filter(a => a.status === 'cancelled').length,
        today: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length
    };

    const handleStatusChange = (appointmentId, newStatus) => {
        setAppointments(appointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        ));
    };

    const handleCancelAppointment = (appointment) => {
        setAppointmentToCancel(appointment);
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        setAppointments(appointments.map(apt =>
            apt.id === appointmentToCancel.id ? { ...apt, status: 'cancelled' } : apt
        ));
        setShowCancelModal(false);
        setAppointmentToCancel(null);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Appointments Management</h2>
                <p className="text-slate-600">Monitor and manage all clinic appointments</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                    <p className="text-blue-100 text-sm font-medium">Total Appointments</p>
                </div>

                <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaCheckCircle className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.completed}</p>
                        </div>
                    </div>
                    <p className="text-green-100 text-sm font-medium">Completed</p>
                </div>

                <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaHourglassHalf className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.checkedIn}</p>
                        </div>
                    </div>
                    <p className="text-purple-100 text-sm font-medium">Checked In</p>
                </div>

                <div className="bg-linear-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaClock className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.booked}</p>
                        </div>
                    </div>
                    <p className="text-sky-100 text-sm font-medium">Booked</p>
                </div>

                <div className="bg-linear-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaTimesCircle className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.cancelled}</p>
                        </div>
                    </div>
                    <p className="text-red-100 text-sm font-medium">Cancelled</p>
                </div>

                <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.today}</p>
                        </div>
                    </div>
                    <p className="text-orange-100 text-sm font-medium">Today's Appts</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <FaFilter className="text-blue-500 text-xl" />
                    <h3 className="text-lg font-semibold text-slate-800">Filters & Search</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by patient, doctor, ID, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="booked">Booked</option>
                            <option value="checked-in">Checked In</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        />
                    </div>

                    {/* Doctor Filter */}
                    <div>
                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        >
                            <option value="all">All Doctors</option>
                            {doctors.slice(1).map((doctor, idx) => (
                                <option key={idx} value={doctor}>{doctor}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <p className="text-slate-600">
                        Showing <span className="font-semibold text-slate-800">{filteredAppointments.length}</span> appointments
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium">
                        <FaDownload />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Appointments List */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                {paginatedAppointments.map((appointment) => {
                    const StatusIcon = statusConfig[appointment.status].icon;
                    return (
                        <div
                            key={appointment.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border-l-4"
                            style={{ borderLeftColor: statusConfig[appointment.status].iconColor.replace('text-', '') }}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                {/* Left Section - Appointment Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-slate-800">{appointment.appointmentId}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[appointment.status].color}`}>
                                                    {statusConfig[appointment.status].label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500">Booked on {appointment.createdAt}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* Patient Info */}
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaUser className="text-blue-500" />
                                                <p className="text-xs font-semibold text-slate-600 uppercase">Patient</p>
                                            </div>
                                            <p className="font-semibold text-slate-800">{appointment.patientName}</p>
                                            <p className="text-sm text-slate-600">{appointment.patientPhone}</p>
                                        </div>

                                        {/* Doctor Info */}
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaUserMd className="text-green-500" />
                                                <p className="text-xs font-semibold text-slate-600 uppercase">Doctor</p>
                                            </div>
                                            <p className="font-semibold text-slate-800">{appointment.doctorName}</p>
                                            <p className="text-sm text-slate-600">{appointment.doctorSpecialization}</p>
                                        </div>

                                        {/* Schedule Info */}
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaClock className="text-purple-500" />
                                                <p className="text-xs font-semibold text-slate-600 uppercase">Schedule</p>
                                            </div>
                                            <p className="font-semibold text-slate-800">{appointment.date}</p>
                                            <p className="text-sm text-slate-600">{appointment.time} ({appointment.duration})</p>
                                        </div>

                                        {/* Room Info */}
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MdRoom className="text-orange-500" />
                                                <p className="text-xs font-semibold text-slate-600 uppercase">Location</p>
                                            </div>
                                            <p className="font-semibold text-slate-800">{appointment.room}</p>
                                            <p className="text-sm text-slate-600">Consultation</p>
                                        </div>
                                    </div>

                                    {/* Symptoms */}
                                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                                        <div className="flex items-center gap-2 mb-1">
                                            <MdMedicalServices className="text-blue-600" />
                                            <p className="text-xs font-semibold text-blue-700 uppercase">Symptoms/Reason</p>
                                        </div>
                                        <p className="text-sm text-slate-700">{appointment.symptoms}</p>
                                    </div>

                                    {appointment.diagnosis && (
                                        <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <FaCheckCircle className="text-green-600" />
                                                <p className="text-xs font-semibold text-green-700 uppercase">Diagnosis</p>
                                            </div>
                                            <p className="text-sm text-slate-700">{appointment.diagnosis}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Right Section - Actions */}
                                <div className="flex lg:flex-col gap-2 justify-end">
                                    <button
                                        onClick={() => setSelectedAppointment(appointment)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                                    >
                                        <FaEye /> View Details
                                    </button>

                                    {appointment.status === 'booked' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(appointment.id, 'checked-in')}
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                                            >
                                                <FaCheckCircle /> Check In
                                            </button>
                                            <button
                                                onClick={() => handleCancelAppointment(appointment)}
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                                            >
                                                <FaBan /> Cancel
                                            </button>
                                        </>
                                    )}

                                    {appointment.status === 'checked-in' && (
                                        <button
                                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                                        >
                                            <FaCheckCircle /> Complete
                                        </button>
                                    )}

                                    {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
                                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 text-slate-600 rounded-xl cursor-not-allowed font-medium whitespace-nowrap">
                                            {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <FaChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${currentPage === idx + 1
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white border-2 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}

            {/* No Results */}
            {filteredAppointments.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <FaCalendarAlt className="text-6xl text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No appointments found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Appointment Detail Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center justify-between rounded-t-3xl">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{selectedAppointment.appointmentId}</h3>
                                <p className="text-blue-100">Appointment Details</p>
                            </div>
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                className="text-white hover:bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status Banner */}
                            <div className={`p-4 rounded-2xl border-2 ${statusConfig[selectedAppointment.status].color} flex items-center gap-3`}>
                                <div className={`p-3 bg-white rounded-xl ${statusConfig[selectedAppointment.status].iconColor}`}>
                                    {(() => {
                                        const Icon = statusConfig[selectedAppointment.status].icon;
                                        return <Icon className="text-2xl" />;
                                    })()}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{statusConfig[selectedAppointment.status].label}</p>
                                    <p className="text-sm opacity-80">Current appointment status</p>
                                </div>
                            </div>

                            {/* Patient & Doctor Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-blue-500 text-white p-3 rounded-xl">
                                            <FaUser className="text-xl" />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800">Patient Information</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Full Name</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.patientName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Phone Number</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.patientPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Email Address</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.patientEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-green-500 text-white p-3 rounded-xl">
                                            <FaUserMd className="text-xl" />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800">Doctor Information</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Doctor Name</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.doctorName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Specialization</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.doctorSpecialization}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Consultation Room</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.room}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Info */}
                            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-500 text-white p-3 rounded-xl">
                                        <FaClock className="text-xl" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">Schedule Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Appointment Date</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Time Slot</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Duration</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.duration}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Info */}
                            <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-orange-500 text-white p-3 rounded-xl">
                                        <MdMedicalServices className="text-xl" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800">Medical Information</h4>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Symptoms / Chief Complaint</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.symptoms}</p>
                                    </div>
                                    {selectedAppointment.diagnosis && (
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Diagnosis & Treatment</p>
                                            <p className="font-semibold text-slate-800">{selectedAppointment.diagnosis}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* System Info */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <h4 className="text-lg font-bold text-slate-800 mb-4">System Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Appointment ID</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.appointmentId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Booking Date</p>
                                        <p className="font-semibold text-slate-800">{selectedAppointment.createdAt}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                {selectedAppointment.status === 'booked' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedAppointment.id, 'checked-in');
                                                setSelectedAppointment(null);
                                            }}
                                            className="flex-1 bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                        >
                                            <FaCheckCircle /> Mark as Checked In
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAppointment(null);
                                                handleCancelAppointment(selectedAppointment);
                                            }}
                                            className="flex-1 bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                        >
                                            <FaBan /> Cancel Appointment
                                        </button>
                                    </>
                                )}
                                {selectedAppointment.status === 'checked-in' && (
                                    <button
                                        onClick={() => {
                                            handleStatusChange(selectedAppointment.id, 'completed');
                                            setSelectedAppointment(null);
                                        }}
                                        className="flex-1 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <FaCheckCircle /> Mark as Completed
                                    </button>
                                )}
                                {(selectedAppointment.status === 'completed' || selectedAppointment.status === 'cancelled') && (
                                    <button className="flex-1 bg-slate-200 text-slate-600 py-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                                        {selectedAppointment.status === 'completed' ? '✓ Completed' : '✗ Cancelled'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelModal && appointmentToCancel && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl transform scale-100 transition-all">
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaBan className="text-4xl text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Cancel Appointment</h3>
                                <p className="text-slate-600">
                                    Are you sure you want to cancel this appointment?
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Patient:</span>
                                    <span className="font-semibold text-slate-800">{appointmentToCancel.patientName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Doctor:</span>
                                    <span className="font-semibold text-slate-800">{appointmentToCancel.doctorName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Date & Time:</span>
                                    <span className="font-semibold text-slate-800">{appointmentToCancel.date} at {appointmentToCancel.time}</span>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <p className="text-sm text-red-800">
                                    ⚠️ This action cannot be undone. The patient will be notified about the cancellation.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="flex-1 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                                >
                                    Keep Appointment
                                </button>
                                <button
                                    onClick={confirmCancel}
                                    className="flex-1 bg-red-500 text-white py-3.5 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Yes, Cancel It
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;