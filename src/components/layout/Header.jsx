import { useLocation } from 'react-router-dom'
import Icon from '../common/Icon.jsx'
import { NAV_ITEMS } from './navItems.js'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useCountdown } from '../../hooks/useCountdown.js'
import { useTrip } from '../../hooks/useTrip.js'
import './Header.css'

export default function Header({ onShowShortcuts }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { trip } = useTrip()
  const countdown = useCountdown(trip.startDate)

  const currentItem = NAV_ITEMS.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))
  const title = currentItem?.label ?? 'Convoy'

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>

      <div className="header__actions">
        {!countdown.isPast && (
          <span className="header__countdown" title={`Trip starts ${trip.startDate}`}>
            <Icon name="calendar" size={16} />
            {countdown.days}d {countdown.hours}h to go
          </span>
        )}
        <button
          type="button"
          className="header__theme-toggle"
          onClick={onShowShortcuts}
          aria-label="Show keyboard shortcuts"
          title="Keyboard shortcuts (?)"
        >
          ?
        </button>
        <button
          type="button"
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
      </div>
    </header>
  )
}
