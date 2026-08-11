import './Loader.css'

/** Small inline spinner. `overlay` renders it centered over a translucent backdrop for in-place loading states. */
export default function Loader({ overlay = false, label = 'Loading' }) {
  const spinner = <span className="loader" role="status" aria-label={label} />
  if (!overlay) return spinner
  return (
    <div className="loader-overlay">
      {spinner}
    </div>
  )
}
