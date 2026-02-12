const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/employees', employeeRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Employee Management System API',
    version: '1.0.0',
    endpoints: {
      employees: {
        getAll: 'GET /api/employees',
        getById: 'GET /api/employees/:id',
        getByDepartment: 'GET /api/employees/department/:department',
        create: 'POST /api/employees',
        update: 'PUT /api/employees/:id',
        delete: 'DELETE /api/employees/:id'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
