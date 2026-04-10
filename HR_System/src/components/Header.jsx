function Header({ activeCount, selectedTab }) {
  return (
    <header className="header">
      <div className="header__copy">
        <p className="header__eyebrow">Recruitment pipeline</p>
        <h1 className="header__title">Research and Development Officer</h1>
        <div className="header__meta">
          <span className="chip chip--success">Open</span>
          <span className="header__dot" aria-hidden="true" />
          <span>Researcher</span>
          <span className="header__dot" aria-hidden="true" />
          <span>Onsite</span>
          <span className="header__dot" aria-hidden="true" />
          <span>{activeCount} active candidates</span>
        </div>
      </div>

      <div className="header__actions">
        <div className="header__crumb">
          <span className="header__crumb-label">Current tab</span>
          <strong>{selectedTab}</strong>
        </div>
        <button type="button" className="primary-button">
          Share &amp; Promote
        </button>
      </div>
    </header>
  )
}

export default Header
