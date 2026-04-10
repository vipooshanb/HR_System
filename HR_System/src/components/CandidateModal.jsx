import { useEffect, useState } from 'react'
import { getAvatarVariant, getCandidateInitials } from '../utils/avatar'

function CandidateModal({ candidate, isOpen, onClose, onSave, stageOrder, positions }) {
  const [draft, setDraft] = useState(candidate)

  useEffect(() => {
    setDraft(candidate)
  }, [candidate])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !candidate) {
    return null
  }

  const workingCandidate = draft || candidate
  const initials = getCandidateInitials(workingCandidate.name)
  const avatarVariant = getAvatarVariant(candidate.id)

  const handleChange = (field, value) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(draft)
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
            <h2 id="candidate-modal-title">{workingCandidate.name}</h2>
          </div>
          <div className="modal__actions">
            <button type="button" className="ghost-button ghost-button--inline" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="primary-button" onClick={handleSave}>
              Save changes
            </button>
          </div>
        </div>

        <div className="modal__content">
          <section className="modal__card">
            <div className={`avatar ${avatarVariant} avatar--large`} aria-hidden="true">
              {initials}
            </div>

            <label className="field field--stacked">
              <span className="field__label">Name</span>
              <input
                type="text"
                  value={workingCandidate.name}
                onChange={(event) => handleChange('name', event.target.value)}
              />
            </label>

            <label className="field field--stacked">
              <span className="field__label">Email</span>
              <input
                type="email"
                  value={workingCandidate.email}
                onChange={(event) => handleChange('email', event.target.value)}
              />
            </label>

            <label className="field field--stacked">
              <span className="field__label">Phone</span>
              <input
                type="text"
                  value={workingCandidate.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
              />
            </label>

            <label className="field field--stacked">
              <span className="field__label">Location</span>
              <input
                type="text"
                  value={workingCandidate.location}
                onChange={(event) => handleChange('location', event.target.value)}
              />
            </label>

            <div className="field field--stacked">
              <span className="field__label">Referral</span>
              <label className="toggle-field">
                <input
                  type="checkbox"
                  checked={Boolean(workingCandidate.referred)}
                  onChange={(event) => handleChange('referred', event.target.checked)}
                />
                <span>Mark as referred candidate</span>
              </label>
            </div>
          </section>

          <section className="modal__card">
            <label className="field field--stacked">
              <span className="field__label">Applied position</span>
              <select
                value={workingCandidate.appliedPosition || workingCandidate.role}
                onChange={(event) => {
                  handleChange('appliedPosition', event.target.value)
                  handleChange('role', event.target.value)
                }}
              >
                {positions.map((position) => (
                  <option key={position.id} value={position.name}>
                    {position.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field field--stacked">
              <span className="field__label">Stage</span>
              <select
                value={workingCandidate.stage}
                onChange={(event) => handleChange('stage', event.target.value)}
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
                <strong>{workingCandidate.applicationDate}</strong>
              </div>
              <div>
                <span className="modal__stat-label">Referral</span>
                <strong>{workingCandidate.referred ? 'Yes' : 'No'}</strong>
              </div>
            </div>

            <div className="modal__checkbox-block">
              <span className="modal__stat-label">Assessment</span>
              <label className="toggle-field">
                <input
                  type="checkbox"
                  checked={Boolean(workingCandidate.assessmentAdded)}
                  onChange={(event) => handleChange('assessmentAdded', event.target.checked)}
                />
                <span>Assessment added</span>
              </label>
            </div>
          </section>

          <section className="modal__card modal__card--full">
            <span className="modal__stat-label">Notes</span>
            <textarea
              className="modal__notes"
              value={workingCandidate.notes}
              onChange={(event) => handleChange('notes', event.target.value)}
              rows="4"
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default CandidateModal
