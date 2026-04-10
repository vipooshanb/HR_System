import { useState } from 'react'
import CandidateCard from './CandidateCard'
import EmptyState from './EmptyState'

function StageColumn({ stage, candidates, onSelectCandidate, onDropCandidate, onDragStart, onDragEnd }) {
  const [isDropTarget, setIsDropTarget] = useState(false)

  const handleDrop = (event) => {
    event.preventDefault()
    const candidateId = event.dataTransfer.getData('text/candidate-id')
    setIsDropTarget(false)
    if (!candidateId) {
      return
    }
    onDropCandidate(candidateId, stage.name)
  }

  return (
    <section
      className={`stage-column${isDropTarget ? ' is-drop-target' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDropTarget(true)
      }}
      onDragEnter={(event) => {
        event.preventDefault()
        setIsDropTarget(true)
      }}
      onDragLeave={() => setIsDropTarget(false)}
      onDrop={handleDrop}
    >
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
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
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
