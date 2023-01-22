import style from "./Dashboard.module.css";
import DashboardNav from "./DashboardNav/DashboardNav";
import DashboardBudget from "./DashboardBudget/DashboardBudget";

export default function Dashboard() {
  return (
    <div className={style.dashboard}>
      <DashboardNav />
      <DashboardBudget/>
    </div>
  );
}
