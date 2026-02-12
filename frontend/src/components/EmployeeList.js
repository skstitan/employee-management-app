import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (employees.length === 0) {
    return <div className="no-data">No employees found. Add one to get started!</div>;
  }

  return (
    <div className="employee-list">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.hire_date}</td>
              <td className="actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
