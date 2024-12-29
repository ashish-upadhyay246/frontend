import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveRequest = () => {
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const leaveTypes = [
        "Sick Leave", "Casual Leave", "Earned Leave", "Maternity Leave", 
        "Paternity Leave", "Unpaid Leave"
    ];

    useEffect(() => {
        const fetchEmployeeId = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            try {
                const res = await axios.get("http://localhost:9246/api/emp/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployeeId(res.data.empId);
            } catch (err) {
                console.error("Error fetching employee ID:", err);
                setError("Unable to fetch employee information. Please try again.");
            }
        };

        fetchEmployeeId();
    }, []);

    const submitLeaveRequest = async () => {
        if (!leaveType || !startDate || !endDate || !reason) {
            setError("All fields are required.");
            setConfirmationMessage("");
            return;
        }

        const token = localStorage.getItem("token");

        const leaveRequestData = { leaveType, startDate, endDate, reason };

        try {
            const response = await axios.post(
                `http://localhost:9246/api/emp/leave_request/${employeeId}`,
                leaveRequestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setConfirmationMessage("Leave request submitted successfully!");
            setError("");
            setLeaveType("");
            setStartDate("");
            setEndDate("");
            setReason("");
        } catch (err) {
            console.error("Error submitting leave request:", err);

            // Handle errors by extracting the message from the error object
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);  // Show the error message only
            } else {
                setError("Failed to submit leave request. Please try again.");
            }
            setConfirmationMessage("");
        }
    };

    return (
        <div>
        <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        
            <h2 className="text-3xl font-bold mb-6 text-center">Leave Request</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="leaveType" className="block text-sm font-semibold text-gray-700 mb-2">Leave Type</label>
                    <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
                        <option value="" disabled>Select a leave type</option>
                        {leaveTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-1/2 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-1/2 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" />
                </div>

                <textarea placeholder="Reason for Leave" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" rows="4"></textarea>

                <button onClick={submitLeaveRequest} className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition">Submit Leave Request</button>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {confirmationMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                    <h2 className="text-lg font-bold text-center">{confirmationMessage}</h2>
                </div>
            )}
        </div>
        </div>
    );
};

export default LeaveRequest;
