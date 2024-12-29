import React, { useState } from 'react';
import Employee from '../employee/EmployeeProfile';
import EmployeeUpdate from '../employee/EmployeeUpdate';
import LeaveRequest from '../employee/EmployeeLeave';
import GetAllLeaves from '../employee/GetAllLeaves';
import Logout from './Logout';
import EmployeePayroll from '../employee/FetchPayroll';
import HolidayCalendarModal from '../widget/Calendar';
import { FaUser, FaEdit, FaLeaf, FaCalendarAlt } from 'react-icons/fa';
import { HiCurrencyDollar } from "react-icons/hi";

import { useLocation } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [activeDashboard, setActiveDashboard] = useState('view_profile_emp');
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const location = useLocation();
    const username = 'Employee';

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
                <div className="p-6 text-lg font-bold flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center">
                        <span className="mr-2 text-xl"><FaUser className="text-xl" /></span> {username}
                    </div>
                </div>
                <ul className="mt-6">

                    <li
                        onClick={() => setActiveDashboard('view_profile_emp')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'view_profile_emp' ? 'bg-gray-800' : ''
                            }`}
                    >
                        <FaUser className="mr-3 text-xl" /> Profile
                    </li>


                    <li
                        onClick={() => setActiveDashboard('update_profile_emp')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'update_profile_emp' ? 'bg-gray-800' : ''
                            }`}
                    >
                        <FaEdit className="mr-3 text-xl" /> Edit Details
                    </li>


                    <li
                        onClick={() => setActiveDashboard('submit_leave_req')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'submit_leave_req' ? 'bg-gray-800' : ''
                            }`}
                    >
                        <FaLeaf className="mr-3 text-xl" /> Submit Leave Request
                    </li>


                    <li
                        onClick={() => setActiveDashboard('getallleaves')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'getallleaves' ? 'bg-gray-800' : ''
                            }`}
                    >
                        <FaCalendarAlt className="mr-3 text-xl" /> See All Leaves
                    </li>


                    <li
                        onClick={() => setActiveDashboard('getpayroll')}
                        className={`px-6 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out ${activeDashboard === 'getpayroll' ? 'bg-gray-800' : ''
                            }`}
                    >
                        <HiCurrencyDollar className="mr-3 text-xl" /> Get payroll
                    </li>

                    <li className={`px-12 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out}`}>
                        <Logout />
                    </li>
                </ul>
                
            </div>


            <div className="flex-1 bg-gray-100 p-6 overflow-hidden transition-all duration-300 ease-in-out">

                {activeDashboard === 'view_profile_emp' && <Employee />}


                {activeDashboard === 'update_profile_emp' && <EmployeeUpdate />}


                {activeDashboard === 'submit_leave_req' && <LeaveRequest />}


                {activeDashboard === 'getallleaves' && <GetAllLeaves />}


                {activeDashboard === 'getpayroll' && <EmployeePayroll />}
            </div>


            {isCalendarModalOpen && (
                <HolidayCalendarModal
                    onClose={() => setIsCalendarModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeDashboard;
