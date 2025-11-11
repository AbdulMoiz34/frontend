import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaSearch, FaFilter, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaBan, FaEye, FaDownload } from 'react-icons/fa';
import { MdMedicalServices, MdEventAvailable } from 'react-icons/md';
import { Spin, message } from 'antd';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAppointments } from '../../api/dashboardApi';
import { format, startOfDay, isAfter, isEqual } from "date-fns";

const PatientAppointments = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const user = useSelector(state => state.auth.user);
    console.log(user.id);

    const { data: appointments, isLoading, error } = useQuery({
        queryKey: ["myAppointments"],
        queryFn: getAppointments
    })
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    console.log(appointments);
    const statusConfig = {
        'Booked': {
            color: 'bg-blue-100 text-blue-700 border-blue-300',
            icon: FaCalendarAlt,
            iconColor: 'text-blue-500',
            label: 'Booked'
        },
        'Checked-In': {
            color: 'bg-purple-100 text-purple-700 border-purple-300',
            icon: FaHourglassHalf,
            iconColor: 'text-purple-500',
            label: 'Checked In'
        },
        'Completed': {
            color: 'bg-green-100 text-green-700 border-green-300',
            icon: FaCheckCircle,
            iconColor: 'text-green-500',
            label: 'Completed'
        },
        'Cancelled': {
            color: 'bg-red-100 text-red-700 border-red-300',
            icon: FaTimesCircle,
            iconColor: 'text-red-500',
            label: 'Cancelled'
        }
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), "EEE, MMM d, yyyy");
    };

    const isUpcoming = (dateString) => {
        const appointmentDate = startOfDay(new Date(dateString));
        const today = startOfDay(new Date());

        return isAfter(appointmentDate, today) || isEqual(appointmentDate, today);
    };

    // Filter appointments
    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch = apt.doctor.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.patientDisease?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;

        const matchesFilter = selectedFilter === 'all' ||
            (selectedFilter === 'upcoming' && isUpcoming(apt.date)) ||
            (selectedFilter === 'past' && !isUpcoming(apt.date));

        return matchesSearch && matchesStatus && matchesFilter;
    });

    // Calculate stats
    const stats = {
        total: appointments.length,
        upcoming: appointments.filter(a => isUpcoming(a.date) && a.status !== 'Cancelled').length,
        completed: appointments.filter(a => a.status === 'Completed').length,
        cancelled: appointments.filter(a => a.status === 'Cancelled').length
    };

    const handleCancelAppointment = (appointmentId) => {
        message.success('Appointment cancelled successfully');
        console.log('Cancelling appointment:', appointmentId);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">My Appointments</h1>
                    <p className="text-slate-600">Manage your healthcare appointments in one place</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <FaCalendarAlt className="text-2xl" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.total}</p>
                        <p className="text-blue-100 text-sm">Total Appointments</p>
                    </div>

                    <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <MdEventAvailable className="text-2xl" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.upcoming}</p>
                        <p className="text-green-100 text-sm">Upcoming</p>
                    </div>

                    <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <FaCheckCircle className="text-2xl" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.completed}</p>
                        <p className="text-purple-100 text-sm">Completed</p>
                    </div>

                    <div className="bg-linear-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <FaTimesCircle className="text-2xl" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold mb-1">{stats.cancelled}</p>
                        <p className="text-red-100 text-sm">Cancelled</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <FaFilter className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-slate-800">Filter Appointments</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search doctor, specialization..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                                <option value="Booked">Booked</option>
                                <option value="Checked-In">Checked In</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Time Filter */}
                        <div>
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            >
                                <option value="all">All Time</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                        <p className="text-slate-600">
                            Showing <span className="font-semibold text-slate-800">{filteredAppointments.length}</span> of{' '}
                            <span className="font-semibold text-slate-800">{appointments.length}</span> appointments
                        </p>
                    </div>
                </div>

                {/* Appointments List */}
                {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment) => {
                            const StatusIcon = statusConfig[appointment.status].icon;
                            const upcoming = isUpcoming(appointment.date);

                            return (
                                <div
                                    key={appointment._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border-l-4"
                                    style={{ borderLeftColor: statusConfig[appointment.status].iconColor.replace('text-', '#') }}
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Doctor Image */}
                                        <div className="shrink-0">
                                            <img
                                                src={appointment.doctor.imgUrl || 'https://via.placeholder.com/150'}
                                                alt={appointment.doctor.fullName}
                                                className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-100"
                                            />
                                        </div>

                                        {/* Appointment Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-800 mb-1">
                                                        {appointment.doctor.fullName || 'Doctor Name'}
                                                    </h3>
                                                    <p className="text-blue-600 font-semibold">
                                                        {appointment.doctor.specialization}
                                                    </p>
                                                </div>
                                                <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 flex items-center gap-2 ${statusConfig[appointment.status].color}`}>
                                                    <StatusIcon />
                                                    {statusConfig[appointment.status].label}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                                                    <FaCalendarAlt className="text-blue-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Date</p>
                                                        <p className="font-semibold text-slate-800">{formatDate(appointment.date)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                                                    <FaClock className="text-purple-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Time</p>
                                                        <p className="font-semibold text-slate-800">{appointment.time}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                                                    <MdMedicalServices className="text-green-500 text-lg" />
                                                    <div>
                                                        <p className="text-xs text-slate-500">Appointment ID</p>
                                                        <p className="font-semibold text-slate-800 text-xs">
                                                            #{appointment._id.slice(-8)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {appointment.patientDisease && (
                                                <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                                                    <p className="text-xs font-semibold text-blue-700 mb-1">Reason for Visit</p>
                                                    <p className="text-sm text-slate-700">{appointment.patientDisease}</p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium text-sm">
                                                    <FaEye />
                                                    View Details
                                                </button>

                                                {upcoming && appointment.status !== 'Cancelled' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleCancelAppointment(appointment._id)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all font-medium text-sm"
                                                        >
                                                            <FaBan />
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}

                                                {appointment.status === 'Completed' && (
                                                    <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-all font-medium text-sm">
                                                        <FaDownload />
                                                        Download Report
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <FaCalendarAlt className="text-6xl text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">No appointments found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your filters or book a new appointment</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientAppointments;