function Header({ title, description, statLabel, statValue }) {
  return (
    <header className="header">
      <div className="header__copy">
        <p className="header__eyebrow">HR workspace</p>
        <h1 className="header__title">{title}</h1>
        <div className="header__meta">
          <span>{description}</span>
          <span className="header__dot" aria-hidden="true" />
          <span>
            {statLabel}: {statValue}
          </span>
        </div>
      </div>

      <div className="header__actions">
        <div className="header__crumb">
          <span className="header__crumb-label">Active view</span>
          <strong>{title}</strong>
        </div>
      </div>
    </header>
  )
}

export default Header
