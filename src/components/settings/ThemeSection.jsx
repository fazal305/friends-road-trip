import Icon from '../common/Icon.jsx'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import './ThemeSection.css'

export default function ThemeSection() {
  const { theme, setTheme } = useTheme()

  return (
    <section className="settings-section surface-card">
      <h2>Appearance</h2>
      <p className="settings-section__description">Choose how Convoy looks on this device.</p>
      <div className="theme-section__options" role="radiogroup" aria-label="Theme">
        {['dark', 'light'].map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={theme === option}
            className={`theme-section__option${theme === option ? ' theme-section__option--active' : ''}`}
            onClick={() => setTheme(option)}
          >
            <Icon name={option === 'dark' ? 'moon' : 'sun'} size={18} />
            {option === 'dark' ? 'Dark' : 'Light'}
          </button>
        ))}
      </div>
      <p className="settings-section__hint">Animations automatically simplify if your system has reduced motion enabled.</p>
    </section>
  )
}
