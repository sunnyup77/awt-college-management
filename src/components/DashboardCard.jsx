// DashboardCard – A reusable card component for displaying statistics
// Accepts title, value, icon, and color as props
function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="dashboard-card" style={{ borderLeftColor: color }}>
      <div className="dashboard-card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="dashboard-card-info">
        <h3 className="dashboard-card-value">{value}</h3>
        <p className="dashboard-card-title">{title}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
