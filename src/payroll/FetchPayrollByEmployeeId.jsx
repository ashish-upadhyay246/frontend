import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';  

const FetchPayrollByEmployeeId = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [payrolls, setPayrolls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedPayroll, setSelectedPayroll] = useState(null); 

  const token = localStorage.getItem('token'); 

  const handleFetchPayroll = async () => {
    if (!employeeId) {
      setError('Please enter a valid Employee ID');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `http://localhost:8080/api/payroll/get_payrollByEmployeeId/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setPayrolls(response.data);
      setSelectedPayroll(response.data[0]);  
      setIsModalOpen(true);  
    } catch (err) {
      setError('Failed to fetch payroll. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Fetch Payroll by Employee ID</h2>

      
      <div className="mb-4">
        <label htmlFor="employeeId" className="block text-gray-600">Employee ID:</label>
        <input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Employee ID"
        />
      </div>

     
      <button
        onClick={handleFetchPayroll}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Payroll'}
      </button>

      
      {error && <p className="text-red-500 mt-4">{error}</p>}

     
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}  
        payrollData={selectedPayroll}  
      />
    </div>
  );
};

export default FetchPayrollByEmployeeId;
