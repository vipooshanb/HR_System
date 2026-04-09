import CandidateCard from './CandidateCard'
import EmptyState from './EmptyState'

function StageColumn({ stage, candidates, onSelectCandidate }) {
  return (
    <section className="stage-column">
      <header className="stage-column__header">
        <div>
          <span className="stage-column__title">{stage.name}</span>
          <span className="stage-column__count">{candidates.length}</span>
        </div>
        <span className="stage-column__detail">Detail</span>
      </header>

      <div className="stage-column__content">
        {candidates.length ? (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={() => onSelectCandidate(candidate)}
            />
          ))
        ) : (
          <EmptyState
            title={`No candidates in ${stage.name}`}
            description="Try adjusting the search or filter options to reveal more profiles."
          />
        )}
      </div>
    </section>
  )
}

export default StageColumn
