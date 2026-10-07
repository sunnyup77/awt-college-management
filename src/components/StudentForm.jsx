import { useState, useEffect } from "react";

// StudentForm – Reusable form for both ADD and EDIT student operations
// When editingStudent is provided, the form pre-fills with that student's data
// Uses useState for controlled form inputs and basic validation
function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNumber: "",
    email: "",
    course: "",
    semester: "",
    gender: "Male",
    attendance: "",
  });

  const [errors, setErrors] = useState({});

  // When editingStudent changes, populate the form with existing data
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        enrollmentNumber: editingStudent.enrollmentNumber,
        email: editingStudent.email,
        course: editingStudent.course,
        semester: editingStudent.semester,
        gender: editingStudent.gender,
        attendance: editingStudent.attendance,
      });
    } else {
      setFormData({
        name: "",
        enrollmentNumber: "",
        email: "",
        course: "",
        semester: "",
        gender: "Male",
        attendance: "",
      });
    }
    setErrors({});
  }, [editingStudent]);

  // Handle changes in any form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.enrollmentNumber.trim()) newErrors.enrollmentNumber = "Enrollment Number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.semester) newErrors.semester = "Semester is required";

    const att = Number(formData.attendance);
    if (formData.attendance === "" || isNaN(att) || att < 0 || att > 100) {
      newErrors.attendance = "Attendance must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        semester: Number(formData.semester),
        attendance: Number(formData.attendance),
      });
      // Reset form after adding (not after editing, since parent handles that)
      if (!editingStudent) {
        setFormData({
          name: "",
          enrollmentNumber: "",
          email: "",
          course: "",
          semester: "",
          gender: "Male",
          attendance: "",
        });
      }
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>{editingStudent ? "✏️ Edit Student" : "➕ Add New Student"}</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Enrollment Number</label>
          <input
            type="text"
            name="enrollmentNumber"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            placeholder="Enter enrollment number"
          />
          {errors.enrollmentNumber && (
            <span className="form-error">{errors.enrollmentNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Course</label>
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="">Select Course</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="B.Tech AI/ML">B.Tech AI/ML</option>
          </select>
          {errors.course && <span className="form-error">{errors.course}</span>}
        </div>

        <div className="form-group">
          <label>Semester</label>
          <select name="semester" value={formData.semester} onChange={handleChange}>
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
          {errors.semester && <span className="form-error">{errors.semester}</span>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Attendance (%)</label>
          <input
            type="number"
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            placeholder="0 - 100"
            min="0"
            max="100"
          />
          {errors.attendance && (
            <span className="form-error">{errors.attendance}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
