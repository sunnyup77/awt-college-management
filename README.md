# College Course & Student Management System

A modern, responsive, and beautifully designed React application built for a college practical assignment. This project demonstrates core React concepts by managing a student and course database locally without the need for a backend.

## Features

- **Dashboard**: High-level statistics overview (Total Students, Active Courses, Average Attendance) with a glassmorphism design.
- **Student Management**: Full CRUD operations for student records. Includes a dynamic search bar, course filtering, and attendance tracking.
- **Course Management**: Full CRUD operations for college courses. Filter by department or status.
- **Modern UI**: Features a custom dark purple gradient background, glassmorphism UI elements (frosted glass cards and navbar), and professional SVG icons from Lucide React.
- **Optimized Performance**: Utilizes `useMemo` for filtering and `React.memo` to prevent unnecessary component re-renders.

## Tech Stack

- **React 18** (Functional Components & Hooks)
- **Vite** (Next-generation frontend tooling)
- **React Router DOM** (Single Page Application routing)
- **Vanilla CSS** (Custom CSS variables, Flexbox, CSS Grid, Glassmorphism)
- **Lucide React** (Professional SVG icons)

## How to Run Locally

1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed.
2. **Install Dependencies**:
   Open a terminal in the project folder and run:
   ```bash
   npm install
   ```
3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
4. **View the Application**: Open the URL provided in the terminal (usually `http://localhost:5173/`).

## Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── AttendanceBadge.jsx
│   ├── CourseCard.jsx
│   ├── DashboardCard.jsx
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── StudentCard.jsx
│   └── StudentForm.jsx
├── data/                # Sample data arrays to simulate a database
│   ├── courses.js
│   └── students.js
├── pages/               # Main application views/routes
│   ├── CourseDetails.jsx
│   ├── Courses.jsx
│   ├── Dashboard.jsx
│   ├── StudentDetails.jsx
│   └── Students.jsx
├── styles/              # Global styles
│   └── style.css
├── App.jsx              # Main layout, state container, and router setup
└── main.jsx             # React entry point
```

## Key React Concepts Demonstrated

- **Lifting State Up**: Global state (students and courses) is held in `App.jsx` and passed down as props to the specific pages.
- **Controlled Components**: All forms and search inputs are fully controlled by React `useState`.
- **Performance Optimization**: 
  - `useMemo` is used to cache expensive filter operations so they only run when the search query or raw data changes.
  - `React.memo` is used on list items (`StudentCard` and `CourseCard`) so they don't re-render unless their specific props change.
- **Client-Side Routing**: `react-router-dom` is used to create a seamless Single Page Application experience, including URL parameter extraction (`useParams`) for detail views.
