import React, { useState } from "react";
import axios from "axios";

const ChangeDepartment = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const departments = [
        { id: 1, name: "IT" },
        { id: 2, name: "Developer" },
        { id: 3, name: "HR" },
        { id: 4, name: "Finance" },
        { id: 5, name: "Sales" },
    ];

    const getToken = () => localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!employeeId || !selectedDepartmentId) {
            setErrorMessage("Please enter an employee ID and select a department.");
            return;
        }

        const token = getToken();
        if (!token) {
            setErrorMessage("Authentication token not found. Please log in.");
            return;
        }

        try {
            axios.put(
                `http://localhost:9246/api/admin_update_department/${employeeId}?departmentId=${selectedDepartmentId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Department updated successfully");
            setErrorMessage("");
            setEmployeeId("");
            setSelectedDepartmentId("");
        } catch (error) {
            setErrorMessage(
                error.response?.status === 403
                    ? "You do not have permission to update the department."
                    : "Error updating department."
            );
            setSuccessMessage("");
        }
    };

    return (
        <div>
            <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <br /><center><h2 className="text-2xl font-bold mb-4">Change Department</h2></center>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold">Update Employee's Department</h3>
                    <div className="flex flex-col gap-4 mt-2">
                        <div>
                            <input type="number" placeholder="Enter Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="p-2 border border-gray-300 rounded w-full"/>
                        </div>
                        <div>
                            <select value={selectedDepartmentId} onChange={(e) => setSelectedDepartmentId(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
                                <option value="" disabled>Select a Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <center>
                    <button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Update Department
                    </button>
                    </center>
                </div>
                {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
            </div>
        </div>
        </div>
    );
};

export default ChangeDepartment;
