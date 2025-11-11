import { useState } from "react";
import { Spin, message } from "antd";
import { MdOutlineInfo, MdVerified } from "react-icons/md";
import { FaCalendarAlt, FaClock, FaStar, FaBriefcase } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format, addMonths } from "date-fns";
import { useSelector } from "react-redux";

const generateTimeSlots = (startTime, endTime, interval = 30) => {
    const slots = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let currentMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    while (currentMinutes < endMinutes) {
        const hour = Math.floor(currentMinutes / 60);
        const min = currentMinutes % 60;
        const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(timeString);
        currentMinutes += interval;
    }

    return slots;
};

const isDayAvailable = (dateString, availableDays) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    return availableDays?.includes(dayName);
};

const getDoctorDetails = async (id) => {
    try {
        const res = await axios.get(`/doctors/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

const today = new Date();
const minDate = format(today, "yyyy-MM-dd");
const maxDate = format(addMonths(today, 1), "yyyy-MM-dd");

const DoctorDetails = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);

    const { docId } = useParams();
    const user = useSelector(state => state.auth.user);
    console.log(user);

    const { data: doctor, isLoading } = useQuery({
        queryKey: ["doctorDetails",],
        queryFn: () => getDoctorDetails(docId),
        refetchOnWindowFocus: false,
        retry: false
    });


    if (isLoading) {
        return <div className="min-h-[70vh] flex justify-center items-center">
            <Spin size="small" />
        </div>
    }

    const availability = doctor.availability || {};
    const isSelectedDateAvailable = selectedDate ? isDayAvailable(selectedDate, availability.days) : false;
    const timeSlots = isSelectedDateAvailable ? generateTimeSlots(availability.startTime, availability.endTime) : [];

    const handleBookAppointment = async () => {
        if (!user || user?.role !== "patient") return message.error("Please Login First");

        if (!selectedDate || !selectedTime) {
            message.error("Please select both date and time");
            return;
        }

        setBookingLoading(true);

        try {
            const res = await axios.post("/patient/create-appointment", {
                docId: doctor._id,
                patientId: user._id,
                date: selectedDate,
                time: selectedTime,
                patientDisease: "",
                status: "Booked"
            });
            console.log(res);

            message.success("Appointment booked successfully!");
            setSelectedTime(null);
            setSelectedDate(null);

        } catch (err) {
            console.log(err);
            message.error(err?.response?.data?.message || "Failed to book appointment");
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Doctor Profile Section */}
            <div className="flex flex-col sm:flex-row gap-8 mb-12">
                {/* Left - Image */}
                <div className="bg-linear-to-br from-[#6277FF] to-[#5065e6] flex-1 rounded-2xl flex justify-center items-end p-6 shadow-lg">
                    <img
                        src={doctor.imgUrl}
                        alt={doctor.user.fullName}
                        className="w-full max-w-xs drop-shadow-2xl"
                    />
                </div>

                {/* Right - Details */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                        {doctor.user.fullName}
                        <MdVerified className="text-blue-600 text-2xl" />
                    </h1>

                    <p className="text-[#6277FF] text-xl font-semibold mb-6">
                        {doctor.specialization}
                    </p>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                            <FaStar className="text-yellow-500" />
                            <span className="font-semibold text-gray-700">4.8 Rating</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                            <FaBriefcase className="text-blue-600" />
                            <span className="font-semibold text-gray-700">15+ Years Exp.</span>
                        </div>
                    </div>

                    {/* About */}
                    <div className="pt-4 border-t border-slate-200">
                        <p className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                            <MdOutlineInfo className="text-[#6277FF]" />
                            About Doctor
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            {doctor.about || 'Experienced healthcare professional dedicated to providing quality care.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaCalendarAlt className="text-[#6277FF]" />
                    Book an Appointment
                </h2>

                {/* Available Days Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                        📅 Available Days
                    </p>
                    <p className="text-blue-700 font-semibold">
                        {availability.days?.join(', ') || 'Not specified'}
                    </p>
                </div>

                {/* Date Input */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        Select Date
                    </label>
                    <input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 focus:border-[#6277FF] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime(null); // Reset time when date changes
                        }}
                        onKeyDown={(e) => e.preventDefault()} // ✅ typing disabled
                    />
                    {selectedDate && !isSelectedDateAvailable && (
                        <p className="text-red-600 text-sm mt-2">
                            ⚠️ Doctor is not available on this day. Please choose: {availability.days?.join(', ')}
                        </p>
                    )}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                    <div className="mb-6">
                        <label className="block mb-3 text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <FaClock className="text-gray-500" />
                            Select Time Slot
                        </label>

                        {isSelectedDateAvailable ? (
                            timeSlots.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`px-6 py-3 rounded-lg text-sm font-medium border-2 transition-all ${selectedTime === time
                                                ? "bg-[#6277FF] text-white border-[#6277FF] shadow-md scale-105"
                                                : "bg-white border-slate-300 text-gray-700 hover:border-[#6277FF] hover:bg-blue-50"
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-6 bg-slate-50 rounded-lg border border-slate-200">
                                    No time slots available
                                </p>
                            )
                        ) : (
                            <div className="text-center py-6 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-orange-700 font-medium">
                                    Please select an available day to see time slots
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Selected Info Summary */}
                {selectedDate && selectedTime && isSelectedDateAvailable && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-sm font-medium text-green-900 mb-2">✓ Appointment Details</p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-green-700">
                                <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="text-green-700">
                                <strong>Time:</strong> {selectedTime}
                            </span>
                        </div>
                    </div>
                )}

                {/* Book Button */}
                <button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || !isSelectedDateAvailable || bookingLoading}
                    className={`w-full py-4 disabled:cursor-not-allowed! rounded-lg text-white text-lg font-semibold transition-all shadow-md ${selectedDate && selectedTime && isSelectedDateAvailable && !bookingLoading
                        ? "bg-[#6277FF] hover:bg-[#5065e6] hover:shadow-lg"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {bookingLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Spin size="small" />
                            Booking...
                        </span>
                    ) : (
                        'Book Appointment'
                    )}
                </button>

                {!selectedDate && (
                    <p className="text-center text-gray-500 text-sm mt-4">
                        Please select a date to continue
                    </p>
                )}
            </div>
        </div>
    );
};

export default DoctorDetails;