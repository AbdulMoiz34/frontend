import { useState } from "react";
import { DoctorCard } from "../../components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";

const getDoctors = async () => {
    const res = await axios.get("/doctors");
    return res.data;
}

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: doctors, isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    });

    if (isLoading) return <div className="min-h-[80vh] flex justify-center items-center">
        <Spin size="small" />
    </div>;

    const filteredDoctors = doctors.filter((doctor) => {
        const { fullName } = doctor.user;

        return (
            fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Page Heading */}
                <div className="text-center py-12">
                    <h1 className="text-4xl font-semibold text-gray-800">
                        Find Your Doctor
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Browse through our qualified healthcare professionals.
                    </p>
                </div>

                {/* Search Box */}
                <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="Search by name or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#567DFD] transition"
                    />
                </div>

                {/* Responsive Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor, idx) => (
                            (< DoctorCard key={idx} doctor={doctor} />)
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No doctors found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;