import { useParams, Link } from "react-router-dom";

// CourseDetails page – displays full info for a single course
// Demonstrates: useParams() to read the :id from the URL
function CourseDetails({ courses }) {
  const { id } = useParams();

  // Find the course by matching the URL parameter
  const course = courses.find((c) => c.id === Number(id));

  // Error handling: course not found
  if (!course) {
    return (
      <div className="page">
        <div className="not-found">
          <h2>😕 Course Not Found</h2>
          <p>No course exists with ID: {id}</p>
          <Link to="/courses" className="btn btn-primary">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/courses" className="btn btn-secondary back-btn">
        ← Back to Courses
      </Link>

      <div className="detail-card">
        <h2 className="detail-title">📚 {course.name}</h2>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Course Code</span>
            <span className="detail-value">{course.code}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Department</span>
            <span className="detail-value">{course.department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{course.duration}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Students Enrolled</span>
            <span className="detail-value">{course.students}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">
              <span
                className={`badge ${
                  course.status === "Active"
                    ? "badge-eligible"
                    : "badge-detained"
                }`}
              >
                {course.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
