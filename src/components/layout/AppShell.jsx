import { useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import MobileNav from './MobileNav.jsx'
import ShortcutsModal from './ShortcutsModal.jsx'
import { NAV_ITEMS } from './navItems.js'
import PageTransition from '../common/PageTransition.jsx'
import ErrorBoundary from '../common/ErrorBoundary.jsx'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts.js'
import { NAV_SHORTCUT_KEYS } from '../../utils/shortcuts.js'
import './AppShell.css'

export default function AppShell() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  const shortcutsMap = useMemo(() => {
    const map = {}
    NAV_ITEMS.forEach((item, index) => {
      map[NAV_SHORTCUT_KEYS[index]] = () => navigate(item.to)
    })
    map.t = toggleTheme
    map['?'] = () => setShortcutsOpen(true)
    return map
  }, [navigate, toggleTheme])

  useKeyboardShortcuts(shortcutsMap)

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Header onShowShortcuts={() => setShortcutsOpen(true)} />
        <main className="app-shell__content">
          <PageTransition>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </PageTransition>
        </main>
      </div>
      <MobileNav />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}
