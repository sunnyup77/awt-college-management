import { CircleCheck, TriangleAlert, CircleX } from "lucide-react";

// AttendanceBadge – A reusable component for showing attendance status
// Conditional rendering:
//   attendance >= 75  → "Eligible"  (green)
//   attendance >= 60  → "Warning"   (orange)
//   attendance < 60   → "Detained"  (red)
function AttendanceBadge({ attendance }) {
  let status, className, icon;

  if (attendance >= 75) {
    status = "Eligible";
    className = "badge badge-eligible";
    icon = <CircleCheck size={14} />;
  } else if (attendance >= 60) {
    status = "Warning";
    className = "badge badge-warning";
    icon = <TriangleAlert size={14} />;
  } else {
    status = "Detained";
    className = "badge badge-detained";
    icon = <CircleX size={14} />;
  }

  return <span className={className}>{icon} {status}</span>;
}

export default AttendanceBadge;
