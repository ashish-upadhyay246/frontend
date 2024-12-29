import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const EmployeeUpdate = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        salary: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get("http://localhost:9246/api/emp/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfileData(res.data);
                setFormData({
                    firstName: res.data.firstName || "",
                    lastName: res.data.lastName || "",
                    email: res.data.email || "",
                    phoneNumber: res.data.phoneNumber || "",
                    salary: res.data.salary || "",
                });
                setError("");
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Unable to fetch profile. Please try again.");
                setProfileData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateEmployeeProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("User is not authenticated.");
            return;
        }

        try {
            setLoading(true);
            const empId = profileData.empId;

            if (!empId) {
                setError("Employee ID is missing.");
                return;
            }

            const res = await axios.put(
                `http://localhost:9246/api/emp/update_info/${empId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfileData(res.data);
            message.success("Profile updated successfully");
            setError("");
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Unable to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Employee Profile</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : profileData ? (
                    <div>
                        <div className="space-y-4 mb-6">
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="p-2 border border-gray-300 rounded w-full" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="p-2 border border-gray-300 rounded w-full" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="p-2 border border-gray-300 rounded w-full" />
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" className="p-2 border border-gray-300 rounded w-full" />
                            <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="Salary" className="p-2 border border-gray-300 rounded w-full" />
                        </div>
                        <button onClick={updateEmployeeProfile} className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4">Update Profile</button>
                    </div>
                ) : (
                    <p className="text-center">No profile data available.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeUpdate;
