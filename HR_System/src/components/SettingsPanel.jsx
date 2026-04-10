import { useEffect, useRef, useState } from 'react'

const themeOptions = [
  { label: 'System', value: 'system' },
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
]

function SettingsPanel({ themeMode, onSetThemeMode, onCloseSettings }) {
  const [activeSection, setActiveSection] = useState('general')
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    return () => window.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const activeThemeLabel = themeOptions.find((option) => option.value === themeMode)?.label || 'System'

  return (
    <section className="settings-shell" aria-label="Settings">
      <aside className="settings-shell__sidebar" aria-label="Settings sections">
        <button type="button" className="settings-shell__close" onClick={onCloseSettings} aria-label="Close settings">
          X
        </button>

        <button
          type="button"
          className={`settings-shell__item ${activeSection === 'general' ? 'is-active' : ''}`}
          onClick={() => setActiveSection('general')}
        >
          <span className="settings-shell__item-icon" aria-hidden="true">G</span>
          <span>General</span>
        </button>

        <button
          type="button"
          className={`settings-shell__item ${activeSection === 'about' ? 'is-active' : ''}`}
          onClick={() => setActiveSection('about')}
        >
          <span className="settings-shell__item-icon" aria-hidden="true">A</span>
          <span>About</span>
        </button>
      </aside>

      <section className="settings-shell__content">
        <header className="settings-shell__content-header">
          <h2>{activeSection === 'general' ? 'General' : 'About'}</h2>
        </header>

        {activeSection === 'general' ? (
          <div className="settings-shell__panel">
            <div className="settings-shell__row">
              <div className="settings-shell__row-copy">
                <span className="settings-shell__row-label">Appearance</span>
              </div>

              <div className="settings-shell__dropdown" ref={menuRef}>
                <button
                  type="button"
                  className="settings-shell__dropdown-trigger"
                  onClick={() => setIsThemeMenuOpen((current) => !current)}
                  aria-haspopup="menu"
                  aria-expanded={isThemeMenuOpen}
                >
                  <span>{activeThemeLabel}</span>
                  <span className="settings-shell__chevron" aria-hidden="true">v</span>
                </button>

                {isThemeMenuOpen ? (
                  <div className="settings-shell__dropdown-menu" role="menu" aria-label="Appearance options">
                    {themeOptions.map((option) => {
                      const isActive = option.value === themeMode

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`settings-shell__dropdown-item ${isActive ? 'is-active' : ''}`}
                          onClick={() => {
                            onSetThemeMode(option.value)
                            setIsThemeMenuOpen(false)
                          }}
                          role="menuitemradio"
                          aria-checked={isActive}
                        >
                          <span>{option.label}</span>
                          <span className="settings-shell__check" aria-hidden="true">
                            {isActive ? 'v' : ''}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <article className="settings-shell__about">
            <section className="settings-shell__about-card">
              <h3>What this project does</h3>
              <p>
                This HR dashboard helps manage positions, candidate pipelines, and recruiter workflows in one place.
              </p>
            </section>

            <section className="settings-shell__about-card">
              <h3>Features</h3>
              <ul>
                <li>Protected login access for authorized users.</li>
                <li>Position management for roles like Research, Frontend, and Product.</li>
                <li>Kanban pipeline with drag-and-drop candidate movement.</li>
                <li>Candidate directory with filters, edit, delete, and copy actions.</li>
                <li>Calendar planning views for month, week, and year tracking.</li>
                <li>Light, dark, and system theme support with saved preference.</li>
              </ul>
            </section>

            <section className="settings-shell__about-card">
              <h3>How to use</h3>
              <ul>
                <li>Use General to change appearance settings.</li>
                <li>Use About to review the product features.</li>
                <li>Return to Dashboard to switch the position and inspect each pipeline.</li>
              </ul>
            </section>
          </article>
        )}
      </section>
    </section>
  )
}

export default SettingsPanel