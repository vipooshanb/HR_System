function FilterBar({ searchTerm, onSearchTermChange, stageFilter, onStageFilterChange, scoreFilter, onScoreFilterChange, stages, onResetFilters }) {
  return (
    <section className="filter-bar" aria-label="Search and filters">
      <label className="field field--search">
        <span className="sr-only">Search candidates</span>
        <input
          type="search"
          placeholder="Search candidates"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </label>

      <label className="field">
        <span className="field__label">Stage</span>
        <select value={stageFilter} onChange={(event) => onStageFilterChange(event.target.value)}>
          <option value="All">All stages</option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Score</span>
        <select value={scoreFilter} onChange={(event) => onScoreFilterChange(event.target.value)}>
          <option value="All">All scores</option>
          <option value="4+">4.0 and above</option>
          <option value="3-4">3.0 to 3.9</option>
          <option value="Below 3">Below 3.0</option>
        </select>
      </label>

      <button type="button" className="ghost-button" onClick={onResetFilters}>
        Reset filters
      </button>
    </section>
  )
}

export default FilterBar
