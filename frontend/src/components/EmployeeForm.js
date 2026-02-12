import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    hire_date: '',
  });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        role: employee.role,
        hire_date: employee.hire_date,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      if (employee) {
        await onSubmit(employee.id, formData);
      } else {
        await onSubmit(formData);
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        department: '',
        role: '',
        hire_date: '',
      });
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
      
      {errors.length > 0 && (
        <div className="form-errors">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="e.g., Engineering, Sales, HR"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="e.g., Software Engineer, Manager"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hire_date">Hire Date *</label>
          <input
            type="date"
            id="hire_date"
            name="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : (employee ? 'Update Employee' : 'Add Employee')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
