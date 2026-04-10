import { stageOrder } from '../constants/stageOrder'
import StageColumn from './StageColumn'

function KanbanBoard({ candidates, searchTerm, selectedStage, onSelectCandidate, onMoveCandidate }) {
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === 'All' ? true : candidate.stage === selectedStage
    return matchesSearch && matchesStage
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
