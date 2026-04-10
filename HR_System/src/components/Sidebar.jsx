const navigationItems = [
  {
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="10" width="8" height="11" rx="2" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
      </svg>
    ),
  },
  {
    label: 'Candidate',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20a8 8 0 1 1 16 0" />
      </svg>
    ),
  },
  {
    label: 'Calendar',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    ),
  },
]

function Sidebar({ activeView, onChangeView, onLogout }) {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar__brand">
        <span className="sidebar__logo">HR</span>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`sidebar__nav-item${activeView === item.label ? ' is-active' : ''}`}
            aria-current={activeView === item.label ? 'page' : undefined}
            aria-label={item.label}
            onClick={() => onChangeView(item.label)}
          >
            <span className="sidebar__nav-icon" aria-hidden="true">{item.icon}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className={`sidebar__settings${activeView === 'Settings' ? ' is-active' : ''}`}
          aria-label="Settings"
          onClick={() => onChangeView('Settings')}
        >
          <span className="sidebar__nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
              <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1.1-1.1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.6a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1.1-1.1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.6a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1v1.6a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6z" />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="sidebar__settings sidebar__logout"
          aria-label="Logout"
          onClick={onLogout}
        >
          <span className="sidebar__nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
