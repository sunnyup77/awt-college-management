import React from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import AttendanceBadge from "./AttendanceBadge";

// React.memo prevents re-rendering this component unless its props change.
// This is useful when the parent re-renders (e.g., due to search input changes)
// but this particular student's data hasn't changed.
const StudentCard = React.memo(function StudentCard({ student, onEdit, onDelete }) {
  return (
    <tr className="student-row">
      <td>{student.enrollmentNumber}</td>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>{student.semester}</td>
      <td>{student.attendance}%</td>
      <td>
        <AttendanceBadge attendance={student.attendance} />
      </td>
      <td className="action-buttons">
        <Link to={`/students/${student.id}`} className="btn btn-view">
          <Eye size={16} /> View
        </Link>
        <button className="btn btn-edit" onClick={() => onEdit(student)}>
          <Pencil size={16} /> Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(student.id)}>
          <Trash2 size={16} /> Delete
        </button>
      </td>
    </tr>
  );
});

export default StudentCard;
