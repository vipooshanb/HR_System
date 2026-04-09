function CalendarView() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthLabel = today.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const leadingDays = firstDay.getDay()
  const totalDays = lastDay.getDate()
  const previousMonthTotal = new Date(year, month, 0).getDate()

  const days = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - leadingDays + 1
    const isPreviousMonth = dayNumber < 1
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= totalDays
    const isNextMonth = dayNumber > totalDays
    const displayDay = isPreviousMonth
      ? previousMonthTotal + dayNumber
      : isNextMonth
        ? dayNumber - totalDays
        : dayNumber

    const date = isCurrentMonth ? new Date(year, month, dayNumber) : null
    const isToday =
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    return {
      displayDay,
      isCurrentMonth,
      isToday,
    }
  })

  return (
    <section className="calendar-view" aria-label="Monthly calendar">
      <div className="calendar-view__header">
        <div>
          <p className="calendar-view__eyebrow">Calendar</p>
          <h2>{monthLabel}</h2>
          <p>Static month view for dates only. No day cells are clickable.</p>
        </div>
        <div className="calendar-view__badge">
          <strong>{totalDays}</strong>
          <span>days in month</span>
        </div>
      </div>

      <div className="calendar-grid" role="presentation">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
          <div key={label} className="calendar-grid__weekday">
            {label}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={`${day.displayDay}-${index}`}
            className={`calendar-grid__day${day.isCurrentMonth ? '' : ' is-muted'}${day.isToday ? ' is-today' : ''}`}
          >
            <span>{day.displayDay}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CalendarView