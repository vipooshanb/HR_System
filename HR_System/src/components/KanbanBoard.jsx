import { stageOrder } from '../data/dummyCandidates'
import StageColumn from './StageColumn'

function KanbanBoard({ candidates, searchTerm, selectedStage, scoreFilter, onSelectCandidate, onMoveCandidate }) {
  const matchesScoreFilter = (candidate) => {
    if (scoreFilter === 'All') {
      return true
    }

    if (scoreFilter === '4+') {
      return candidate.overallScore >= 4
    }

    if (scoreFilter === '3-4') {
      return candidate.overallScore >= 3 && candidate.overallScore < 4
    }

    return candidate.overallScore > 0 && candidate.overallScore < 3
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === 'All' ? true : candidate.stage === selectedStage
    return matchesSearch && matchesStage && matchesScoreFilter(candidate)
  })

  return (
    <section className="board-wrap" aria-label="Candidate board">
      <div className="kanban-board">
        {stageOrder.map((stage) => {
          const stageCandidates = filteredCandidates.filter((candidate) => candidate.stage === stage)
          return (
            <StageColumn
              key={stage}
              stage={{ name: stage }}
              candidates={stageCandidates}
              onSelectCandidate={onSelectCandidate}
              onDropCandidate={onMoveCandidate}
              onDragStart={(event, candidateId) => {
                event.dataTransfer.setData('text/candidate-id', candidateId)
              }}
              onDragEnd={() => {}}
            />
          )
        })}
      </div>
    </section>
  )
}

export default KanbanBoard
