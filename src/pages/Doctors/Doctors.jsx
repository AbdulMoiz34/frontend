import { useState } from "react";
import {DoctorCard} from "../../components";

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const doctors = [
        {
            id: 1,
            name: "Dr. Richard James",
            specialty: "General physician",
            image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png",
            isAvailable: true,
        },
        {
            id: 2,
            name: "Dr. Sarah Malik",
            specialty: "Cardiologist",
            image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
            isAvailable: false,
        },
        {
            id: 3,
            name: "Dr. Ahmed Khan",
            specialty: "Dermatologist",
            image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
            isAvailable: true,
        },
        {
            id: 4,
            name: "Dr. Emma Wilson",
            specialty: "Neurologist",
            image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
            isAvailable: true,
        },
    ];

    const filteredDoctors = doctors.filter((doctor) => {
        return (
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
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
                        filteredDoctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
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