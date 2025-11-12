import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera, FaUserCircle, FaBirthdayCake, FaVenusMars, FaShieldAlt } from 'react-icons/fa';
import { Spin, message } from 'antd';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProfileData = async () => {
    try {
        const res = await axios.get("/patient/me");
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const PatientProfile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileData
    })

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [activeTab, setActiveTab] = useState('personal');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (data) setEditedData(data);
    }, [data]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const payload = { ...editedData, fullName: editedData.user.fullName };

            const res = await axios.patch("/patient/updateProfile", payload);
            setIsEditing(false);
            message.success('Profile updated successfully!');
            console.log('Updated data:', res.data);

            setEditedData({
                ...res.data.patient,
                user: res.data.user
            });

        } catch (err) {
            console.error(err);
            message.error(err.response?.data?.message || 'Failed to update profile');
        }
    };



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedData(prev => ({ ...prev, imgFile: file }));
            message.success('Profile picture selected!');
        }
    };

    const handleCancel = () => {
        setEditedData(data);
        setIsEditing(false);
    };
    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        try {
            message.success('Password updated successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            message.error('Failed to update password');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">My Profile</h1>
                    <p className="text-slate-600">Manage your personal information</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                    <div className="h-48 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-20 mb-6">
                            <div className="relative inline-block">
                                <img
                                    src={editedData?.imgUrl || "/default-avatar.png"}
                                    alt={editedData?.user?.fullName || "User"}
                                    className="w-40 h-40 rounded-3xl border-8 border-white shadow-xl object-cover"
                                />
                                {isEditing && (
                                    <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-xl cursor-pointer hover:bg-blue-600 transition-all shadow-lg">
                                        <FaCamera />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">{editedData?.user?.fullName || "User"}</h2>
                                <p className="text-slate-600 flex items-center gap-2">
                                    <FaEnvelope className="text-blue-500" />
                                    {editedData?.user.email}
                                </p>
                            </div>

                            <div className="mt-4 md:mt-0">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md font-semibold"
                                    >
                                        <FaEdit />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-md font-semibold"
                                        >
                                            <FaSave />
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-semibold"
                                        >
                                            <FaTimes />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-b border-slate-200 mb-8">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('personal')}
                                    className={`pb-4 font-semibold transition-all ${activeTab === 'personal'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <FaUser className="inline mr-2" />
                                    Personal Info
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`pb-4 font-semibold transition-all ${activeTab === 'security'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <FaShieldAlt className="inline mr-2" />
                                    Security
                                </button>
                            </div>
                        </div>

                        {activeTab === 'personal' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaUserCircle className="text-blue-500" />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData?.user?.fullName || ''}
                                            onChange={(e) =>
                                                setEditedData(prev => ({
                                                    ...prev,
                                                    user: {
                                                        ...prev.user,
                                                        fullName: e.target.value
                                                    }
                                                }))
                                            }
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                        />

                                    ) : (
                                        <p className="text-slate-800 font-medium">{editedData?.user.fullName}</p>
                                    )}
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaEnvelope className="text-blue-500" />
                                        Email Address
                                    </label>
                                    <p className="text-slate-800 font-medium">{editedData?.user.email}</p>
                                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaPhone className="text-green-500" />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedData?.phone}
                                            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-slate-800 font-medium">{editedData?.phone}</p>
                                    )}
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaBirthdayCake className="text-pink-500" />
                                        Date of Birth
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={editedData?.dateOfBirth}
                                            onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-slate-800 font-medium">
                                            {new Date(editedData?.dateOfBirth).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaVenusMars className="text-purple-500" />
                                        Gender
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={editedData?.gender}
                                            onChange={(e) => setEditedData(prev => ({ ...prev, gender: e.target.value }))}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="text-slate-800 font-medium">{editedData?.gender}</p>
                                    )}
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaPhone className="text-red-500" />
                                        Emergency Contact
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedData?.emergencyContact}
                                            onChange={(e) => setEditedData({ ...editedData, emergencyContact: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-slate-800 font-medium">{editedData?.emergencyContact}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                                        <FaMapMarkerAlt className="text-orange-500" />
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editedData?.address}
                                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none resize-none"
                                        />
                                    ) : (
                                        <p className="text-slate-800 font-medium">{editedData?.address}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="max-w-2xl">
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Change Password</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter current password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={handlePasswordSubmit}
                                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                                    <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
                                    <p className="text-slate-600 mb-4">Once you delete your account, there is no going back.</p>
                                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;