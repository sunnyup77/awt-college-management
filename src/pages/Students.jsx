import { useState, useMemo } from "react";
import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";
import SearchBar from "../components/SearchBar";

// Students page – Full CRUD with search and course filter
// Demonstrates: useState, useMemo, .filter(), .map(), controlled forms,
//               conditional rendering, event handling, props
function Students({ students, setStudents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Get unique courses from the student list for the filter dropdown
  const courseOptions = useMemo(() => {
    const unique = [...new Set(students.map((s) => s.course))];
    return ["All", ...unique];
  }, [students]);

  // useMemo prevents recalculating the filtered student list
  // when unrelated state changes (e.g., form visibility toggle)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse =
        courseFilter === "All" || student.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, courseFilter]);

  // Add a new student
  const handleAddStudent = (formData) => {
    const newStudent = {
      ...formData,
      id: Date.now(), // Simple unique ID using timestamp
    };
    setStudents((prev) => [...prev, newStudent]);
    setShowForm(false);
  };

  // Update an existing student
  const handleEditStudent = (formData) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingStudent.id ? { ...s, ...formData } : s
      )
    );
    setEditingStudent(null);
    setShowForm(false);
  };

  // Delete a student
  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Open form in edit mode
  const handleStartEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setShowForm(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">👨‍🎓 Student Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingStudent(null);
            setShowForm(!showForm);
          }}
        >
          {showForm && !editingStudent ? "✕ Close Form" : "➕ Add Student"}
        </button>
      </div>

      {/* Student Form – shown when adding or editing */}
      {showForm && (
        <StudentForm
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          editingStudent={editingStudent}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Search and Filter Controls */}
      <div className="controls">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or enrollment..."
        />
        <div className="filter-group">
          <label>Filter by Course:</label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="filter-select"
          >
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course === "All" ? "All Courses" : course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      {filteredStudents.length === 0 ? (
        <div className="empty-message">
          <p>😕 No students found matching your criteria.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment</th>
                <th>Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Students;
