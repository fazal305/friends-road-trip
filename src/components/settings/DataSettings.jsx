import Button from "../common/Button.jsx";
import { useTrip } from "../../hooks/useTrip.js";
import { useConfirm } from "../../hooks/useConfirm.jsx";

export default function DataSettings() {
  const { resetTrip } = useTrip();
  const { requestConfirm, confirmDialog } = useConfirm();

  return (
    <section className="settings-section surface-card">
      <h2>Data</h2>
      <p className="settings-section__description">
        Everything is stored only in this browser's local storage — nothing is
        sent to a server. Clearing your browser data will remove it.
      </p>
      <Button
        variant="danger"
        onClick={() =>
          requestConfirm({
            title: "Reset all trip data?",
            description:
              "This replaces every friend, expense, itinerary day, and list with the original sample trip. This cannot be undone.",
            confirmLabel: "Reset trip",
            onConfirm: resetTrip,
          })
        }
      >
        Reset to sample trip
      </Button>
      {confirmDialog}
    </section>
  );
}
