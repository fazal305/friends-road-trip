import { NavLink } from 'react-router-dom'
import Icon from '../common/Icon.jsx'
import { NAV_ITEMS } from './navItems.js'
import { useTrip } from '../../hooks/useTrip.js'
import './Sidebar.css'

export default function Sidebar() {
  const { trip } = useTrip()

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <span className="sidebar__logo">Convoy</span>
        <span className="sidebar__trip-name">{trip.name}</span>
      </div>

      <nav className="sidebar__nav">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
              >
                <Icon name={item.icon} size={19} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__route">
          {trip.startLocation} → {trip.destination}
        </span>
      </div>
    </aside>
  )
}
