import { useParams, Link } from "react-router-dom";
import { User, SearchX } from "lucide-react";
import AttendanceBadge from "../components/AttendanceBadge";

// StudentDetails page – displays full info for a single student
// Demonstrates: useParams() to read the :id from the URL
function StudentDetails({ students }) {
  const { id } = useParams();

  // Find the student by matching the URL parameter
  const student = students.find((s) => s.id === Number(id));

  // Error handling: student not found
  if (!student) {
    return (
      <div className="page">
        <div className="not-found">
          <h2><SearchX size={28} /> Student Not Found</h2>
          <p>No student exists with ID: {id}</p>
          <Link to="/students" className="btn btn-primary">
            ← Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/students" className="btn btn-secondary back-btn">
        ← Back to Students
      </Link>

      <div className="detail-card">
        <h2 className="detail-title"><User size={24} /> {student.name}</h2>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Enrollment Number</span>
            <span className="detail-value">{student.enrollmentNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Course</span>
            <span className="detail-value">{student.course}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Semester</span>
            <span className="detail-value">{student.semester}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{student.gender}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Attendance</span>
            <span className="detail-value">{student.attendance}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Attendance Status</span>
            <span className="detail-value">
              <AttendanceBadge attendance={student.attendance} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
