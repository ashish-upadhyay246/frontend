import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Modal = ({ isOpen, onClose, payrollData }) => {
    if (!isOpen) return null;

    const handleDownloadPayslip = () => {
        const doc = new jsPDF();
        const {
            payrollId,
            employee: { firstName, lastName, email, phoneNumber, department, salary, hireDate },
            payDate,
            basicSalary,
            bonuses,
            deductions,
            netSalary,
            hoursWorked,
        } = payrollData;
        doc.setFontSize(16);
        doc.text('Payslip', 20, 20);
        const tableData = [
            ['Payroll ID', payrollId],
            ['Employee', `${firstName} ${lastName}`],
            ['Email', email],
            ['Phone Number', phoneNumber],
            ['Department', department.deptName],
            ['Salary', salary],
            ['Hire Date', new Date(hireDate).toLocaleDateString()],
            ['Pay Date', new Date(payDate).toLocaleDateString()],
            ['Basic Salary', basicSalary],
            ['Bonuses', bonuses],
            ['Deductions', deductions],
            ['Net Salary', netSalary],
            ['Hours Worked', hoursWorked],
        ];
        doc.autoTable({
            startY: 30,
            head: [['Field', 'Value']],
            body: tableData,
        });
        doc.save('payslip.pdf');
    };
    

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                <center><h2 className="text-2xl font-semibold text-gray-700 mb-4">Payroll Details</h2></center>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Payroll ID</strong></td>
                            <td>{payrollData.payrollId}</td>
                        </tr>
                        <tr>
                            <td><strong>Employee</strong></td>
                            <td>{`${payrollData.employee.firstName} ${payrollData.employee.lastName}`}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>{payrollData.employee.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number</strong></td>
                            <td>{payrollData.employee.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Department</strong></td>
                            <td>{payrollData.employee.department.deptName}</td>
                        </tr>
                        <tr>
                            <td><strong>Salary</strong></td>
                            <td>{payrollData.employee.salary}</td>
                        </tr>
                        <tr>
                            <td><strong>Hire Date</strong></td>
                            <td>{new Date(payrollData.employee.hireDate).toLocaleDateString()}</td>
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

                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Close</button>
                    <button onClick={handleDownloadPayslip} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Download</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
