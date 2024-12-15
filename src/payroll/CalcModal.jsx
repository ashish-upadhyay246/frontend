import React, { useState } from 'react';
import axios from 'axios';
import CalcModal from './CalcModal';

const PayrollCalculation = () => {
    const [payrollData, setPayrollData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(""); 

    const token = localStorage.getItem('token');  
    const headers = { Authorization: `Bearer ${token}` };

    const handlePayrollCalculation = async () => {
        try {
            const payrollDTO = {
                employeeId: employeeId, 
                hoursWorked: 120, 
            };

            const response = await axios.post(
                '/payroll/calculate_payroll',
                payrollDTO,
                { headers }
            );

            setPayrollData(response.data); 
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error calculating payroll:", error);
        }
    };

    return (
        <div className="flex justify-center items-center p-6">
            <div>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Enter Employee ID"
                    className="border-2 border-gray-400 p-2 rounded-lg"
                />
                <button
                    onClick={handlePayrollCalculation}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Calculate Payroll
                </button>
            </div>

            <CalcModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                payrollData={payrollData}
            />
        </div>
    );
};

export default PayrollCalculation;
