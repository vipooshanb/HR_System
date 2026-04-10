import { useState } from 'react'

function HomeView({ positions, candidates, onAddPosition, onDeletePosition, onUpdatePosition }) {
  const [isAddingPosition, setIsAddingPosition] = useState(false)
  const [isEditingPosition, setIsEditingPosition] = useState(false)
  const [editingPositionId, setEditingPositionId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    requirements: '',
    niceToHave: '',
    aboutWork: '',
    locationType: 'Hybrid',
  })

  const getCandidateCountByPosition = (positionName) => {
    return candidates.filter(
      (c) => (c.appliedPosition ?? c.role) === positionName
    ).length
  }

  const getPositionStyleClass = (positionName) => {
    if (positionName.toLowerCase().includes('fullstack') || positionName.toLowerCase().includes('full stack') || positionName.toLowerCase().includes('frontend') || positionName.toLowerCase().includes('backend')) {
      return 'position-card--green'
    }
    if (positionName.toLowerCase().includes('product') || positionName.toLowerCase().includes('manager') || positionName.toLowerCase().includes('lead')) {
      return 'position-card--red'
    }
    if (positionName.toLowerCase().includes('research') || positionName.toLowerCase().includes('development') || positionName.toLowerCase().includes('scientist') || positionName.toLowerCase().includes('engineer')) {
      return 'position-card--blue'
    }
    return 'position-card--default'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddPosition = (e) => {
    e.preventDefault()
    const newPosition = {
      id: crypto.randomUUID(),
      name: formData.name,
      deadline: formData.deadline,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      niceToHave: formData.niceToHave.split('\n').filter(r => r.trim()),
      aboutWork: formData.aboutWork,
      locationType: formData.locationType,
    }
    onAddPosition(newPosition)
    resetForm()
    setIsAddingPosition(false)
  }

  const handleEditPosition = (position) => {
    setEditingPositionId(position.id)
    setFormData({
      name: position.name,
      deadline: position.deadline,
      requirements: Array.isArray(position.requirements) ? position.requirements.join('\n') : position.requirements,
      niceToHave: Array.isArray(position.niceToHave) ? position.niceToHave.join('\n') : position.niceToHave,
      aboutWork: position.aboutWork,
      locationType: position.locationType,
    })
    setIsEditingPosition(true)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    const updatedPosition = {
      id: editingPositionId,
      name: formData.name,
      deadline: formData.deadline,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      niceToHave: formData.niceToHave.split('\n').filter(r => r.trim()),
      aboutWork: formData.aboutWork,
      locationType: formData.locationType,
    }
    onUpdatePosition(updatedPosition)
    resetForm()
    setIsEditingPosition(false)
    setEditingPositionId(null)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      deadline: '',
      requirements: '',
      niceToHave: '',
      aboutWork: '',
      locationType: 'Hybrid',
    })
  }

  return (
    <section className="home-view" aria-label="Home">
      <div className="home-view__header">
        <div>
          <p className="home-view__eyebrow">Hiring Overview</p>
          <h2>Available Positions</h2>
          <p>Manage open positions and track applications per role.</p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsAddingPosition(true)}
        >
          Add Position
        </button>
      </div>

      {isAddingPosition && (
        <div className="position-form-modal" role="presentation" onClick={() => setIsAddingPosition(false)}>
          <div className="position-form" onClick={(e) => e.stopPropagation()}>
            <div className="position-form__header">
              <h3>Create New Position</h3>
              <button
                type="button"
                className="ghost-button ghost-button--inline"
                onClick={() => setIsAddingPosition(false)}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAddPosition} className="position-form__content">
              <label className="field field--stacked">
                <span className="field__label">Position Name *</span>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Deadline *</span>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Location Type *</span>
                <select
                  name="locationType"
                  value={formData.locationType}
                  onChange={handleInputChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>

              <label className="field field--stacked">
                <span className="field__label">About the Work *</span>
                <textarea
                  name="aboutWork"
                  placeholder="Describe the role and responsibilities..."
                  value={formData.aboutWork}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Requirements (one per line) *</span>
                <textarea
                  name="requirements"
                  placeholder="e.g., 5+ years experience&#10;JavaScript proficiency&#10;Team collaboration skills"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Nice to Have (one per line)</span>
                <textarea
                  name="niceToHave"
                  placeholder="e.g., AWS experience&#10;Published articles&#10;Open source contributions"
                  value={formData.niceToHave}
                  onChange={handleInputChange}
                  rows="3"
                />
              </label>

              <div className="position-form__actions">
                <button type="button" className="ghost-button" onClick={() => setIsAddingPosition(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Create Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditingPosition && (
        <div className="position-form-modal" role="presentation" onClick={() => setIsEditingPosition(false)}>
          <div className="position-form" onClick={(e) => e.stopPropagation()}>
            <div className="position-form__header">
              <h3>Edit Position</h3>
              <button
                type="button"
                className="ghost-button ghost-button--inline"
                onClick={() => {
                  setIsEditingPosition(false)
                  resetForm()
                }}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="position-form__content">
              <label className="field field--stacked">
                <span className="field__label">Position Name *</span>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Deadline *</span>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Location Type *</span>
                <select
                  name="locationType"
                  value={formData.locationType}
                  onChange={handleInputChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>

              <label className="field field--stacked">
                <span className="field__label">About the Work *</span>
                <textarea
                  name="aboutWork"
                  placeholder="Describe the role and responsibilities..."
                  value={formData.aboutWork}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Requirements (one per line) *</span>
                <textarea
                  name="requirements"
                  placeholder="e.g., 5+ years experience&#10;JavaScript proficiency&#10;Team collaboration skills"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </label>

              <label className="field field--stacked">
                <span className="field__label">Nice to Have (one per line)</span>
                <textarea
                  name="niceToHave"
                  placeholder="e.g., AWS experience&#10;Published articles&#10;Open source contributions"
                  value={formData.niceToHave}
                  onChange={handleInputChange}
                  rows="3"
                />
              </label>

              <div className="position-form__actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => {
                    setIsEditingPosition(false)
                    resetForm()
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {positions.length > 0 ? (
        <div className="positions-grid">
          {positions.map((position) => {
            const candidateCount = getCandidateCountByPosition(position.name)
            const styleClass = getPositionStyleClass(position.name)
            return (
              <div key={position.id} className={`position-card ${styleClass}`}>
                <div className="position-card__header">
                  <div>
                    <h3>{position.name}</h3>
                    <span className="position-card__location">{position.locationType}</span>
                  </div>
                  <div className="position-card__actions">
                    <button
                      type="button"
                      className="ghost-button ghost-button--inline"
                      onClick={() => handleEditPosition(position)}
                      aria-label="Edit position"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ghost-button ghost-button--inline ghost-button--danger"
                      onClick={() => {
                        if (window.confirm(`Delete position "${position.name}"?`)) {
                          onDeletePosition(position.id)
                        }
                      }}
                      aria-label="Delete position"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="position-card__body">
                  <p className="position-card__description">{position.aboutWork}</p>

                  <div className="position-card__deadline">
                    <span className="position-card__label">Deadline</span>
                    <strong>{new Date(position.deadline).toLocaleDateString()}</strong>
                  </div>

                  <div className="position-card__candidates">
                    <span className="position-card__label">Applied</span>
                    <strong>{candidateCount}</strong>
                  </div>

                  <div className="position-card__details">
                    <div>
                      <span className="position-card__label">Requirements</span>
                      <ul>
                        {position.requirements.slice(0, 2).map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                        {position.requirements.length > 2 && (
                          <li>+{position.requirements.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: '20px' }}>
          <strong>No positions yet</strong>
          <p>Create your first position to start hiring.</p>
        </div>
      )}
    </section>
  )
}

export default HomeView
