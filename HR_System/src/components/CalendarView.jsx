import { useState } from 'react'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarView() {
  const today = new Date()
  const [viewMode, setViewMode] = useState('month')
  const [cursorDate, setCursorDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const monthLabel = cursorDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const year = cursorDate.getFullYear()
  const month = cursorDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const leadingDays = firstDay.getDay()
  const totalDays = lastDay.getDate()
  const previousMonthTotal = new Date(year, month, 0).getDate()

  const monthGrid = Array.from({ length: 42 }, (_, index) => {
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

  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  const weekGrid = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + index)
    return {
      label: weekDays[index],
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    }
  })

  const yearGrid = Array.from({ length: 12 }, (_, monthIndex) => {
    const date = new Date(year, monthIndex, 1)
    return {
      month: monthIndex,
      label: date.toLocaleString('en-US', { month: 'long' }),
    }
  })

  const handlePrevious = () => {
    if (viewMode === 'year') {
      setCursorDate(new Date(cursorDate.getFullYear() - 1, cursorDate.getMonth(), 1))
      return
    }

    if (viewMode === 'week') {
      const date = new Date(cursorDate)
      date.setDate(cursorDate.getDate() - 7)
      setCursorDate(date)
      return
    }

    setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() - 1, 1))
  }

  const handleNext = () => {
    if (viewMode === 'year') {
      setCursorDate(new Date(cursorDate.getFullYear() + 1, cursorDate.getMonth(), 1))
      return
    }

    if (viewMode === 'week') {
      const date = new Date(cursorDate)
      date.setDate(cursorDate.getDate() + 7)
      setCursorDate(date)
      return
    }

    setCursorDate(new Date(cursorDate.getFullYear(), cursorDate.getMonth() + 1, 1))
  }

  return (
    <section className="calendar-view" aria-label="Calendar">
      <div className="calendar-view__header">
        <div>
          <p className="calendar-view__eyebrow">Calendar</p>
          <h2>{viewMode === 'year' ? cursorDate.getFullYear() : monthLabel}</h2>
          <p>Switch between month, year, and week views.</p>
        </div>

        <div className="calendar-view__controls">
          <div className="calendar-view__mode-switch">
            <button
              type="button"
              className={`ghost-button ghost-button--small ${viewMode === 'month' ? 'is-active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`ghost-button ghost-button--small ${viewMode === 'year' ? 'is-active' : ''}`}
              onClick={() => setViewMode('year')}
            >
              Year
            </button>
            <button
              type="button"
              className={`ghost-button ghost-button--small ${viewMode === 'week' ? 'is-active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
          </div>

          <div className="calendar-view__pager">
            <button type="button" className="ghost-button ghost-button--small" onClick={handlePrevious}>
              Prev
            </button>
            <button type="button" className="ghost-button ghost-button--small" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'month' ? (
        <div className="calendar-grid" role="presentation">
          {weekDays.map((label) => (
            <div key={label} className="calendar-grid__weekday">
              {label}
            </div>
          ))}

          {monthGrid.map((day, index) => (
            <div
              key={`${day.displayDay}-${index}`}
              className={`calendar-grid__day${day.isCurrentMonth ? '' : ' is-muted'}${day.isToday ? ' is-today' : ''}`}
            >
              <span>{day.displayDay}</span>
            </div>
          ))}
        </div>
      ) : null}

      {viewMode === 'week' ? (
        <div className="week-grid">
          {weekGrid.map((day) => (
            <article key={day.label} className={`week-grid__card${day.isToday ? ' is-today' : ''}`}>
              <span>{day.label}</span>
              <strong>{day.day}</strong>
              <p>{day.month}</p>
            </article>
          ))}
        </div>
      ) : null}

      {viewMode === 'year' ? (
        <div className="year-grid">
          {yearGrid.map((month) => (
            <article key={month.month} className="year-grid__card">
              <strong>{month.label}</strong>
              <span>{cursorDate.getFullYear()}</span>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default CalendarView
