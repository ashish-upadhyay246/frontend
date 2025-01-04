import React, { useState } from 'react';
import axios from 'axios';

const UpdatePayroll = () => {
  const [formData, setFormData] = useState({
    payrollId: '',
    basicSalary: '',
    bonuses: '',
    deductions: '',
    hoursWorked: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleUpdatePayroll = () => {
    if (!formData.payrollId || !formData.hoursWorked) {
      setError('Please fill in all the required fields.');
      return;
    }

    setIsLoading(true);
    axios
      .put(`http://localhost:9246/api/payroll/update_payroll/${formData.payrollId}`, formData, { headers })
      .then(() => {
        setSuccessMessage('Payroll updated successfully.');
        setError('');
        setIsLoading(false);
        setFormData({
          payrollId: '',
          basicSalary: '',
          bonuses: '',
          deductions: '',
          hoursWorked: '',
        });
      })
      .catch(() => {
        setError('Error updating payroll. Please try again.');
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Payroll</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="payrollId" className="block text-sm font-medium text-gray-600">Payroll ID</label>
            <input name="payrollId" value={formData.payrollId} onChange={handleChange} placeholder="Payroll ID" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="col-span-1">
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-600">Working Hours</label>
            <input name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} placeholder="Working Hours" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="col-span-1">
            <label htmlFor="bonuses" className="block text-sm font-medium text-gray-600">Bonuses</label>
            <input name="bonuses" value={formData.bonuses} onChange={handleChange} placeholder="Bonuses" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="col-span-1">
            <label htmlFor="deductions" className="block text-sm font-medium text-gray-600">Deductions</label>
            <input name="deductions" value={formData.deductions} onChange={handleChange} placeholder="Deductions" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="col-span-1">
            <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-600">Basic Salary</label>
            <input name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="Basic Salary" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <button type="button" onClick={handleUpdatePayroll} disabled={isLoading} className={`w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Updating...' : 'Update Payroll'}
            </button>
          </div>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
      </div>
    </div>
  );
};

export default UpdatePayroll;
