function Header({ activeCount, selectedTab, positionOptions, selectedPosition, onChangePosition }) {
  return (
    <header className="header">
      <div className="header__copy">
        <p className="header__eyebrow">Recruitment pipeline</p>
        <div className="header__title-wrap">
          <label className="sr-only" htmlFor="dashboard-position-select">
            Select position
          </label>
          <select
            id="dashboard-position-select"
            className="header__title-select"
            value={selectedPosition}
            onChange={(event) => onChangePosition(event.target.value)}
          >
            {positionOptions.map((position) => (
              <option key={position.id} value={position.name}>
                {position.name}
              </option>
            ))}
          </select>
        </div>
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
      </div>
    </header>
  )
}

export default Header
