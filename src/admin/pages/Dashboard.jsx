import { FaUserDoctor, FaCalendarCheck, FaUsers, FaClock } from 'react-icons/fa6';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Doctors",
      value: "24",
      change: "+2",
      trend: "up",
      icon: <FaUserDoctor />,
      color: "blue",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      title: "Total Appointments",
      value: "156",
      change: "+12",
      trend: "up",
      icon: <FaCalendarCheck />,
      color: "green",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      title: "Total Patients",
      value: "892",
      change: "+48",
      trend: "up",
      icon: <FaUsers />,
      color: "purple",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600"
    },
    {
      title: "Pending Today",
      value: "18",
      change: "-3",
      trend: "down",
      icon: <FaClock />,
      color: "orange",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
      textColor: "text-orange-600"
    }
  ];

  const latestAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      doctor: "Dr. Michael Chen",
      time: "09:00 AM",
      date: "Today",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      patient: "John Smith",
      doctor: "Dr. Emily Parker",
      time: "10:30 AM",
      date: "Today",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 3,
      patient: "Maria Garcia",
      doctor: "Dr. James Wilson",
      time: "11:00 AM",
      date: "Today",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 4,
      patient: "David Brown",
      doctor: "Dr. Sarah Anderson",
      time: "02:00 PM",
      date: "Today",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-700"
    },
    {
      id: 5,
      patient: "Lisa Martinez",
      doctor: "Dr. Michael Chen",
      time: "03:30 PM",
      date: "Today",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <HiTrendingUp /> : <HiTrendingDown />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* Latest Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Latest Appointments</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Doctor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{appointment.patient}</p>
                          <p className="text-xs text-slate-500">{appointment.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-700">{appointment.doctor}</td>
                    <td className="py-4 px-4 text-sm text-slate-700 font-medium">{appointment.time}</td>
                    <td className="py-4 px-4">
                      <span className={`${appointment.statusColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="text-lg font-bold mb-2">Schedule Appointment</h3>
          <p className="text-blue-100 text-sm">Book new appointments for patients</p>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">👨‍⚕️</div>
          <h3 className="text-lg font-bold mb-2">Add Doctor</h3>
          <p className="text-green-100 text-sm">Register new doctors to the system</p>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="text-lg font-bold mb-2">Manage Patients</h3>
          <p className="text-purple-100 text-sm">View and update patient records</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;