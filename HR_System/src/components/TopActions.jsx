function TopActions({ selectedCount, onCreateCandidate }) {
  return (
    <div className="top-actions">
      <div className="top-actions__summary">
        <span className="top-actions__label">Pipeline snapshot</span>
        <strong>{selectedCount} visible candidates</strong>
      </div>
      <button type="button" className="primary-button" onClick={onCreateCandidate}>
        Add candidate
      </button>
    </div>
  )
}

export default TopActions
