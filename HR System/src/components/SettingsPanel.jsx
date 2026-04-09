function SettingsPanel({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <section className="settings-panel" aria-label="Settings">
      <div className="settings-panel__header">
        <div>
          <p className="settings-panel__eyebrow">Settings</p>
          <h2>Appearance</h2>
          <p>Theme switching lives here only, as requested.</p>
        </div>
      </div>

      <div className="settings-panel__card">
        <div className="settings-panel__copy">
          <span className="settings-panel__label">Light mode / Dark mode</span>
          <strong>{isDark ? 'Dark mode is active' : 'Light mode is active'}</strong>
          <p>
            Use the toggle to switch the whole app theme. The rest of the interface does not show
            any other theme control.
          </p>
        </div>

        <button
          type="button"
          className={`theme-switch${isDark ? ' is-dark' : ''}`}
          onClick={onToggleTheme}
          aria-pressed={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="theme-switch__track" aria-hidden="true">
            <span className="theme-switch__thumb" />
          </span>
          <span className="theme-switch__labels">
            <span>Light mode</span>
            <span>Dark mode</span>
          </span>
        </button>
      </div>
    </section>
  )
}

export default SettingsPanel