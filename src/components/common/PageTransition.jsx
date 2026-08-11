import { useLocation } from 'react-router-dom'
import './PageTransition.css'

/** Keys on pathname so React remounts on navigation, replaying the CSS entrance animation. Respects prefers-reduced-motion via the animation being disabled globally. */
export default function PageTransition({ children }) {
  const location = useLocation()
  return (
    <div className="page-transition" key={location.pathname}>
      {children}
    </div>
  )
}
