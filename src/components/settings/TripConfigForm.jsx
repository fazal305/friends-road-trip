import { useState } from "react";
import Button from "../common/Button.jsx";
import { useTrip } from "../../hooks/useTrip.js";

export default function TripConfigForm() {
  const { trip, updateTrip } = useTrip();
  const [form, setForm] = useState({
    name: trip.name,
    startLocation: trip.startLocation,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    currency: trip.currency,
    distanceKm: String(trip.distanceKm),
    estimatedTravelHours: String(trip.estimatedTravelHours),
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(false);

    if (!form.name.trim()) return setError("Trip name is required.");
    if (!form.startLocation.trim() || !form.destination.trim())
      return setError("Starting point and destination are required.");
    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) > new Date(form.endDate)
    ) {
      return setError("Start date must be before the end date.");
    }
    const distanceKm = Number(form.distanceKm);
    const estimatedTravelHours = Number(form.estimatedTravelHours);
    if (!Number.isFinite(distanceKm) || distanceKm < 0)
      return setError("Distance must be a positive number.");
    if (!Number.isFinite(estimatedTravelHours) || estimatedTravelHours < 0)
      return setError("Travel time must be a positive number.");

    updateTrip({
      name: form.name.trim(),
      startLocation: form.startLocation.trim(),
      destination: form.destination.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      currency: form.currency.trim() || "PKR",
      distanceKm,
      estimatedTravelHours,
    });
    setError("");
    setSaved(true);
  };

  return (
    <section className="settings-section surface-card">
      <h2>Trip details</h2>
      <p className="settings-section__description">
        Editing these updates the dashboard, route, and summary everywhere.
      </p>
      <form className="settings-form" onSubmit={handleSubmit}>
        {error && <p className="settings-form__error">{error}</p>}
        {saved && !error && <p className="settings-form__success">Saved.</p>}

        <label className="settings-form__field">
          <span>Trip name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <div className="settings-form__row">
          <label className="settings-form__field">
            <span>Starting point</span>
            <input
              value={form.startLocation}
              onChange={(e) =>
                setForm({ ...form, startLocation: e.target.value })
              }
            />
          </label>
          <label className="settings-form__field">
            <span>Destination</span>
            <input
              value={form.destination}
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
            />
          </label>
        </div>

        <div className="settings-form__row">
          <label className="settings-form__field">
            <span>Start date</span>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </label>
          <label className="settings-form__field">
            <span>End date</span>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </label>
        </div>

        <div className="settings-form__row">
          <label className="settings-form__field">
            <span>Distance (km)</span>
            <input
              type="number"
              min="0"
              value={form.distanceKm}
              onChange={(e) => setForm({ ...form, distanceKm: e.target.value })}
            />
          </label>
          <label className="settings-form__field">
            <span>Travel time (hours)</span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={form.estimatedTravelHours}
              onChange={(e) =>
                setForm({ ...form, estimatedTravelHours: e.target.value })
              }
            />
          </label>
        </div>

        <label className="settings-form__field settings-form__field--narrow">
          <span>Currency code</span>
          <input
            value={form.currency}
            onChange={(e) =>
              setForm({ ...form, currency: e.target.value.toUpperCase() })
            }
            maxLength={3}
          />
        </label>

        <div className="settings-form__actions">
          <Button type="submit" variant="primary">
            Save trip details
          </Button>
        </div>
      </form>
    </section>
  );
}
