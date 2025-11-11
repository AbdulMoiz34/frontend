import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCalendar, FaClock } from 'react-icons/fa';
import { MdOutlineDescription, MdSchedule, MdRoom } from 'react-icons/md';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { convertToMinutes, uploadFileOnCloudinary } from "../../helpers";
import axios from 'axios';

const { Dragger } = Upload;

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const specializations = [
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Neurologist",
        "Orthopedic",
        "Psychiatrist",
        "General Physician",
        "Gynecologist",
        "Dentist",
        "ENT Specialist"
    ];

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];

    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: 'image/*',
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
                return false;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target.result);
            reader.readAsDataURL(file);
            return false;
        },
        onRemove: () => {
            setImageFile(null);
            setPreviewImage(null);
        }
    };

    const toggleDay = (day) => {
        setSelectedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const onSubmit = async (data) => {
        if (!imageFile) return message.error("Please upload a profile image")

        if (selectedDays.length === 0) return message.error("Please select at least one working day");

        if (!startTime || !endTime) return message.error("Please select start and end time");
        if (!selectedRoom) return message.error("Please select a consultation room");

        setLoading(true);

        const availability = {
            days: selectedDays,
            startTime,
            endTime,
            roomNo: +selectedRoom,
            startMinutes: convertToMinutes(startTime),
            endMinutes: convertToMinutes(endTime)
        };

        try {

            const imgUrl = await uploadFileOnCloudinary(imageFile);
            console.log(imgUrl);
            await axios.post("/admin/add-doctor", {
                imgUrl,
                ...data,
                availability,
                status: "available"
            });

            message.success('Doctor added successfully!');

            // Reset form
            reset();
            setImageFile(null);
            setPreviewImage(null);
            setSelectedDays([]);
            setStartTime('');
            setEndTime('');
            setSelectedRoom('');
        } catch (error) {
            console.log(error)
            message.error(error.response?.data?.message || 'Failed to add doctor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Add New Doctor</h2>
                <p className="text-slate-600">Fill in the details to register a new doctor</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Image */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Profile Picture</h3>

                        {previewImage ? (
                            <div className="mb-4">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-xl"
                                />
                            </div>
                        ) : (
                            <div className="mb-4 w-full h-64 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                                <FaBriefcase className="text-6xl text-blue-300" />
                            </div>
                        )}

                        <Dragger {...uploadProps} className="custom-dragger">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined className="text-blue-500" />
                            </p>
                            <p className="ant-upload-text text-sm font-medium text-slate-700">
                                Click or drag image to upload
                            </p>
                            <p className="ant-upload-hint text-xs text-slate-500">
                                Support: JPG, PNG (Max 2MB)
                            </p>
                        </Dragger>
                    </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FaBriefcase className="text-blue-500" />
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    {...register('fullName', { required: 'Full name is required' })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Dr. John Doe"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Date of Birth *
                                </label>
                                <div className="relative">
                                    <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="date"
                                        {...register('dateOfBirth', { required: 'Date of birth is required' })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    />
                                </div>
                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Gender *
                                </label>
                                <select
                                    {...register('gender', { required: 'Gender is required' })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="tel"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{11}$/,
                                                message: 'Invalid phone number'
                                            }
                                        })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="+1234567890"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Address *
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400" />
                                    <textarea
                                        {...register('address', { required: 'Address is required' })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                        rows="2"
                                        placeholder="123 Medical Street, City, State"
                                    />
                                </div>
                                {errors.address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FaBriefcase className="text-green-500" />
                            Professional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Specialization *
                                </label>
                                <select
                                    {...register('specialization', { required: 'Specialization is required' })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                >
                                    <option value="">Select Specialization</option>
                                    {specializations.map((spec, index) => (
                                        <option key={index} value={spec}>{spec}</option>
                                    ))}
                                </select>
                                {errors.specialization && (
                                    <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Qualification *
                                </label>
                                <div className="relative">
                                    <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        {...register('qualification', { required: 'Qualification is required' })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="MBBS, MD"
                                    />
                                </div>
                                {errors.qualification && (
                                    <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    About Doctor
                                </label>
                                <div className="relative">
                                    <MdOutlineDescription className="absolute left-4 top-4 text-slate-400" />
                                    <textarea
                                        {...register('about')}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                        rows="3"
                                        placeholder="Brief description about the doctor..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule & Availability */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <MdSchedule className="text-purple-500" />
                            Schedule & Availability
                        </h3>

                        <div className="space-y-4">
                            {/* Working Days */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">
                                    Select Working Days *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2.5 rounded-xl font-medium transition-all ${selectedDays.includes(day)
                                                ? 'bg-purple-500 text-white shadow-lg scale-105'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {day.slice(0, 3)}
                                        </button>
                                    ))}
                                </div>
                                {selectedDays.length > 0 && (
                                    <p className="text-sm text-purple-600 mt-2 font-medium">
                                        Selected: {selectedDays.join(', ')}
                                    </p>
                                )}
                            </div>

                            {/* Time & Room */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Start Time *
                                    </label>
                                    <div className="relative">
                                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        End Time *
                                    </label>
                                    <div className="relative">
                                        <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Consultation Room *
                                    </label>
                                    <div className="relative">
                                        <MdRoom className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <select
                                            value={selectedRoom}
                                            onChange={(e) => setSelectedRoom(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                        >
                                            <option>Select Room</option>
                                            {rooms.map((room, idx) => (
                                                <option key={idx} value={idx + 1}>{room}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Preview */}
                            {selectedDays.length > 0 && startTime && endTime && selectedRoom && (
                                <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                                    <p className="text-sm font-semibold text-slate-700 mb-2">📅 Schedule Preview:</p>
                                    <div className="flex flex-wrap gap-2 items-center text-sm text-slate-600">
                                        <span className="font-medium text-purple-700">
                                            {selectedDays.join(', ')}
                                        </span>
                                        <span>•</span>
                                        <span>{startTime} - {endTime}</span>
                                        <span>•</span>
                                        <span>Room No:</span>
                                        <span className="font-medium">{selectedRoom}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Credentials */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FaLock className="text-orange-500" />
                            Account Credentials
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email *
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="doctor@clinic.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="password"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-sm text-blue-800 font-medium">
                                📧 Login credentials will be sent to the doctor's email address
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding Doctor...' : 'Add Doctor'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setImageFile(null);
                                setPreviewImage(null);
                                setSelectedDays([]);
                                setStartTime('');
                                setEndTime('');
                                setSelectedRoom('');
                            }}
                            className="px-8 py-3.5 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;