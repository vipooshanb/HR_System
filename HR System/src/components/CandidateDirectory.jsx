import EmptyState from './EmptyState'
import { stageOrder } from '../data/dummyCandidates'

function CandidateDirectory({
  candidates,
  searchTerm,
  onSearchTermChange,
  stageFilter,
  onStageFilterChange,
  positionFilter,
  onPositionFilterChange,
  positions,
  onResetFilters,
  onSelectCandidate,
}) {
  return (
    <section className="directory" aria-label="Candidate directory">
      <div className="directory__header">
        <div>
          <p className="directory__eyebrow">Candidate directory</p>
          <h2>Applied candidates</h2>
          <p>Search, filter, and review every applicant in one place.</p>
        </div>
        <div className="directory__count">
          <strong>{candidates.length}</strong>
          <span>matches</span>
        </div>
      </div>

      <div className="directory__filters">
        <label className="field field--search">
          <span className="sr-only">Search candidates</span>
          <input
            type="search"
            placeholder="Search candidates, email, phone, or position"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">Stage</span>
          <select value={stageFilter} onChange={(event) => onStageFilterChange(event.target.value)}>
            <option value="All">All stages</option>
            {stageOrder.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Applied position</span>
          <select value={positionFilter} onChange={(event) => onPositionFilterChange(event.target.value)}>
            <option value="All">All positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="ghost-button" onClick={onResetFilters}>
          Reset filters
        </button>
      </div>

      {candidates.length ? (
        <div className="directory__list">
          <div className="directory__list-head" aria-hidden="true">
            <span>Candidate</span>
            <span>Contact</span>
            <span>Applied position</span>
            <span>Stage</span>
          </div>

          {candidates.map((candidate) => {
            const appliedPosition = candidate.appliedPosition ?? candidate.role
            const initials = candidate.name
              .split(' ')
              .map((part) => part.charAt(0))
              .slice(0, 2)
              .join('')

            return (
              <button
                key={candidate.id}
                type="button"
                className="candidate-row"
                onClick={() => onSelectCandidate(candidate)}
              >
                <div className="candidate-row__identity">
                  <div className={`avatar avatar--${candidate.id.slice(-1)}`} aria-hidden="true">
                    {initials}
                  </div>
                  <div className="candidate-row__nameblock">
                    <strong>{candidate.name}</strong>
                    <span>{candidate.applicationDate}</span>
                  </div>
                </div>

                <div className="candidate-row__contact">
                  <span>{candidate.phone}</span>
                  <span>{candidate.email}</span>
                </div>

                <div className="candidate-row__position">
                  <span>{appliedPosition}</span>
                </div>

                <div className="candidate-row__stage">
                  <span className="pill pill--score">{candidate.stage}</span>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="No matching candidates"
          description="Try widening the search, stage, or applied position filters."
        />
      )}
    </section>
  )
}

export default CandidateDirectory