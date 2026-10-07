// AttendanceBadge – A reusable component for showing attendance status
// Conditional rendering:
//   attendance >= 75  → "Eligible"  (green)
//   attendance >= 60  → "Warning"   (orange)
//   attendance < 60   → "Detained"  (red)
function AttendanceBadge({ attendance }) {
  let status, className;

  if (attendance >= 75) {
    status = "Eligible";
    className = "badge badge-eligible";
  } else if (attendance >= 60) {
    status = "Warning";
    className = "badge badge-warning";
  } else {
    status = "Detained";
    className = "badge badge-detained";
  }

  return <span className={className}>{status}</span>;
}

export default AttendanceBadge;
