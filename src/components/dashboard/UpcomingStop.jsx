import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { useItinerary } from "../../hooks/useItinerary.js";
import { formatWeekday, formatShortDate } from "../../utils/formatters.js";
import "./UpcomingStop.css";

function findNextStop(itinerary) {
  const now = Date.now();
  let next = null;

  for (const day of itinerary) {
    for (const stop of day.stops) {
      const stopTime = new Date(
        `${day.date}T${stop.time || "00:00"}`,
      ).getTime();
      if (Number.isNaN(stopTime)) continue;
      if (stopTime >= now && (!next || stopTime < next.timestamp)) {
        next = { day, stop, timestamp: stopTime };
      }
    }
  }

  return next;
}

export default function UpcomingStop() {
  const { itinerary } = useItinerary();

  const next = useMemo(() => findNextStop(itinerary), [itinerary]);

  if (!itinerary.length) {
    return (
      <div className="surface-card">
        <EmptyState
          icon="itinerary"
          title="No itinerary yet"
          description="Add a day to start planning your route."
        />
      </div>
    );
  }

  if (!next) {
    const lastDay = itinerary[itinerary.length - 1];
    return (
      <div className="upcoming-stop surface-card">
        <span className="upcoming-stop__eyebrow">Trip wrapped up</span>
        <h3 className="upcoming-stop__title">Last stop: {lastDay.title}</h3>
        <Link to="/itinerary" className="upcoming-stop__link">
          View full itinerary
          <Icon name="chevronRight" size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="upcoming-stop surface-card">
      <span className="upcoming-stop__eyebrow">Next up</span>
      <h3 className="upcoming-stop__title">{next.stop.title}</h3>
      <div className="upcoming-stop__meta">
        <span>
          <Icon name="calendar" size={15} />
          {formatWeekday(next.day.date)}, {formatShortDate(next.day.date)}
        </span>
        <span>
          <Icon name="itinerary" size={15} />
          {next.stop.time}
        </span>
      </div>
      <p className="upcoming-stop__day">
        Day {next.day.dayNumber}: {next.day.title}
      </p>
      {next.stop.notes && (
        <p className="upcoming-stop__notes">{next.stop.notes}</p>
      )}
      <Link to="/itinerary" className="upcoming-stop__link">
        View full itinerary
        <Icon name="chevronRight" size={16} />
      </Link>
    </div>
  );
}
