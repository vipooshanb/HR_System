import { useEffect, useMemo, useState } from 'react'
import { dummyCandidates, stageOrder } from './data/dummyCandidates'
import { getCandidates } from './services/candidateApi'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import KanbanBoard from './components/KanbanBoard'
import CandidateModal from './components/CandidateModal'
import TopActions from './components/TopActions'
import CandidateDirectory from './components/CandidateDirectory'
import CalendarView from './components/CalendarView'
import SettingsPanel from './components/SettingsPanel'

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const viewCopy = {
  Dashboard: {
    description: 'Track the live hiring pipeline.',
    statLabel: 'Visible',
  },
  Candidates: {
    description: 'Search and review every applied candidate.',
    statLabel: 'Matched',
  },
  Calendar: {
    description: 'See the hiring month at a glance.',
    statLabel: 'Month',
  },
  Settings: {
    description: 'Adjust the application appearance.',
    statLabel: 'Theme',
  },
}

function App() {
  const [candidates, setCandidates] = useState(dummyCandidates)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeView, setActiveView] = useState('Dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStage, setSelectedStage] = useState('All')
  const [scoreFilter, setScoreFilter] = useState('All')
  const [candidateSearchTerm, setCandidateSearchTerm] = useState('')
  const [candidateStageFilter, setCandidateStageFilter] = useState('All')
  const [candidatePositionFilter, setCandidatePositionFilter] = useState('All')
  const [theme, setTheme] = useState(initialTheme)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('dashboard-theme', theme)
  }, [theme])

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('dashboard-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadCandidates() {
      try {
        setLoading(true)
        const data = await getCandidates()
        if (active) {
          setCandidates(data)
          setError('')
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load candidates')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadCandidates()

    return () => {
      active = false
    }
  }, [])

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStage = selectedStage === 'All' ? true : candidate.stage === selectedStage

      const matchesScore =
        scoreFilter === 'All'
          ? true
          : scoreFilter === '4+'
            ? candidate.overallScore >= 4
            : scoreFilter === '3-4'
              ? candidate.overallScore >= 3 && candidate.overallScore < 4
              : candidate.overallScore > 0 && candidate.overallScore < 3

      return matchesSearch && matchesStage && matchesScore
    })
  }, [candidates, searchTerm, selectedStage, scoreFilter])

  const candidatePositions = useMemo(() => {
    return Array.from(
      new Set(
        candidates
          .map((candidate) => candidate.appliedPosition ?? candidate.role)
          .filter(Boolean),
      ),
    ).sort((left, right) => left.localeCompare(right))
  }, [candidates])

  const filteredDirectoryCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const appliedPosition = candidate.appliedPosition ?? candidate.role
      const searchValue = candidateSearchTerm.toLowerCase()
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchValue) ||
        candidate.email.toLowerCase().includes(searchValue) ||
        candidate.phone.toLowerCase().includes(searchValue) ||
        appliedPosition.toLowerCase().includes(searchValue)
      const matchesStage = candidateStageFilter === 'All' ? true : candidate.stage === candidateStageFilter
      const matchesPosition =
        candidatePositionFilter === 'All' ? true : appliedPosition === candidatePositionFilter

      return matchesSearch && matchesStage && matchesPosition
    })
  }, [candidates, candidateSearchTerm, candidateStageFilter, candidatePositionFilter])

  const currentViewCopy = viewCopy[activeView]
  const activeStatValue =
    activeView === 'Dashboard'
      ? `${filteredCandidates.length} candidates`
      : activeView === 'Candidates'
        ? `${filteredDirectoryCandidates.length} profiles`
        : activeView === 'Calendar'
          ? new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
          : theme === 'dark'
            ? 'Dark mode'
            : 'Light mode'

  const handleOpenCandidate = (candidate) => {
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleSaveCandidate = (updatedCandidate) => {
    setCandidates((currentCandidates) =>
      currentCandidates.map((candidate) =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate,
      ),
    )
    setSelectedCandidate(updatedCandidate)
    setIsModalOpen(true)
  }

  const handleCreateCandidate = () => {
    const nextCandidate = {
      id: `cand-${String(candidates.length + 1).padStart(3, '0')}`,
      name: 'New Candidate',
      role: 'Research and Development Officer',
      appliedPosition: 'Research and Development Officer',
      stage: 'Applied',
      applicationDate: new Date().toISOString().slice(0, 10),
      overallScore: 0,
      referred: false,
      assessmentAdded: false,
      email: 'new.candidate@example.com',
      phone: '+94 70 000 0000',
      location: 'Colombo, Sri Lanka',
      notes: 'New placeholder candidate for frontend-only workflow.',
    }

    setCandidates((currentCandidates) => [nextCandidate, ...currentCandidates])
    handleOpenCandidate(nextCandidate)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedStage('All')
    setScoreFilter('All')
  }

  const handleResetCandidateFilters = () => {
    setCandidateSearchTerm('')
    setCandidateStageFilter('All')
    setCandidatePositionFilter('All')
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onSelectView={setActiveView} />

      <main className="workspace">
        <Header
          title={activeView}
          description={currentViewCopy.description}
          statLabel={currentViewCopy.statLabel}
          statValue={activeStatValue}
        />

        {activeView === 'Dashboard' ? (
          <>
            <div className="workspace__toolbar">
              <FilterBar
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                stageFilter={selectedStage}
                onStageFilterChange={setSelectedStage}
                scoreFilter={scoreFilter}
                onScoreFilterChange={setScoreFilter}
                stages={stageOrder}
                onResetFilters={handleResetFilters}
              />
              <TopActions selectedCount={filteredCandidates.length} onCreateCandidate={handleCreateCandidate} />
            </div>

            {error ? <div className="banner banner--error">{error}</div> : null}
            {loading ? <div className="banner">Loading candidates from mock data...</div> : null}

            <KanbanBoard
              candidates={candidates}
              searchTerm={searchTerm}
              selectedStage={selectedStage}
              scoreFilter={scoreFilter}
              onSelectCandidate={handleOpenCandidate}
            />
          </>
        ) : null}

        {activeView === 'Candidates' ? (
          <CandidateDirectory
            candidates={filteredDirectoryCandidates}
            searchTerm={candidateSearchTerm}
            onSearchTermChange={setCandidateSearchTerm}
            stageFilter={candidateStageFilter}
            onStageFilterChange={setCandidateStageFilter}
            positionFilter={candidatePositionFilter}
            onPositionFilterChange={setCandidatePositionFilter}
            positions={candidatePositions}
            onResetFilters={handleResetCandidateFilters}
            onSelectCandidate={handleOpenCandidate}
          />
        ) : null}

        {activeView === 'Calendar' ? <CalendarView /> : null}

        {activeView === 'Settings' ? (
          <SettingsPanel
            theme={theme}
            onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          />
        ) : null}
      </main>

      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCandidate}
        stageOrder={stageOrder}
      />
    </div>
  )
}

export default App
