import React from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

// React.memo prevents unnecessary re-renders of CourseCard
// when the parent re-renders due to search/filter state changes
// but this particular course's props haven't changed.
const CourseCard = React.memo(function CourseCard({ course, onDelete }) {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{course.name}</h3>
        <span
          className={`badge ${course.status === "Active" ? "badge-eligible" : "badge-detained"
            }`}
        >
          {course.status}
        </span>
      </div>
      <div className="course-card-body">
        <p>
          <strong>Code:</strong> {course.code}
        </p>
        <p>
          <strong>Department:</strong> {course.department}
        </p>
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
        <p>
          <strong>Students Enrolled:</strong> {course.students}
        </p>
      </div>
      <div className="course-card-actions">
        <Link to={`/courses/${course.id}`} className="btn btn-view">
          <Eye size={16} /> View Details
        </Link>
        <button className="btn btn-delete" onClick={() => onDelete(course.id)}>
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
});

export default CourseCard;
