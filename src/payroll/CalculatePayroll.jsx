import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const CalculatePayroll = () => {
  const [formData, setFormData] = useState({
    hoursWorked: '',
    payDate: '',
  });
  const [empId, setEmpId] = useState("")
  const [payrollData, setPayrollData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleCalculatePayroll = () => {
    if (!formData.hoursWorked || !formData.payDate) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    axios
      .post(`http://localhost:9246/api/payroll/calculate_payroll/${empId}`, formData, { headers })
      .then((res) => {
        setPayrollData(res.data);
        message.success('Payroll calculated successfully.');
        setIsLoading(false);
        setFormData({ hoursWorked: '', payDate: '' })
      })
      .catch(() => {
        setError('Error calculating payroll.');
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(empId)
    console.log(formData)
  };

  return (
    <div>
      <div><h1 style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>Easypay</h1></div>

      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Calculate Payroll</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-600">Employee ID</label>
            <input id="employeeId" name="employeeId" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Enter Employee ID" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-600">Working Hours</label>
            <input id="hoursWorked" name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} placeholder="Enter Working Hours" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="payDate" className="block text-sm font-medium text-gray-600">Pay Date</label>
            <input id="payDate" name="payDate" value={formData.payDate} onChange={handleChange} type="date" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <button type="button" onClick={handleCalculatePayroll} disabled={isLoading} className={`w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? 'Calculating...' : 'Calculate Payroll'}
          </button>
        </form>
        {payrollData && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <center><h3 className="text-xl font-semibold mb-4">Calculated Payroll</h3></center>
              <table className="table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Employee Name</strong></td>
                    <td>{`${payrollData.employee.firstName} ${payrollData.employee.lastName}`}</td>
                  </tr>
                  <tr>
                    <td><strong>Employee ID</strong></td>
                    <td>{payrollData.employee.empId}</td>
                  </tr>
                  <tr>
                    <td><strong>Pay Date</strong></td>
                    <td>{new Date(payrollData.payDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Basic Salary</strong></td>
                    <td>{payrollData.basicSalary}</td>
                  </tr>
                  <tr>
                    <td><strong>Bonuses</strong></td>
                    <td>{payrollData.bonuses}</td>
                  </tr>
                  <tr>
                    <td><strong>Deductions</strong></td>
                    <td>{payrollData.deductions}</td>
                  </tr>
                  <tr>
                    <td><strong>Net Salary</strong></td>
                    <td>{payrollData.netSalary}</td>
                  </tr>
                  <tr>
                    <td><strong>Hours Worked</strong></td>
                    <td>{payrollData.hoursWorked}</td>
                  </tr>
                </tbody>
              </table>

              <button onClick={() => setPayrollData(null)} className="mt-4 w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300">Close</button>
            </div>
          </div>
        )}
        {error && <div className="flex justify-center text-red-500 mt-4 mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default CalculatePayroll;
