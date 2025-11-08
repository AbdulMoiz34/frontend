import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaCheckCircle, FaHourglassHalf, FaChartLine, FaStar, FaBell, FaUserMd, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { MdSchedule, MdEventAvailable, MdRoom, MdMedicalServices } from 'react-icons/md';

const DoctorDashboard = () => {
    // Mock doctor data - Replace with actual API call
    const [doctor] = useState({
        fullName: "Dr. Sarah Johnson",
        specialization: "Cardiologist",
        qualification: "MBBS, MD Cardiology",
        email: "sarah.johnson@clinic.com",
        phone: "+1234567890",
        address: "123 Medical Street, City",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
        experience: 12,
        rating: 4.8,
        totalReviews: 245,
        schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            startTime: "09:00",
            endTime: "17:00",
            room: "Room 1"
        }
    });

    const [appointments] = useState([
        {
            id: 1,
            patientName: "John Smith",
            patientAge: 45,
            patientGender: "Male",
            time: "10:00 AM",
            duration: "30 mins",
            type: "Check-up",
            status: "checked-in",
            symptoms: "Chest pain, shortness of breath",
            room: "Room 1"
        },
        {
            id: 2,
            patientName: "Emily Davis",
            patientAge: 32,
            patientGender: "Female",
            time: "11:00 AM",
            duration: "45 mins",
            type: "Follow-up",
            status: "upcoming",
            symptoms: "High blood pressure monitoring",
            room: "Room 1"
        },
        {
            id: 3,
            patientName: "Michael Brown",
            patientAge: 58,
            patientGender: "Male",
            time: "02:00 PM",
            duration: "30 mins",
            type: "Consultation",
            status: "upcoming",
            symptoms: "Regular heart checkup",
            room: "Room 1"
        },
        {
            id: 4,
            patientName: "Sarah Wilson",
            patientAge: 41,
            patientGender: "Female",
            time: "03:30 PM",
            duration: "40 mins",
            type: "Emergency",
            status: "upcoming",
            symptoms: "Irregular heartbeat",
            room: "Room 1"
        }
    ]);

    const [recentPatients] = useState([
        {
            id: 1,
            name: "David Martinez",
            date: "2024-11-07",
            diagnosis: "Hypertension - prescribed medication",
            followUp: "2 weeks"
        },
        {
            id: 2,
            name: "Lisa Anderson",
            date: "2024-11-07",
            diagnosis: "Regular checkup - All normal",
            followUp: "6 months"
        },
        {
            id: 3,
            name: "Robert Kumar",
            date: "2024-11-06",
            diagnosis: "Coronary artery disease - referred to specialist",
            followUp: "1 week"
        }
    ]);

    // Stats
    const stats = {
        todayAppointments: appointments.length,
        checkedIn: appointments.filter(a => a.status === 'checked-in').length,
        completed: 156,
        totalPatients: 245
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            Welcome back, {doctor.fullName.split(' ')[1]}! 👋
                        </h1>
                        <p className="text-slate-600 flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" />
                            {getCurrentDate()}
                            <span className="mx-2">•</span>
                            <FaClock className="text-purple-500" />
                            {getCurrentTime()}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            <FaBell className="text-xl text-slate-600" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-md p-3">
                            <img
                                src={doctor.image}
                                alt={doctor.fullName}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div>
                                <p className="font-semibold text-slate-800">{doctor.fullName}</p>
                                <p className="text-sm text-slate-500">{doctor.specialization}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.todayAppointments}</p>
                        </div>
                    </div>
                    <p className="text-blue-100 font-medium">Today's Appointments</p>
                    <p className="text-blue-200 text-sm mt-1">4 scheduled</p>
                </div>

                <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaHourglassHalf className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.checkedIn}</p>
                        </div>
                    </div>
                    <p className="text-purple-100 font-medium">Currently Waiting</p>
                    <p className="text-purple-200 text-sm mt-1">Ready for consultation</p>
                </div>

                <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaCheckCircle className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.completed}</p>
                        </div>
                    </div>
                    <p className="text-green-100 font-medium">Completed Today</p>
                    <p className="text-green-200 text-sm mt-1">This month</p>
                </div>

                <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FaUser className="text-2xl" />
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.totalPatients}</p>
                        </div>
                    </div>
                    <p className="text-orange-100 font-medium">Total Patients</p>
                    <p className="text-orange-200 text-sm mt-1">All time</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Today's Schedule */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-500" />
                                Today's Schedule
                            </h2>
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold text-sm">
                                {appointments.length} Appointments
                            </span>
                        </div>

                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className={`rounded-2xl p-5 border-2 transition-all hover:shadow-md ${appointment.status === 'checked-in'
                                            ? 'bg-linear-to-r from-purple-50 to-purple-100 border-purple-300'
                                            : 'bg-linear-to-r from-blue-50 to-slate-50 border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                                <FaUser className="text-2xl text-blue-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-lg">
                                                    {appointment.patientName}
                                                </h3>
                                                <p className="text-sm text-slate-600">
                                                    {appointment.patientAge} yrs • {appointment.patientGender}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${appointment.status === 'checked-in'
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-blue-500 text-white'
                                                }`}
                                        >
                                            {appointment.status === 'checked-in' ? '🔔 Waiting' : '⏰ Upcoming'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <FaClock className="text-slate-400" />
                                            <span className="font-medium">{appointment.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MdSchedule className="text-slate-400" />
                                            <span>{appointment.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MdRoom className="text-slate-400" />
                                            <span>{appointment.room}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MdMedicalServices className="text-slate-400" />
                                            <span className="font-medium">{appointment.type}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-3 mb-3 border border-slate-200">
                                        <p className="text-xs font-semibold text-slate-600 mb-1">Chief Complaint:</p>
                                        <p className="text-sm text-slate-700">{appointment.symptoms}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        {appointment.status === 'checked-in' ? (
                                            <button className="flex-1 bg-linear-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md">
                                                Start Consultation
                                            </button>
                                        ) : (
                                            <button className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md">
                                                View Details
                                            </button>
                                        )}
                                        <button className="px-4 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-all">
                                            Reschedule
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Doctor Profile Card */}
                    <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="text-center mb-4">
                            <img
                                src={doctor.image}
                                alt={doctor.fullName}
                                className="w-24 h-24 rounded-2xl mx-auto mb-4 border-4 border-white/30 object-cover"
                            />
                            <h3 className="text-xl font-bold mb-1">{doctor.fullName}</h3>
                            <p className="text-blue-100">{doctor.specialization}</p>
                            <p className="text-sm text-blue-200 mt-1">{doctor.qualification}</p>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <FaBriefcase className="text-blue-200" />
                                <span>{doctor.experience} years experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FaStar className="text-yellow-300" />
                                <span>{doctor.rating} Rating ({doctor.totalReviews} reviews)</span>
                            </div>
                        </div>

                        <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                            Edit Profile
                        </button>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <MdSchedule className="text-purple-500" />
                            Your Schedule
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCalendarAlt className="text-purple-500" />
                                    <p className="font-semibold text-slate-800">Working Days</p>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {doctor.schedule.days.map((day, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-semibold"
                                        >
                                            {day.slice(0, 3)}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                    <FaClock className="text-slate-400" />
                                    <span>{doctor.schedule.startTime} - {doctor.schedule.endTime}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <MdRoom className="text-slate-400" />
                                    <span>{doctor.schedule.room}</span>
                                </div>
                            </div>

                            <button className="w-full bg-linear-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md">
                                Manage Availability
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
                                <FaCalendarAlt />
                                View All Appointments
                            </button>
                            <button className="w-full bg-green-50 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-100 transition-all flex items-center justify-center gap-2">
                                <FaUser />
                                Patient Records
                            </button>
                            <button className="w-full bg-purple-50 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-all flex items-center justify-center gap-2">
                                <FaChartLine />
                                Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <FaUserMd className="text-green-500" />
                    Recent Consultations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentPatients.map((patient) => (
                        <div
                            key={patient.id}
                            className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{patient.name}</h3>
                                    <p className="text-xs text-slate-500">{patient.date}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-3 mb-3 border border-slate-200">
                                <p className="text-xs font-semibold text-slate-600 mb-1">Diagnosis:</p>
                                <p className="text-sm text-slate-700">{patient.diagnosis}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">Follow-up:</span>
                                <span className="font-semibold text-blue-600">{patient.followUp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;