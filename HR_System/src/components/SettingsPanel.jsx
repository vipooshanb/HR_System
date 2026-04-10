import { useState } from 'react'

function SettingsPanel({ theme, onSetTheme }) {
  const isDark = theme === 'dark'
  const [activePanel, setActivePanel] = useState('appearance')

  return (
    <section className="settings-panel" aria-label="Settings">
      <div className="settings-panel__header">
        <div>
          <p className="settings-panel__eyebrow">Settings</p>
          <h2>System settings</h2>
          <p>Theme controls, usage instructions, and full feature overview.</p>
        </div>
        <div className="settings-panel__tabs">
          <button
            type="button"
            className={`ghost-button ghost-button--small ${activePanel === 'appearance' ? 'is-active' : ''}`}
            onClick={() => setActivePanel('appearance')}
          >
            Appearance
          </button>
          <button
            type="button"
            className={`ghost-button ghost-button--small ${activePanel === 'about' ? 'is-active' : ''}`}
            onClick={() => setActivePanel('about')}
          >
            About
          </button>
        </div>
      </div>

      {activePanel === 'appearance' ? (
        <div className="settings-panel__card">
          <div className="settings-panel__copy">
            <span className="settings-panel__label">Dark mode</span>
            <strong>{isDark ? 'Currently using dark theme' : 'Currently using light theme'}</strong>
            <p>
              Toggle between light and dark themes. Your preference is automatically saved.
            </p>
          </div>

          <div className="theme-toggle-group">
            <button
              type="button"
              className={`theme-button theme-button--light ${!isDark ? 'is-active' : ''}`}
              onClick={() => onSetTheme('light')}
              aria-pressed={!isDark}
              aria-label="Switch to light mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              Light
            </button>
            <button
              type="button"
              className={`theme-button theme-button--dark ${isDark ? 'is-active' : ''}`}
              onClick={() => onSetTheme('dark')}
              aria-pressed={isDark}
              aria-label="Switch to dark mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              Dark
            </button>
          </div>
        </div>
      ) : (
        <article className="settings-panel__about">
          <section className="settings-panel__about-card">
            <h3>Instructions</h3>
            <ul>
              <li>Use Home to manage available positions, deadlines, and requirements.</li>
              <li>Use Dashboard to monitor candidates by stage and drag profiles across columns.</li>
              <li>Use Candidate tab to search profiles, edit details, and copy contact info.</li>
              <li>Use Calendar to switch between month, week, and year planning views.</li>
              <li>Use Settings to change theme and view platform documentation.</li>
            </ul>
          </section>

          <section className="settings-panel__about-card">
            <h3>HR System Features</h3>
            <ul>
              <li>Secure login gate for authorized usage.</li>
              <li>Position CRUD management with candidate count per role.</li>
              <li>Kanban pipeline with stage updates and drag-and-drop movement.</li>
              <li>Candidate directory with filters, edit, delete, and copy actions.</li>
              <li>Assessment visibility rules based on interview stage.</li>
              <li>Responsive UI for desktop, tablet, and mobile screens.</li>
              <li>Light and dark themes with preference persistence.</li>
            </ul>
          </section>
        </article>
      )}
    </section>
  )
}

export default SettingsPanel