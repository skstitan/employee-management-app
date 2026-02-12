# Employee Management System

A full-stack employee management application with CRUD operations, search, and filter capabilities.

## Screenshots

### Employee List View
![Employee List](https://github.com/user-attachments/assets/ffd79670-ca62-4f40-b5f5-a72461124acc)

### Add Employee Form
![Add Employee](https://github.com/user-attachments/assets/10f734eb-3923-4040-b135-1a50be6e941d)

### Filter by Department
![Filter Employees](https://github.com/user-attachments/assets/2d44a3ea-61f2-42b5-af4b-151fc07a8c62)

### Edit Employee
![Edit Employee](https://github.com/user-attachments/assets/46ca2fdc-f729-4fcb-90b9-2cc836fb941a)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete employee records
- **Employee Fields**: ID, Name, Email, Department, Role, Hire Date
- **Search & Filter**: Filter employees by department
- **RESTful API**: Clean API design with proper error handling
- **Responsive UI**: Modern React frontend with intuitive interface
- **Security**: Rate limiting to prevent abuse
- **Data Validation**: Comprehensive input validation and error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Frontend**: React.js
- **API**: RESTful design
- **Security**: express-rate-limit middleware

## Project Structure

```
employee-management-app/
├── backend/
│   ├── server.js           # Express server setup
│   ├── database.js         # SQLite database configuration
│   ├── routes/
│   │   └── employees.js    # Employee API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── components/
│   │   │   ├── EmployeeList.js    # Employee list component
│   │   │   └── EmployeeForm.js    # Employee form component
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

### Employees

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `GET /api/employees/department/:department` - Filter employees by department
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`

   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## Usage

1. Start the backend server (runs on port 5000)
2. Start the frontend development server (runs on port 3000)
3. Open your browser and navigate to `http://localhost:3000`
4. Use the interface to:
   - Add new employees
   - View all employees
   - Edit employee information
   - Delete employees
   - Filter employees by department

## API Request Examples

### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "role": "Software Engineer",
    "hire_date": "2024-01-15"
  }'
```

### Get All Employees
```bash
curl http://localhost:5000/api/employees
```

### Filter by Department
```bash
curl http://localhost:5000/api/employees/department/Engineering
```

### Update Employee
```bash
curl -X PUT http://localhost:5000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "role": "Senior Software Engineer",
    "hire_date": "2024-01-15"
  }'
```

### Delete Employee
```bash
curl -X DELETE http://localhost:5000/api/employees/1
```

## Security Features

- **Rate Limiting**: API endpoints are rate-limited to 100 requests per 15 minutes per IP
- **Input Validation**: All employee data is validated before processing
- **Email Uniqueness**: Email addresses must be unique across all employees
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

## Error Handling

The API includes comprehensive error handling:
- Input validation for all fields
- Unique email constraint
- Proper HTTP status codes
- Descriptive error messages

## License

ISC
