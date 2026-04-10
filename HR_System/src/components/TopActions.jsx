function TopActions({ selectedCount }) {
  return (
    <div className="top-actions">
      <div className="top-actions__summary">
        <span className="top-actions__label">Pipeline snapshot</span>
        <strong>{selectedCount} visible candidates</strong>
      </div>
    </div>
  )
}

export default TopActions
