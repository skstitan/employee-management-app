import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');

  const API_URL = '/api/employees';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (employeeData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.errors?.join(', ') || 'Failed to create employee');
      }

      await fetchEmployees();
      setShowForm(false);
      setError(null);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id, employeeData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.errors?.join(', ') || 'Failed to update employee');
      }

      await fetchEmployees();
      setEditingEmployee(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      await fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleFilterChange = async (department) => {
    setFilterDepartment(department);
    
    if (!department) {
      fetchEmployees();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/department/${department}`);
      if (!response.ok) {
        throw new Error('Failed to filter employees');
      }
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))].sort();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="toolbar">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Employee'}
          </button>

          <div className="filter-section">
            <label htmlFor="department-filter">Filter by Department: </label>
            <select
              id="department-filter"
              value={filterDepartment}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={editingEmployee ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
          />
        )}

        <EmployeeList
          employees={employees}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
