# ENTNT Dental Center Dashboard

This is a frontend-only React application that simulates a role-based dental center management system. It includes dashboards for both admin and patient roles, appointment tracking, calendar view, file uploads, and KPI reporting. All data is stored in the browser using localStorage, as per the assignment requirements.

This project was developed and submitted as part of the ENTNT Frontend Developer (React) technical assessment.

---

## Live Demo and Repository

- Deployed Application (Vercel): https://entnt-dental-dashboard-roan.vercel.app  
- GitHub Repository: https://github.com/Aditya-Kotame02/entnt-dental-dashboard

---

## Features

### User Authentication (Simulated)

- Hardcoded users with role-based access:
  - Admin: `admin@entnt.in` / `admin123`
  - Patient: `john@entnt.in` / `patient123`
- Authentication state persisted using localStorage
- Conditional route access based on user roles

---

### Admin Dashboard

- View KPIs: total patients, completed/pending appointments, revenue
- Manage appointments
- View patient list
- Upload medical files (e.g., scans, reports) per appointment
- Calendar view for scheduled appointments
- Logout functionality

---

### Patient Dashboard

- View only personal records and upcoming appointments
- View appointment history with cost, treatment, comments, and status
- Download and preview medical files (if attached)
- Logout functionality

---

## Technology Stack

- React
- React Router v6
- Tailwind CSS
- Context API
- react-big-calendar
- LocalStorage (mock database)

---

## Application Routes

| Route                  | Description                                    |
|------------------------|------------------------------------------------|
| `/`                    | Login page                                     |
| `/admin/dashboard`     | Admin KPI dashboard                            |
| `/admin/patients`      | Patient management view                        |
| `/admin/appointments`  | Appointment list and file upload               |
| `/admin/calendar`      | Appointment calendar view                      |
| `/patient/dashboard`   | Patient's dashboard with personal history      |

---

## Role-Based Access

| Role    | Access Permissions                                         |
|---------|------------------------------------------------------------|
| Admin   | Full access to all pages, file uploads, patient management |
| Patient | View-only access to own appointments and documents         |

---
## Project Structure
entnt-dental-dashboard:
  public:
    - index.html  # HTML entry point
  src:
    components:
      - LogoutButton.js
      - FilePreview.js
    context:
      - AuthContext.js  # Auth context for login/session
    pages:
      admin:
        - AdminDashboard.js
        - Appointments.js
        - CalendarView.js
        - Patients.js
      patient:
        - PatientDashboard.js
    utils:
      - incidentStorage.js
      - storage.js
      - seed.js
    - App.js          # Main routing logic
    - index.css       # Tailwind global styles
    - index.js        # ReactDOM entry point
  - package.json
  - tailwind.config.js
  - README.md

---

## Installation and Running Locally

1. Clone the repository:

git clone https://github.com/Aditya-Kotame02/entnt-dental-dashboard.git
cd entnt-dental-dashboard

2. Install dependencies:

npm install

3. Start the development server:

npm start

Then open `http://localhost:3000` in your browser.

---

## User Roles and Login Credentials

| Role    | Email             | Password     |
|---------|-------------------|--------------|
| Admin   | admin@entnt.in    | admin123     |
| Patient | john@entnt.in     | patient123   |

---

## Known Limitations

- No backend or real-time database integration
- User authentication is simulated and hardcoded
- File size limits not enforced in uploads
- Admin cannot create new users

---

## Technical Considerations

- Authentication handled via React Context API and protected routes
- Appointment and patient data persisted using localStorage
- Tailwind CSS used for UI styling and responsiveness
- Mock data seeded at runtime if not already present
- Files uploaded as base64 strings and saved in incident objects

---

## Submission Details

- GitHub Repository: https://github.com/Aditya-Kotame02/entnt-dental-dashboard  
- Deployed Link (Vercel): https://entnt-dental-dashboard-roan.vercel.app  
---

## Author

**Aditya Kotame**  
Email: adityakotame17@gmail.com  
LinkedIn: https://www.linkedin.com/in/aditya-kotame
