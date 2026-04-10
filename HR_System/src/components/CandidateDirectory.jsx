import { useState } from 'react'
import EmptyState from './EmptyState'
import { stageOrder } from '../data/dummyCandidates'
import { getAvatarVariant, getCandidateInitials } from '../utils/avatar'

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
  onDeleteCandidate,
  onAddCandidate,
}) {
  const [copiedKey, setCopiedKey] = useState('')

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(''), 1200)
    } catch {
      setCopiedKey('')
    }
  }

  return (
    <section className="directory" aria-label="Candidate directory">
      <div className="directory__header">
        <div>
          <p className="directory__eyebrow">Candidate directory</p>
          <h2>Applied candidates</h2>
          <p>Search, filter, and review every applicant in one place.</p>
        </div>
        <div className="directory__header-actions">
          <div className="directory__count">
            <strong>{candidates.length}</strong>
            <span>matches</span>
          </div>
          <button type="button" className="primary-button" onClick={onAddCandidate}>
            Add candidate
          </button>
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
              <option key={position.id} value={position.name}>
                {position.name}
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
            <span>Actions</span>
          </div>

          {candidates.map((candidate) => {
            const appliedPosition = candidate.appliedPosition ?? candidate.role
            const initials = getCandidateInitials(candidate.name)
            const avatarVariant = getAvatarVariant(candidate.id)

            return (
              <div key={candidate.id} className="candidate-row candidate-row--with-actions">
                <button
                  type="button"
                  className="candidate-row__main"
                  onClick={() => onSelectCandidate(candidate)}
                >
                  <div className="candidate-row__identity">
                    <div className={`avatar ${avatarVariant}`} aria-hidden="true">
                      {initials}
                    </div>
                    <div className="candidate-row__nameblock">
                      <strong>{candidate.name}</strong>
                      <span>{candidate.applicationDate}</span>
                    </div>
                  </div>

                  <div className="candidate-row__contact">
                    <span className="candidate-row__contact-item">
                      {candidate.phone}
                      <button
                        type="button"
                        className="copy-button"
                        aria-label="Copy phone number"
                        title="Copy phone"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleCopy(candidate.phone, `${candidate.id}-phone`)
                        }}
                      >
                        {copiedKey === `${candidate.id}-phone` ? (
                          <svg className="copy-button__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg className="copy-button__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="9" y="9" width="10" height="10" rx="2" />
                            <rect x="5" y="5" width="10" height="10" rx="2" />
                          </svg>
                        )}
                      </button>
                    </span>
                    <span className="candidate-row__contact-item">
                      {candidate.email}
                      <button
                        type="button"
                        className="copy-button"
                        aria-label="Copy email address"
                        title="Copy email"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleCopy(candidate.email, `${candidate.id}-email`)
                        }}
                      >
                        {copiedKey === `${candidate.id}-email` ? (
                          <svg className="copy-button__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg className="copy-button__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="9" y="9" width="10" height="10" rx="2" />
                            <rect x="5" y="5" width="10" height="10" rx="2" />
                          </svg>
                        )}
                      </button>
                    </span>
                  </div>

                  <div className="candidate-row__position">
                    <span>{appliedPosition}</span>
                  </div>

                  <div className="candidate-row__stage">
                    <span className="pill pill--score">{candidate.stage}</span>
                  </div>
                </button>

                <div className="candidate-row__actions">
                  <button
                    type="button"
                    className="ghost-button ghost-button--small"
                    onClick={() => onSelectCandidate(candidate)}
                    aria-label="Edit candidate"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ghost-button ghost-button--small ghost-button--danger"
                    onClick={() => {
                      if (window.confirm(`Delete candidate ${candidate.name}?`)) {
                        onDeleteCandidate(candidate.id)
                      }
                    }}
                    aria-label="Delete candidate"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
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