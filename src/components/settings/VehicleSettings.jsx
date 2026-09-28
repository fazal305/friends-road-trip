import { useMemo, useState } from "react";
import Button from "../common/Button.jsx";
import { useTrip } from "../../hooks/useTrip.js";
import { useFriends } from "../../hooks/useFriends.js";
import { estimateFuel } from "../../utils/calculations.js";
import { formatCurrency } from "../../utils/formatters.js";

export default function VehicleSettings() {
  const { trip, vehicle, updateVehicle } = useTrip();
  const { friends } = useFriends();

  const [form, setForm] = useState({
    name: vehicle.name,
    fuelType: vehicle.fuelType,
    driverId: vehicle.driverId,
    fuelEfficiencyKmPerLiter: String(vehicle.fuelEfficiencyKmPerLiter),
    fuelPricePerLiter: String(vehicle.fuelPricePerLiter),
  });
  const [distance, setDistance] = useState(String(trip.distanceKm));
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const estimate = useMemo(
    () =>
      estimateFuel(
        distance,
        form.fuelEfficiencyKmPerLiter,
        form.fuelPricePerLiter,
      ),
    [distance, form.fuelEfficiencyKmPerLiter, form.fuelPricePerLiter],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(false);
    const efficiency = Number(form.fuelEfficiencyKmPerLiter);
    const price = Number(form.fuelPricePerLiter);
    if (!form.name.trim()) return setError("Vehicle name is required.");
    if (!Number.isFinite(efficiency) || efficiency <= 0)
      return setError("Fuel efficiency must be a positive number.");
    if (!Number.isFinite(price) || price < 0)
      return setError("Fuel price cannot be negative.");

    updateVehicle({
      name: form.name.trim(),
      fuelType: form.fuelType,
      driverId: form.driverId,
      fuelEfficiencyKmPerLiter: efficiency,
      fuelPricePerLiter: price,
    });
    setError("");
    setSaved(true);
  };

  return (
    <section className="settings-section surface-card">
      <h2>Vehicle & fuel</h2>
      <p className="settings-section__description">
        Used for the fuel cost estimate below.
      </p>
      <form className="settings-form" onSubmit={handleSubmit}>
        {error && <p className="settings-form__error">{error}</p>}
        {saved && !error && <p className="settings-form__success">Saved.</p>}

        <div className="settings-form__row">
          <label className="settings-form__field">
            <span>Vehicle</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="settings-form__field">
            <span>Fuel type</span>
            <select
              value={form.fuelType}
              onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
        </div>

        <label className="settings-form__field">
          <span>Driver</span>
          <select
            value={form.driverId}
            onChange={(e) => setForm({ ...form, driverId: e.target.value })}
          >
            {friends.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>

        <div className="settings-form__row">
          <label className="settings-form__field">
            <span>Fuel efficiency (km/liter)</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.fuelEfficiencyKmPerLiter}
              onChange={(e) =>
                setForm({ ...form, fuelEfficiencyKmPerLiter: e.target.value })
              }
            />
          </label>
          <label className="settings-form__field">
            <span>Fuel price (per liter)</span>
            <input
              type="number"
              min="0"
              value={form.fuelPricePerLiter}
              onChange={(e) =>
                setForm({ ...form, fuelPricePerLiter: e.target.value })
              }
            />
          </label>
        </div>

        <div className="settings-form__actions">
          <Button type="submit" variant="primary">
            Save vehicle
          </Button>
        </div>
      </form>

      <div className="fuel-estimator">
        <h3>Fuel estimator</h3>
        <label className="settings-form__field">
          <span>Distance (km)</span>
          <input
            type="number"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label>
        <div className="fuel-estimator__results">
          <div>
            <span className="fuel-estimator__label">Fuel required</span>
            <span className="fuel-estimator__value">
              {estimate.liters.toFixed(1)} L
            </span>
          </div>
          <div>
            <span className="fuel-estimator__label">Estimated cost</span>
            <span className="fuel-estimator__value">
              {formatCurrency(estimate.cost, trip.currency)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
