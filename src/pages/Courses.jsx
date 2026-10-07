import { useState, useMemo } from "react";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

// Courses page – displays courses with search, filter, add, and delete
// Demonstrates: useState, useMemo, .filter(), .map(), controlled inputs
function Courses({ courses, setCourses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for adding a new course
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    department: "",
    duration: "",
    students: "",
    status: "Active",
  });
  const [formErrors, setFormErrors] = useState({});

  // Get unique departments for the filter dropdown
  const departments = useMemo(() => {
    const unique = [...new Set(courses.map((c) => c.department))];
    return ["All", ...unique];
  }, [courses]);

  // useMemo prevents recalculating the filtered course list
  // when unrelated state changes (e.g., form input changes)
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept =
        departmentFilter === "All" || course.department === departmentFilter;
      const matchesStatus =
        statusFilter === "All" || course.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [courses, searchTerm, departmentFilter, statusFilter]);

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCourseForm = () => {
    const errors = {};
    if (!newCourse.name.trim()) errors.name = "Course name is required";
    if (!newCourse.code.trim()) errors.code = "Course code is required";
    if (!newCourse.department.trim()) errors.department = "Department is required";
    if (!newCourse.duration.trim()) errors.duration = "Duration is required";
    if (!newCourse.students || isNaN(Number(newCourse.students))) {
      errors.students = "Valid number of students is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (validateCourseForm()) {
      const course = {
        ...newCourse,
        id: Date.now(),
        students: Number(newCourse.students),
      };
      setCourses((prev) => [...prev, course]);
      setNewCourse({
        name: "",
        code: "",
        department: "",
        duration: "",
        students: "",
        status: "Active",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">📚 Course Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "✕ Close Form" : "➕ Add Course"}
        </button>
      </div>

      {/* Add Course Form */}
      {showAddForm && (
        <form className="student-form" onSubmit={handleAddCourse}>
          <h3>➕ Add New Course</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleCourseInputChange}
                placeholder="Enter course name"
              />
              {formErrors.name && (
                <span className="form-error">{formErrors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                name="code"
                value={newCourse.code}
                onChange={handleCourseInputChange}
                placeholder="e.g., CSE101"
              />
              {formErrors.code && (
                <span className="form-error">{formErrors.code}</span>
              )}
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newCourse.department}
                onChange={handleCourseInputChange}
                placeholder="e.g., Computer Science"
              />
              {formErrors.department && (
                <span className="form-error">{formErrors.department}</span>
              )}
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={newCourse.duration}
                onChange={handleCourseInputChange}
                placeholder="e.g., 4 Years"
              />
              {formErrors.duration && (
                <span className="form-error">{formErrors.duration}</span>
              )}
            </div>
            <div className="form-group">
              <label>Number of Students</label>
              <input
                type="number"
                name="students"
                value={newCourse.students}
                onChange={handleCourseInputChange}
                placeholder="Enter number"
              />
              {formErrors.students && (
                <span className="form-error">{formErrors.students}</span>
              )}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={newCourse.status}
                onChange={handleCourseInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Course
            </button>
          </div>
        </form>
      )}

      {/* Search and Filter Controls */}
      <div className="controls">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search courses by name or code..."
        />
        <div className="filter-group">
          <label>Department:</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "All" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <div className="empty-message">
          <p>😕 No courses found matching your criteria.</p>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
