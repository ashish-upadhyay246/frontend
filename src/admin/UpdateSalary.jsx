import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const UpdateEmployeeSalary = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [newSalary, setNewSalary] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const isTokenValid = () => {
        const token = getToken();
        if (!token) {
            setErrorMessage("You must be logged in to perform this action.");
            return false;
        }
        return true;
    };

    const handleUpdateSalary = async () => {
        if (!isTokenValid()) return;

        if (!employeeId || !newSalary) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const token = getToken();
            const response = await axios.put(
                `http://localhost:9246/api/admin_updateEmployeeSalary/${employeeId}?newSalary=${newSalary}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Salary updated successfully");
            setErrorMessage("");
            setEmployeeId("");
            setNewSalary("");
            message.success(response.data);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to update salary. Please try again."
            );
            setSuccessMessage("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            
            <br />
            <center>
                <h2 className="text-2xl font-bold mb-4">Update Employee Salary</h2>
            </center>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold">Employee Salary Update</h3>
                    <div className="mt-2">
                        <input type="number" placeholder="Enter Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="p-2 border border-gray-300 rounded w-full"/>
                    </div>
                    <div className="mt-2">
                        <input type="number" placeholder="Enter New Salary" value={newSalary} onChange={(e) => setNewSalary(e.target.value)} className="p-2 border border-gray-300 rounded w-full"/>
                    </div>
                    <center>
                    <button onClick={handleUpdateSalary} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
                        {loading ? "Updating..." : "Update Salary"}
                    </button>
                    </center>
                </div>
            </div>
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
        </div>
        </div>
    );
};

export default UpdateEmployeeSalary;
