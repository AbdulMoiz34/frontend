import { useState } from 'react';
import { FaSearch, FaUserMd, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEdit, FaTrash, FaEye, FaPhone, FaEnvelope, FaBriefcase, FaMapMarkerAlt, FaToggleOn, FaToggleOff, FaPlus, FaFilter, FaChartLine } from 'react-icons/fa';
import { MdSchedule, MdEventAvailable, MdEventBusy, MdRoom } from 'react-icons/md';

const Doctors = () => {
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            fullName: "Dr. Sarah Johnson",
            email: "sarah.johnson@clinic.com",
            phone: "+1234567890",
            specialization: "Cardiologist",
            gender: "female",
            address: "123 Medical Street, City",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
            accountStatus: "active",
            availabilityStatus: "available",
            currentPatients: 3,
            todayAppointments: 8,
            totalAppointments: 245,
            rating: 4.8,
            schedule: [
                { day: "Monday", startTime: "09:00", endTime: "17:00", room: "Room 1" },
                { day: "Wednesday", startTime: "09:00", endTime: "17:00", room: "Room 1" },
                { day: "Friday", startTime: "09:00", endTime: "14:00", room: "Room 1" }
            ]
        },
        {
            id: 2,
            fullName: "Dr. Michael Chen",
            email: "michael.chen@clinic.com",
            phone: "+1234567891",
            specialization: "Orthopedic",
            experience: 8,
            qualification: "MBBS, MS Orthopedics",
            licenseNumber: "LIC789013",
            gender: "male",
            address: "456 Health Avenue, City",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
            accountStatus: "active",
            availabilityStatus: "busy",
            currentPatients: 1,
            todayAppointments: 5,
            totalAppointments: 189,
            rating: 4.6,
            schedule: [
                { day: "Tuesday", startTime: "10:00", endTime: "18:00", room: "Room 2" },
                { day: "Thursday", startTime: "10:00", endTime: "18:00", room: "Room 2" },
                { day: "Saturday", startTime: "09:00", endTime: "13:00", room: "Room 2" }
            ]
        },
        {
            id: 3,
            fullName: "Dr. Emily Rodriguez",
            email: "emily.rodriguez@clinic.com",
            phone: "+1234567892",
            specialization: "Pediatrician",
            experience: 15,
            qualification: "MBBS, MD Pediatrics",
            licenseNumber: "LIC789014",
            gender: "female",
            address: "789 Care Road, City",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
            accountStatus: "active",
            availabilityStatus: "on-leave",
            currentPatients: 0,
            todayAppointments: 0,
            totalAppointments: 412,
            rating: 4.9,
            schedule: [
                { day: "Monday", startTime: "08:00", endTime: "16:00", room: "Room 3" },
                { day: "Tuesday", startTime: "08:00", endTime: "16:00", room: "Room 3" },
                { day: "Thursday", startTime: "08:00", endTime: "16:00", room: "Room 3" }
            ]
        },
        {
            id: 4,
            fullName: "Dr. James Wilson",
            email: "james.wilson@clinic.com",
            phone: "+1234567893",
            specialization: "Neurologist",
            experience: 10,
            qualification: "MBBS, DM Neurology",
            licenseNumber: "LIC789015",
            gender: "male",
            address: "321 Wellness Blvd, City",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
            accountStatus: "inactive",
            availabilityStatus: "offline",
            currentPatients: 0,
            todayAppointments: 0,
            totalAppointments: 167,
            rating: 4.5,
            schedule: [
                { day: "Wednesday", startTime: "11:00", endTime: "19:00", room: "Room 4" },
                { day: "Friday", startTime: "11:00", endTime: "19:00", room: "Room 4" }
            ]
        },
        {
            id: 5,
            fullName: "Dr. Amanda Foster",
            email: "amanda.foster@clinic.com",
            phone: "+1234567894",
            specialization: "Dermatologist",
            experience: 7,
            qualification: "MBBS, MD Dermatology",
            licenseNumber: "LIC789016",
            gender: "female",
            address: "555 Skin Care Lane, City",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
            accountStatus: "active",
            availabilityStatus: "available",
            currentPatients: 2,
            todayAppointments: 6,
            totalAppointments: 198,
            rating: 4.7,
            schedule: [
                { day: "Monday", startTime: "10:00", endTime: "18:00", room: "Room 3" },
                { day: "Wednesday", startTime: "10:00", endTime: "18:00", room: "Room 2" },
                { day: "Friday", startTime: "10:00", endTime: "15:00", room: "Room 3" }
            ]
        },
        {
            id: 6,
            fullName: "Dr. Robert Kumar",
            email: "robert.kumar@clinic.com",
            phone: "+1234567895",
            specialization: "General Physician",
            experience: 20,
            qualification: "MBBS, MD Medicine",
            licenseNumber: "LIC789017",
            gender: "male",
            address: "888 Health Street, City",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
            accountStatus: "active",
            availabilityStatus: "available",
            currentPatients: 4,
            todayAppointments: 12,
            totalAppointments: 856,
            rating: 4.9,
            schedule: [
                { day: "Monday", startTime: "08:00", endTime: "20:00", room: "Room 4" },
                { day: "Tuesday", startTime: "08:00", endTime: "20:00", room: "Room 4" },
                { day: "Wednesday", startTime: "08:00", endTime: "20:00", room: "Room 4" },
                { day: "Thursday", startTime: "08:00", endTime: "20:00", room: "Room 4" },
                { day: "Friday", startTime: "08:00", endTime: "20:00", room: "Room 4" }
            ]
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccountStatus, setSelectedAccountStatus] = useState('all');
    const [selectedAvailability, setSelectedAvailability] = useState('all');
    const [selectedSpecialization, setSelectedSpecialization] = useState('all');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [viewMode, setViewMode] = useState('cards');

    const availabilityConfig = {
        available: {
            label: 'Available',
            color: 'bg-green-100 text-green-700 border-green-300',
            icon: FaCheckCircle,
            iconColor: 'text-green-500',
            bgGradient: 'from-green-50 to-green-100'
        },
        busy: {
            label: 'Busy',
            color: 'bg-orange-100 text-orange-700 border-orange-300',
            icon: FaHourglassHalf,
            iconColor: 'text-orange-500',
            bgGradient: 'from-orange-50 to-orange-100'
        },
        'on-leave': {
            label: 'On Leave',
            color: 'bg-purple-100 text-purple-700 border-purple-300',
            icon: MdEventBusy,
            iconColor: 'text-purple-500',
            bgGradient: 'from-purple-50 to-purple-100'
        },
        offline: {
            label: 'Offline',
            color: 'bg-slate-100 text-slate-700 border-slate-300',
            icon: FaTimesCircle,
            iconColor: 'text-slate-500',
            bgGradient: 'from-slate-50 to-slate-100'
        }
    };

    const specializations = ['all', 'Cardiologist', 'Orthopedic', 'Pediatrician', 'Neurologist', 'Dermatologist', 'General Physician'];

    // Filter doctors
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = 
            doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesAccountStatus = selectedAccountStatus === 'all' || doctor.accountStatus === selectedAccountStatus;
        const matchesAvailability = selectedAvailability === 'all' || doctor.availabilityStatus === selectedAvailability;
        const matchesSpecialization = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;

        return matchesSearch && matchesAccountStatus && matchesAvailability && matchesSpecialization;
    });

    // Stats
    const stats = {
        total: doctors.length,
        active: doctors.filter(d => d.accountStatus === 'active').length,
        inactive: doctors.filter(d => d.accountStatus === 'inactive').length,
        available: doctors.filter(d => d.availabilityStatus === 'available').length,
        busy: doctors.filter(d => d.availabilityStatus === 'busy').length,
        onLeave: doctors.filter(d => d.availabilityStatus === 'on-leave').length
    };

    const toggleAccountStatus = (doctorId) => {
        setDoctors(doctors.map(doc =>
            doc.id === doctorId
                ? { ...doc, accountStatus: doc.accountStatus === 'active' ? 'inactive' : 'active' }
                : doc
        ));
    };

    const changeAvailabilityStatus = (doctorId, newStatus) => {
        setDoctors(doctors.map(doc =>
            doc.id === doctorId ? { ...doc, availabilityStatus: newStatus } : doc
        ));
    };

    const handleDelete = (doctor) => {
        setDoctorToDelete(doctor);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setDoctors(doctors.filter(d => d.id !== doctorToDelete.id));
        setShowDeleteModal(false);
        setDoctorToDelete(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl">
                        <FaUserMd className="text-white text-3xl" />
                    </div>
                    Doctor Availability & Status
                </h2>
                <p className="text-slate-600 ml-16">Monitor doctor availability, manage schedules and account status</p>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaUserMd className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.total}</p>
                    <p className="text-blue-100 text-sm font-medium">Total Doctors</p>
                </div>

                <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaCheckCircle className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.active}</p>
                    <p className="text-green-100 text-sm font-medium">Active Accounts</p>
                </div>

                <div className="bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <MdEventAvailable className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.available}</p>
                    <p className="text-emerald-100 text-sm font-medium">Available Now</p>
                </div>

                <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaHourglassHalf className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.busy}</p>
                    <p className="text-orange-100 text-sm font-medium">Currently Busy</p>
                </div>

                <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <MdEventBusy className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.onLeave}</p>
                    <p className="text-purple-100 text-sm font-medium">On Leave</p>
                </div>

                <div className="bg-linear-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaTimesCircle className="text-2xl" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.inactive}</p>
                    <p className="text-red-100 text-sm font-medium">Inactive</p>
                </div>
            </div>

            {/* Filters */}
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
                                placeholder="Search doctors by name, email, specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Account Status */}
                    <div>
                        <select
                            value={selectedAccountStatus}
                            onChange={(e) => setSelectedAccountStatus(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        >
                            <option value="all">All Accounts</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Availability */}
                    <div>
                        <select
                            value={selectedAvailability}
                            onChange={(e) => setSelectedAvailability(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        >
                            <option value="all">All Availability</option>
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="on-leave">On Leave</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>

                    {/* Specialization */}
                    <div>
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        >
                            {specializations.map((spec, idx) => (
                                <option key={idx} value={spec}>
                                    {spec === 'all' ? 'All Specializations' : spec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <p className="text-slate-600">
                        Showing <span className="font-semibold text-slate-800">{filteredDoctors.length}</span> of{' '}
                        <span className="font-semibold text-slate-800">{doctors.length}</span> doctors
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                viewMode === 'cards'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Cards
                        </button>
                        <button
                            onClick={() => setViewMode('compact')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                viewMode === 'compact'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Compact
                        </button>
                    </div>
                </div>
            </div>

            {/* Doctors List */}
            {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => {
                        const AvailIcon = availabilityConfig[doctor.availabilityStatus].icon;
                        return (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-slate-100"
                            >
                                {/* Header with Image */}
                                <div className="relative h-48">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                                            doctor.accountStatus === 'active'
                                                ? 'bg-green-100 text-green-700 border-green-300'
                                                : 'bg-red-100 text-red-700 border-red-300'
                                        }`}>
                                            {doctor.accountStatus === 'active' ? '✓ Active' : '✗ Inactive'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 backdrop-blur-sm ${availabilityConfig[doctor.availabilityStatus].color}`}>
                                            <AvailIcon className="inline mr-2" />
                                            {availabilityConfig[doctor.availabilityStatus].label}
                                        </span>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.fullName}</h3>
                                    <p className="text-blue-600 font-semibold mb-4">{doctor.specialization}</p>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className={`bg-linear-to-br ${availabilityConfig[doctor.availabilityStatus].bglinear} rounded-xl p-3 border border-slate-200`}>
                                            <p className="text-xs text-slate-600 mb-1">Current</p>
                                            <p className="text-2xl font-bold text-slate-800">{doctor.currentPatients}</p>
                                        </div>
                                        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                                            <p className="text-xs text-slate-600 mb-1">Today</p>
                                            <p className="text-2xl font-bold text-slate-800">{doctor.todayAppointments}</p>
                                        </div>
                                        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
                                            <p className="text-xs text-slate-600 mb-1">Total</p>
                                            <p className="text-2xl font-bold text-slate-800">{doctor.totalAppointments}</p>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <FaBriefcase className="text-slate-400" />
                                            <span>{doctor.experience} years • {doctor.qualification}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <FaPhone className="text-slate-400" />
                                            <span>{doctor.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <FaEnvelope className="text-slate-400" />
                                            <span className="truncate">{doctor.email}</span>
                                        </div>
                                    </div>

                                    {/* Schedule Preview */}
                                    <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MdSchedule className="text-blue-500" />
                                            <p className="text-xs font-semibold text-slate-700 uppercase">Weekly Schedule</p>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {doctor.schedule.map((sched, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                                    {sched.day.slice(0, 3)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedDoctor(doctor)}
                                            className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl hover:bg-blue-600 transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                        >
                                            <FaEye /> Details
                                        </button>
                                        <button
                                            onClick={() => toggleAccountStatus(doctor.id)}
                                            className={`flex-1 py-2.5 rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                                                doctor.accountStatus === 'active'
                                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                        >
                                            {doctor.accountStatus === 'active' ? <FaToggleOff /> : <FaToggleOn />}
                                            {doctor.accountStatus === 'active' ? 'Disable' : 'Enable'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor)}
                                            className="bg-red-500 text-white px-4 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredDoctors.map((doctor) => {
                        const AvailIcon = availabilityConfig[doctor.availabilityStatus].icon;
                        return (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-slate-100"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Image */}
                                    <img
                                        src={doctor.image}
                                        alt={doctor.fullName}
                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-100"
                                    />

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.fullName}</h3>
                                                <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                                                    doctor.accountStatus === 'active'
                                                        ? 'bg-green-100 text-green-700 border-green-300'
                                                        : 'bg-red-100 text-red-700 border-red-300'
                                                }`}>
                                                    {doctor.accountStatus === 'active' ? '✓ Active' : '✗ Inactive'}
                                                </span>
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${availabilityConfig[doctor.availabilityStatus].color}`}>
                                                    <AvailIcon className="inline mr-1" />
                                                    {availabilityConfig[doctor.availabilityStatus].label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-4 mb-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaBriefcase className="text-slate-400" />
                                                <span className="text-slate-700">{doctor.experience} yrs</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaPhone className="text-slate-400" />
                                                <span className="text-slate-700">{doctor.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaChartLine className="text-slate-400" />
                                                <span className="text-slate-700">{doctor.totalAppointments} total</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaClock className="text-slate-400" />
                                                <span className="text-slate-700">{doctor.todayAppointments} today</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaUserMd className="text-slate-400" />
                                                <span className="text-slate-700">{doctor.currentPatients} current</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedDoctor(doctor)}
                                            className="px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-semibold text-sm flex items-center gap-2 shadow-md"
                                        >
                                            <FaEye /> View
                                        </button>
                                        <button
                                            onClick={() => toggleAccountStatus(doctor.id)}
                                            className={`px-4 py-2.5 rounded-xl transition-all font-semibold text-sm flex items-center gap-2 shadow-md ${
                                                doctor.accountStatus === 'active'
                                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                        >
                                            {doctor.accountStatus === 'active' ? <FaToggleOff /> : <FaToggleOn />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor)}
                                            className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* No Results */}
            {filteredDoctors.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <FaUserMd className="text-6xl text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No doctors found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Doctor Detail Modal */}
            {selectedDoctor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Header */}
                        <div className="sticky top-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 flex items-center justify-between rounded-t-3xl">
                            <div className="flex items-center gap-4">
                                <img
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.fullName}
                                    className="w-20 h-20 rounded-2xl border-4 border-white/30 object-cover"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">{selectedDoctor.fullName}</h3>
                                    <p className="text-white/90">{selectedDoctor.specialization}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedDoctor(null)}
                                className="text-white hover:bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl border-2 ${
                                    selectedDoctor.accountStatus === 'active'
                                        ? 'bg-green-50 border-green-300'
                                        : 'bg-red-50 border-red-300'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl ${
                                            selectedDoctor.accountStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                            {selectedDoctor.accountStatus === 'active' ? (
                                                <FaCheckCircle className="text-white text-2xl" />
                                            ) : (
                                                <FaTimesCircle className="text-white text-2xl" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-800">
                                                {selectedDoctor.accountStatus === 'active' ? 'Active' : 'Inactive'}
                                            </p>
                                            <p className="text-sm text-slate-600">Account Status</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-2xl border-2 ${availabilityConfig[selectedDoctor.availabilityStatus].color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl ${availabilityConfig[selectedDoctor.availabilityStatus].iconColor.replace('text-', 'bg-')}`}>
                                            {(() => {
                                                const Icon = availabilityConfig[selectedDoctor.availabilityStatus].icon;
                                                return <Icon className="text-white text-2xl" />;
                                            })()}
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-800">
                                                {availabilityConfig[selectedDoctor.availabilityStatus].label}
                                            </p>
                                            <p className="text-sm text-slate-600">Availability Status</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Change Availability */}
                            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <MdSchedule className="text-purple-500" />
                                    Update Availability Status
                                </h4>
                                <div className="grid grid-cols-4 gap-3">
                                    {Object.keys(availabilityConfig).map((status) => {
                                        const Icon = availabilityConfig[status].icon;
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => changeAvailabilityStatus(selectedDoctor.id, status)}
                                                className={`p-4 rounded-xl border-2 transition-all ${
                                                    selectedDoctor.availabilityStatus === status
                                                        ? availabilityConfig[status].color + ' shadow-lg'
                                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                                }`}
                                            >
                                                <Icon className={`text-2xl mx-auto mb-2 ${
                                                    selectedDoctor.availabilityStatus === status
                                                        ? availabilityConfig[status].iconColor
                                                        : 'text-slate-400'
                                                }`} />
                                                <p className={`text-sm font-semibold ${
                                                    selectedDoctor.availabilityStatus === status
                                                        ? 'text-slate-800'
                                                        : 'text-slate-600'
                                                }`}>
                                                    {availabilityConfig[status].label}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-blue-500 p-3 rounded-xl">
                                            <FaUserMd className="text-white text-xl" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-800 mb-1">{selectedDoctor.currentPatients}</p>
                                    <p className="text-sm text-slate-600">Current Patients</p>
                                </div>

                                <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-green-500 p-3 rounded-xl">
                                            <FaCalendarAlt className="text-white text-xl" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-800 mb-1">{selectedDoctor.todayAppointments}</p>
                                    <p className="text-sm text-slate-600">Today's Appointments</p>
                                </div>

                                <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-purple-500 p-3 rounded-xl">
                                            <FaChartLine className="text-white text-xl" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-slate-800 mb-1">{selectedDoctor.totalAppointments}</p>
                                    <p className="text-sm text-slate-600">Total Appointments</p>
                                </div>
                            </div>

                            {/* Contact & Professional Info */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <FaEnvelope className="text-orange-500" />
                                        Contact Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Email</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Phone</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Address</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200">
                                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <FaBriefcase className="text-teal-500" />
                                        Professional Details
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Qualification</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.qualification}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">Experience</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.experience} years</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 mb-1">License Number</p>
                                            <p className="font-semibold text-slate-800">{selectedDoctor.licenseNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Schedule */}
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
                                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <MdSchedule className="text-indigo-500" />
                                    Weekly Schedule
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {selectedDoctor.schedule.map((sched, idx) => (
                                        <div key={idx} className="bg-white rounded-xl p-4 border border-indigo-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaCalendarAlt className="text-indigo-500" />
                                                <p className="font-bold text-slate-800">{sched.day}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                                <FaClock className="text-slate-400" />
                                                <span>{sched.startTime} - {sched.endTime}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MdRoom className="text-slate-400" />
                                                <span>{sched.room}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => toggleAccountStatus(selectedDoctor.id)}
                                    className={`flex-1 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                                        selectedDoctor.accountStatus === 'active'
                                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                                            : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                                >
                                    {selectedDoctor.accountStatus === 'active' ? <FaToggleOff /> : <FaToggleOn />}
                                    {selectedDoctor.accountStatus === 'active' ? 'Deactivate Account' : 'Activate Account'}
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedDoctor(null);
                                        handleDelete(selectedDoctor);
                                    }}
                                    className="flex-1 bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaTrash /> Delete Doctor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && doctorToDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaTrash className="text-4xl text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Delete Doctor</h3>
                                <p className="text-slate-600">
                                    Are you sure you want to permanently delete this doctor?
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={doctorToDelete.image}
                                        alt={doctorToDelete.fullName}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="font-bold text-slate-800">{doctorToDelete.fullName}</p>
                                        <p className="text-sm text-slate-600">{doctorToDelete.specialization}</p>
                                        <p className="text-xs text-slate-500">{doctorToDelete.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <p className="text-sm text-red-800 font-medium">
                                    ⚠️ Warning: This action cannot be undone. All appointments, schedules, and patient records associated with this doctor will be affected.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-500 text-white py-3.5 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;