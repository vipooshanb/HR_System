function TabsNav({ tabs, activeTab, onSelectTab }) {
  return (
    <nav className="tabs-nav" aria-label="Candidate sections">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tabs-nav__item${tab === activeTab ? ' is-active' : ''}`}
          onClick={() => onSelectTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default TabsNav
