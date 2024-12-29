import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const EmployeeListByDepartment = () => {
    const [departmentId, setDepartmentId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    const departments = [
        { dept_id: 1, dept_name: "IT" },
        { dept_id: 2, dept_name: "Developer" },
        { dept_id: 3, dept_name: "HR" },
        { dept_id: 4, dept_name: "Finance" },
        { dept_id: 5, dept_name: "Sales" },
    ];

    const fetchEmployees = () => {
        setError("");
        if (!departmentId) {
            setError("Please select a department.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        axios
            .get(`http://localhost:9246/api/admin_getEmployeesByDepartment/${departmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setEmployees(res.data);
                message.success("Employees fetched successfully.");
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("No employees found in this department.");
                    setEmployees([]);
                } else {
                    setError("Failed to fetch employees. Please try again.");
                }
            });
    };

    return (
        <div>
            <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <center>
                <h2 className="text-2xl font-bold mb-6">Employees by Department</h2>
            </center>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Department Dropdown Section */}
            <div className="mb-6">
                <label className="block font-medium">Select Department</label>
                <div className="flex items-center space-x-4 mt-2">
                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="flex-grow p-2 border rounded"
                    >
                        <option value="">-- Select a Department --</option>
                        {departments.map((department) => (
                            <option key={department.dept_id} value={department.dept_id}>
                                {department.dept_name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={fetchEmployees}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Fetch Employees
                    </button>
                </div>
            </div>

            {/* Employee Table Section */}
            {employees.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Employee List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-blue-200">
                                <tr>
                                    <th className="border p-3">Employee ID</th>
                                    <th className="border p-3">Firstname</th>
                                    <th className="border p-3">Lastname</th>
                                    <th className="border p-3">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td className="border p-3">{employee.empId}</td>
                                        <td className="border p-3">{employee.firstName}</td>
                                        <td className="border p-3">{employee.lastName}</td>
                                        <td className="border p-3">{employee.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default EmployeeListByDepartment;
