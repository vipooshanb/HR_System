function CandidateModal({ candidate, isOpen, onClose, onSave, stageOrder }) {
  if (!isOpen || !candidate) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Candidate details</p>
            <h2 id="candidate-modal-title">{candidate.name}</h2>
          </div>
          <button type="button" className="ghost-button ghost-button--inline" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal__content">
          <section className="modal__card">
            <div className={`avatar avatar--${candidate.id.slice(-1)} avatar--large`} aria-hidden="true">
              {candidate.name
                .split(' ')
                .map((part) => part.charAt(0))
                .slice(0, 2)
                .join('')}
            </div>
            <div className="modal__facts">
              <p><strong>Applied Position:</strong> {candidate.appliedPosition ?? candidate.role}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Phone:</strong> {candidate.phone}</p>
              <p><strong>Location:</strong> {candidate.location}</p>
            </div>
          </section>

          <section className="modal__card">
            <label className="field field--stacked">
              <span className="field__label">Stage</span>
              <select
                value={candidate.stage}
                onChange={(event) => onSave({ ...candidate, stage: event.target.value })}
              >
                {stageOrder.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </label>

            <div className="modal__grid">
              <div>
                <span className="modal__stat-label">Applied</span>
                <strong>{candidate.applicationDate}</strong>
              </div>
              <div>
                <span className="modal__stat-label">Score</span>
                <strong>{candidate.overallScore > 0 ? candidate.overallScore.toFixed(1) : 'N/A'}</strong>
              </div>
              <div>
                <span className="modal__stat-label">Referral</span>
                <strong>{candidate.referred ? 'Yes' : 'No'}</strong>
              </div>
              <div>
                <span className="modal__stat-label">Assessment</span>
                <strong>{candidate.assessmentAdded ? 'Added' : 'Pending'}</strong>
              </div>
            </div>
          </section>

          <section className="modal__card modal__card--full">
            <span className="modal__stat-label">Notes</span>
            <p>{candidate.notes}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CandidateModal
