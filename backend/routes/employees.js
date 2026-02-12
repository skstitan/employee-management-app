const express = require('express');
const router = express.Router();
const db = require('../database');

// Validation helper
function validateEmployee(employee) {
  const { name, email, department, role, hire_date } = employee;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }
  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }
  if (!department || department.trim() === '') {
    errors.push('Department is required');
  }
  if (!role || role.trim() === '') {
    errors.push('Role is required');
  }
  if (!hire_date || hire_date.trim() === '') {
    errors.push('Hire date is required');
  }

  return errors;
}

// GET all employees
router.get('/', (req, res) => {
  const query = 'SELECT * FROM employees ORDER BY id DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching employees:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

// GET employee by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM employees WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error fetching employee:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(row);
  });
});

// GET employees by department
router.get('/department/:department', (req, res) => {
  const { department } = req.params;
  const query = 'SELECT * FROM employees WHERE department = ? ORDER BY id DESC';

  db.all(query, [department], (err, rows) => {
    if (err) {
      console.error('Error fetching employees by department:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

// POST create new employee
router.post('/', (req, res) => {
  const { name, email, department, role, hire_date } = req.body;
  
  // Validate input
  const validationErrors = validateEmployee(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const query = `
    INSERT INTO employees (name, email, department, role, hire_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [name, email, department, role, hire_date], function(err) {
    if (err) {
      console.error('Error creating employee:', err.message);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Return the created employee
    db.get('SELECT * FROM employees WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Employee created but error fetching details' });
      }
      res.status(201).json(row);
    });
  });
});

// PUT update employee
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, department, role, hire_date } = req.body;

  // Validate input
  const validationErrors = validateEmployee(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const query = `
    UPDATE employees
    SET name = ?, email = ?, department = ?, role = ?, hire_date = ?
    WHERE id = ?
  `;

  db.run(query, [name, email, department, role, hire_date, id], function(err) {
    if (err) {
      console.error('Error updating employee:', err.message);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Return updated employee
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Employee updated but error fetching details' });
      }
      res.json(row);
    });
  });
});

// DELETE employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';

  db.run(query, [id], function(err) {
    if (err) {
      console.error('Error deleting employee:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully', id: parseInt(id) });
  });
});

module.exports = router;
