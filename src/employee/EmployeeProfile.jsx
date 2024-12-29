import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const Employee = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

    const fetchEmployeeProfile = () => {
        setError("");
        const token = localStorage.getItem("token");

        if (!token) {
            setError("User is not authenticated.");
            return;
        }

        axios
            .get("http://localhost:9246/api/emp/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProfileData(res.data);
                setError("");
            })
            .catch(() => {
                setError("Unable to fetch profile. Please try again.");
                setProfileData(null);
            });
    };

    useEffect(() => {
        fetchEmployeeProfile();
    }, []);

    return (
        <div>
        <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {profileData ? (
                <div className="space-y-6">
                    <h3 style={{ fontSize: "35px" }}>
                        <center>
                            <strong>
                                Welcome {profileData.firstName} {profileData.lastName}.
                            </strong>
                        </center>
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p>
                                <strong className="text-gray-600">Employee ID:</strong> {profileData.empId}
                            </p>
                            <p>
                                <strong className="text-gray-600">First Name:</strong> {profileData.firstName}
                            </p>
                            <p>
                                <strong className="text-gray-600">Last Name:</strong> {profileData.lastName}
                            </p>
                            <p>
                                <strong className="text-gray-600">Email:</strong> {profileData.email}
                            </p>
                            <p>
                                <strong className="text-gray-600">Phone Number:</strong> {profileData.phoneNumber}
                            </p>
                            <p>
                                <strong className="text-gray-600">Salary:</strong> {profileData.salary}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p>
                                <strong className="text-gray-600">Hire Date:</strong>{" "}
                                {new Date(profileData.hireDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong className="text-gray-600">Department:</strong>{" "}
                                {profileData.department.deptName}
                            </p>
                            <p>
                                <strong className="text-gray-600">User ID:</strong> {profileData.user.userId}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-4">
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default Employee;
