import TripHero from "../components/dashboard/TripHero.jsx";
import TripStats from "../components/dashboard/TripStats.jsx";
import UpcomingStop from "../components/dashboard/UpcomingStop.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <TripHero />
      <TripStats />
      <section>
        <h2 className="dashboard__section-title">What's next</h2>
        <UpcomingStop />
      </section>
    </div>
  );
}
