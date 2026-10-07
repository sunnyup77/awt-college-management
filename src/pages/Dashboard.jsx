import { useMemo } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, CircleCheck, ChartNoAxesColumnIncreasing, ClipboardList, Eye } from "lucide-react";
import DashboardCard from "../components/DashboardCard";

// Dashboard page – Shows statistics calculated from the data arrays
// Demonstrates: useMemo, .reduce(), .filter(), .map(), props, reusable components
function Dashboard({ students, courses }) {
  // useMemo prevents recalculating statistics on every render
  // unless students or courses array actually changes
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalCourses = courses.length;
    const activeCourses = courses.filter((c) => c.status === "Active").length;

    // Calculate average attendance using reduce
    const averageAttendance =
      totalStudents > 0
        ? Math.round(
            students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents
          )
        : 0;

    return { totalStudents, totalCourses, activeCourses, averageAttendance };
  }, [students, courses]);

  // Show last 5 students as "Recent Students"
  const recentStudents = students.slice(-5).reverse();

  return (
    <div className="page">
      <h2 className="page-title"><LayoutDashboard size={24} /> Dashboard</h2>

      <div className="dashboard-cards">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users size={28} />}
          color="#4f46e5"
        />
        <DashboardCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={<BookOpen size={28} />}
          color="#0891b2"
        />
        <DashboardCard
          title="Active Courses"
          value={stats.activeCourses}
          icon={<CircleCheck size={28} />}
          color="#16a34a"
        />
        <DashboardCard
          title="Avg Attendance"
          value={`${stats.averageAttendance}%`}
          icon={<ChartNoAxesColumnIncreasing size={28} />}
          color="#ea580c"
        />
      </div>

      <div className="recent-section">
        <h3><ClipboardList size={22} /> Recent Students</h3>
        {recentStudents.length === 0 ? (
          <p className="empty-message">No students added yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment</th>
                <th>Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.enrollmentNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.semester}</td>
                  <td>
                    <Link
                      to={`/students/${student.id}`}
                      className="btn btn-view"
                    >
                      <Eye size={16} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
