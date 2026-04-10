import { getAvatarVariant, getCandidateInitials } from '../utils/avatar'

function CandidateCard({ candidate, onClick, onDragStart, onDragEnd }) {
  const scoreLabel = candidate.overallScore > 0 ? `${candidate.overallScore.toFixed(1)} Overall` : 'No score yet'
  const avatarVariant = getAvatarVariant(candidate.id)
  const initials = getCandidateInitials(candidate.name)

  return (
    <button
      type="button"
      className="candidate-card"
      onClick={onClick}
      draggable
      onDragStart={(event) => onDragStart(event, candidate.id)}
      onDragEnd={onDragEnd}
      title="Drag to move between stages"
    >
      <div className="candidate-card__top">
        <div className={`avatar ${avatarVariant}`} aria-hidden="true">
          {initials}
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
        ) : candidate.stage === 'Interview' ? (
          <span className="candidate-card__action candidate-card__action--accent">Add assessment</span>
        ) : (
          <span className="candidate-card__action">Assessment available in Interview stage</span>
        )}
        <span className="candidate-card__chevron" aria-hidden="true">
          ›
        </span>
      </div>
    </button>
  )
}

export default CandidateCard
