import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from '../common/Icon.jsx'
import { NAV_ITEMS, MOBILE_PRIMARY_NAV } from './navItems.js'
import './MobileNav.css'

export default function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // Close the drawer automatically whenever navigation happens.
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  const primaryItems = NAV_ITEMS.filter((item) => MOBILE_PRIMARY_NAV.includes(item.to))
  const moreActive = !MOBILE_PRIMARY_NAV.includes(
    NAV_ITEMS.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))?.to,
  )

  return (
    <>
      <nav className="mobile-nav" aria-label="Primary navigation">
        {primaryItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`mobile-nav__link${moreActive ? ' mobile-nav__link--active' : ''}`}
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
        >
          <Icon name="menu" size={20} />
          <span>More</span>
        </button>
      </nav>

      {drawerOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="All sections">
          <button
            type="button"
            className="mobile-drawer__backdrop"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="mobile-drawer__sheet">
            <div className="mobile-drawer__header">
              <span className="mobile-drawer__title">All sections</span>
              <button type="button" className="mobile-drawer__close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                <Icon name="close" size={20} />
              </button>
            </div>
            <ul className="mobile-drawer__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `mobile-drawer__link${isActive ? ' mobile-drawer__link--active' : ''}`}
                  >
                    <Icon name={item.icon} size={19} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
