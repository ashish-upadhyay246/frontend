import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const AddEmployee = ({ onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        hireDate: "",
        salary: "",
        departmentId: "",
        userId: "",
        leavesLeft: "",
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        if (!formData.departmentId || !formData.userId) {
            setError("Department ID and User ID are required.");
            return;
        }

        axios
            .post(`http://localhost:9246/api/admin_addEmployeeDetails/${formData.userId}/${formData.departmentId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                message.success("Employee added successfully");
                console.log(response.data)
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    hireDate: "",
                    salary: "",
                    departmentId: "",
                    userId: "",
                    leavesLeft: "",
                });
                if (onEmployeeAdded) onEmployeeAdded(response.data);
            })
            .catch(() => {
                setError("Failed to add employee. Please check the data and try again.");
            });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Phone Number</label>
                    <input type="text" maxLength={10} name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Hire Date</label>
                    <input type="date" name="hireDate" value={formData.hireDate} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Salary</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Department ID</label>
                    <input type="number" name="departmentId" value={formData.departmentId} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">User ID</label>
                    <input type="number" name="userId" value={formData.userId} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="block font-medium">Leaves</label>
                    <input type="number" name="leavesLeft" value={formData.leavesLeft} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200">Add Employee</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
