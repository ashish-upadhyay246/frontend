import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");

    const fetchAllLeaves = () => {
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }
        axios
            .get("http://localhost:9246/api/admin_getAllLeaves", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const updatedLeaves = res.data.map((leave) => ({
                    ...leave,
                    actionTaken: leave.status !== "PENDING",
                }));
                setLeaves(updatedLeaves);
            })
            .catch(() => setError("Failed to fetch leaves. Please try again."));
    };

    const handleLeaveAction = (leaveId, approved) => {
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }
        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.leaveId === leaveId
                    ? {
                          ...leave,
                          status: approved ? "APPROVED" : "REJECTED",
                          actionTaken: true,
                      }
                    : leave
            )
        );

        axios
            .put(
                `http://localhost:9246/api/admin_approveRejectLeave/${leaveId}?approved=${approved}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                message.success(`Leave ${approved ? "approved" : "rejected"} successfully`);
            })
            .catch(() => {
                setError("Failed to update leave status. Please try again.");
                setLeaves((prevLeaves) =>
                    prevLeaves.map((leave) =>
                        leave.leaveId === leaveId
                            ? {
                                  ...leave,
                                  status: "PENDING",
                                  actionTaken: false,
                              }
                            : leave
                    )
                );
            });
    };

    useEffect(() => {
        fetchAllLeaves();
    }, []);

    return (
        <div>
            <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
        
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <center>
                <h2 className="text-2xl font-bold mb-6">Leave Management</h2>
            </center>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {leaves.length > 0 ? (
                <div>
                    <h3 className="text-lg font-bold mb-4">Leave Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-center">
                            <thead className="bg-blue-200">
                                <tr>
                                    <th className="border p-3">Leave ID</th>
                                    <th className="border p-3">Employee Name</th>
                                    <th className="border p-3">Start Date</th>
                                    <th className="border p-3">End Date</th>
                                    <th className="border p-3">Status</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave) => (
                                    <tr key={leave.leaveId}>
                                        <td className="border p-3">{leave.leaveId}</td>
                                        <td className="border p-3">{leave.employee?.firstName}</td>
                                        <td className="border p-3">{leave.startDate}</td>
                                        <td className="border p-3">{leave.endDate}</td>
                                        <td
                                            className={`border p-3 ${
                                                leave.status === "PENDING"
                                                    ? "text-yellow-500"
                                                    : leave.status === "APPROVED"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {leave.status}
                                        </td>
                                        <td className="border p-3 space-x-2">
                                            <button
                                                onClick={() => handleLeaveAction(leave.leaveId, true)}
                                                className={`px-3 py-1 rounded ${
                                                    leave.actionTaken
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-green-500 hover:bg-green-600 text-white"
                                                }`}
                                                disabled={leave.actionTaken}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleLeaveAction(leave.leaveId, false)}
                                                className={`px-3 py-1 rounded ${
                                                    leave.actionTaken
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-500 hover:bg-red-600 text-white"
                                                }`}
                                                disabled={leave.actionTaken}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No leave requests found.</p>
            )}
        </div>
        </div>
    );
};

export default LeaveManagement;
