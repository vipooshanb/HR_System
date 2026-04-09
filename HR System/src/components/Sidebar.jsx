const navigationItems = [
  {
    label: 'Dashboard',
    view: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="13" y="3" width="8" height="5" rx="2" fill="currentColor" opacity="0.85" />
        <rect x="13" y="10" width="8" height="11" rx="2" fill="currentColor" opacity="0.72" />
        <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Candidates',
    view: 'Candidates',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M16.5 12.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5.5 16.5 5.5 13 7.07 13 9s1.57 3.5 3.5 3.5ZM7.5 11.5A3.5 3.5 0 1 0 7.5 4.5a3.5 3.5 0 0 0 0 7Zm9 2c-2.67 0-8 1.34-8 4v1.5h16V17.5c0-2.66-5.33-4-8-4Zm-9 0c-.92 0-2.15.17-3.25.5C2.1 14.4 1 15.39 1 16.75V20h4.5v-1.5c0-1.1.34-2.04.96-2.82.26-.32.56-.62.89-.88-.24-.17-.42-.3-.65-.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Calendar',
    view: 'Calendar',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 3v4M17 3v4M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="6" y="12" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="11" y="12" width="3" height="3" rx="0.8" fill="currentColor" opacity="0.72" />
        <rect x="16" y="12" width="3" height="3" rx="0.8" fill="currentColor" opacity="0.55" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    view: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.02-1.58a.5.5 0 0 0 .12-.63l-1.91-3.3a.5.5 0 0 0-.6-.22l-2.39.96a7.13 7.13 0 0 0-1.63-.94l-.36-2.53A.5.5 0 0 0 14.4 1h-3.82a.5.5 0 0 0-.49.42l-.36 2.53c-.58.23-1.13.54-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L3.2 7.45a.5.5 0 0 0 .12.63l2.02 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L3.32 13.12a.5.5 0 0 0-.12.63l1.91 3.3a.5.5 0 0 0 .6.22l2.39-.96c.5.4 1.05.71 1.63.94l.36 2.53a.5.5 0 0 0 .49.42h3.82a.5.5 0 0 0 .49-.42l.36-2.53c.58-.23 1.13-.54 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.91-3.3a.5.5 0 0 0-.12-.63l-2.02-1.58ZM12 15.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

function Sidebar({ activeView, onSelectView }) {
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
            className={`sidebar__nav-item${item.view === activeView ? ' is-active' : ''}`}
            aria-current={item.view === activeView ? 'page' : undefined}
            aria-label={item.label}
            data-label={item.label}
            onClick={() => onSelectView(item.view)}
          >
            <span className="sidebar__nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="sidebar__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
