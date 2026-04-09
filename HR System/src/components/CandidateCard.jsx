function CandidateCard({ candidate, onClick }) {
  const scoreLabel = candidate.overallScore > 0 ? `${candidate.overallScore.toFixed(1)} Overall` : 'No score yet'

  return (
    <button type="button" className="candidate-card" onClick={onClick}>
      <div className="candidate-card__top">
        <div className={`avatar avatar--${candidate.id.slice(-1)}`} aria-hidden="true">
          {candidate.name
            .split(' ')
            .map((part) => part.charAt(0))
            .slice(0, 2)
            .join('')}
        </div>
        <div className="candidate-card__heading">
          <strong>{candidate.name}</strong>
          <span>{candidate.applicationDate}</span>
        </div>
      </div>

      <div className="candidate-card__body">
        <span className="pill pill--score">★ {scoreLabel}</span>
        {candidate.referred ? <span className="pill pill--muted">Referred</span> : null}
      </div>

      <div className="candidate-card__footer">
        {candidate.assessmentAdded ? (
          <span className="candidate-card__action">Assessment added</span>
        ) : (
          <span className="candidate-card__action candidate-card__action--accent">Add assessment</span>
        )}
        <span className="candidate-card__chevron" aria-hidden="true">
          ›
        </span>
      </div>
    </button>
  )
}

export default CandidateCard
