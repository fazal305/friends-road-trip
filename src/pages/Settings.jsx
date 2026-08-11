import { useState } from 'react'
import Button from '../components/common/Button.jsx'
import ThemeSection from '../components/settings/ThemeSection.jsx'
import TripConfigForm from '../components/settings/TripConfigForm.jsx'
import VehicleSettings from '../components/settings/VehicleSettings.jsx'
import DataSettings from '../components/settings/DataSettings.jsx'
import ShortcutsModal from '../components/layout/ShortcutsModal.jsx'
import './Settings.css'

export default function Settings() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  return (
    <div className="settings-page">
      <ThemeSection />

      <section className="settings-section surface-card">
        <h2>Keyboard shortcuts</h2>
        <p className="settings-section__description">Navigate Convoy without touching the mouse.</p>
        <Button variant="secondary" onClick={() => setShortcutsOpen(true)}>View shortcuts</Button>
      </section>

      <TripConfigForm />
      <VehicleSettings />
      <DataSettings />

      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}
