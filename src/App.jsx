import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

// Import initial sample data
import initialStudents from "./data/students";
import initialCourses from "./data/courses";

// Import global styles
import "./styles/style.css";

// App component – Root of the application
// State is managed here and passed down as props to child components
// This is called "lifting state up" – a core React pattern
function App() {
  // useState to manage the student and course arrays
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Redirect "/" to "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard receives data as props (read-only) */}
          <Route
            path="/dashboard"
            element={<Dashboard students={students} courses={courses} />}
          />

          {/* Students page receives both data and setter functions */}
          <Route
            path="/students"
            element={
              <Students students={students} setStudents={setStudents} />
            }
          />

          {/* Student detail page only needs the student list */}
          <Route
            path="/students/:id"
            element={<StudentDetails students={students} />}
          />

          {/* Courses page receives both data and setter functions */}
          <Route
            path="/courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />

          {/* Course detail page only needs the course list */}
          <Route
            path="/courses/:id"
            element={<CourseDetails courses={courses} />}
          />

          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <div className="page not-found">
                <h2>404 – Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
