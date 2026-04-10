import { useEffect, useMemo, useState } from 'react'
import {
  createCandidate,
  deleteCandidate,
  getCandidates,
  updateCandidate,
  updateCandidateStage,
} from './services/candidateApi'
import { createPosition, deletePosition, getPositions, updatePosition } from './services/positionApi'
import { stageOrder } from './constants/stageOrder'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import KanbanBoard from './components/KanbanBoard'
import CandidateModal from './components/CandidateModal'
import TopActions from './components/TopActions'
import HomeView from './components/HomeView'
import CandidateDirectory from './components/CandidateDirectory'
import CalendarView from './components/CalendarView'
import SettingsPanel from './components/SettingsPanel'

const AUTH_STORAGE_KEY = 'hr-authenticated'
const THEME_STORAGE_KEY = 'dashboard-theme'
const initialTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
const initialThemeMode =
  initialTheme === 'light' || initialTheme === 'dark' || initialTheme === 'system'
    ? initialTheme
    : 'system'

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (username === 'Admin' && password === 'Admin123') {
      onLogin()
      return
    }

    setError('Invalid username or password')
  }

  return (
    <main className="auth-screen">
      <section className="auth-card" aria-label="Login">
        <p className="auth-card__eyebrow">Protected access</p>
        <h1 className="auth-card__title">HR Management System</h1>
        <p className="auth-card__subtitle">Sign in to open the recruitment workspace.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field field--stacked">
            <span className="field__label">Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              autoComplete="username"
              required
            />
          </label>

          <label className="field field--stacked">
            <span className="field__label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="primary-button auth-submit">Login</button>
        </form>
      </section>
    </main>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  )
  const [activeView, setActiveView] = useState('Dashboard')
  const [positions, setPositions] = useState([])
  const [selectedDashboardPosition, setSelectedDashboardPosition] = useState('')
  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStage, setSelectedStage] = useState('All')

  const [directorySearch, setDirectorySearch] = useState('')
  const [directoryStageFilter, setDirectoryStageFilter] = useState('All')
  const [directoryPositionFilter, setDirectoryPositionFilter] = useState('All')

  const [themeMode, setThemeMode] = useState(initialThemeMode)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const pickBestDashboardPosition = (positionList, candidateList) => {
    if (!positionList.length) {
      return ''
    }

    const usedPositionNames = new Set(
      candidateList.map((candidate) => candidate.appliedPosition || candidate.role),
    )

    return positionList.find((position) => usedPositionNames.has(position.name))?.name || positionList[0].name
  }

  const appliedTheme =
    themeMode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeMode

  useEffect(() => {
    document.documentElement.dataset.theme = appliedTheme
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode)
  }, [appliedTheme, themeMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = () => {
      if (themeMode === 'system') {
        document.documentElement.dataset.theme = mediaQuery.matches ? 'dark' : 'light'
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [themeMode])

  useEffect(() => {
    const stillExists = positions.some((position) => position.name === selectedDashboardPosition)
    if (!stillExists && positions.length) {
      setSelectedDashboardPosition(pickBestDashboardPosition(positions, candidates))
    }
  }, [positions, candidates, selectedDashboardPosition])

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        setLoading(true)
        const [positionData, candidateData] = await Promise.all([getPositions(), getCandidates()])

        if (!active) {
          return
        }

        setPositions(positionData)
        setCandidates(
          candidateData.map((candidate) => ({
            ...candidate,
            appliedPosition: candidate.appliedPosition || candidate.role,
          })),
        )
        setSelectedDashboardPosition((currentPosition) => {
          const defaultPositionName = pickBestDashboardPosition(positionData, candidateData)
          if (!currentPosition) {
            return defaultPositionName
          }

          return positionData.some((position) => position.name === currentPosition)
            ? currentPosition
            : defaultPositionName
        })
        setError('')
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load backend data')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const appliedPosition = candidate.appliedPosition || candidate.role
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStage = selectedStage === 'All' ? true : candidate.stage === selectedStage
      const matchesPosition = appliedPosition === selectedDashboardPosition

      return matchesSearch && matchesStage && matchesPosition
    })
  }, [candidates, searchTerm, selectedStage, selectedDashboardPosition])

  const directoryCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const appliedPosition = candidate.appliedPosition || candidate.role
      const searchable = `${candidate.name} ${candidate.email} ${candidate.phone} ${appliedPosition}`.toLowerCase()

      const matchesSearch = searchable.includes(directorySearch.toLowerCase())
      const matchesStage = directoryStageFilter === 'All' ? true : candidate.stage === directoryStageFilter
      const matchesPosition =
        directoryPositionFilter === 'All' ? true : appliedPosition === directoryPositionFilter

      return matchesSearch && matchesStage && matchesPosition
    })
  }, [candidates, directorySearch, directoryStageFilter, directoryPositionFilter])

  const handleOpenCandidate = (candidate) => {
    setSelectedCandidate(candidate)
    setIsModalOpen(true)
  }

  const handleSaveCandidate = async (updatedCandidate) => {
    try {
      const savedCandidate = await updateCandidate(updatedCandidate.id, updatedCandidate)

      setCandidates((currentCandidates) =>
        currentCandidates.map((candidate) =>
          candidate.id === savedCandidate.id ? savedCandidate : candidate,
        ),
      )
      setSelectedCandidate(savedCandidate)
      setIsModalOpen(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save candidate')
    }
  }

  const handleMoveCandidate = async (candidateId, nextStage) => {
    const now = new Date().toISOString().slice(0, 10)

    try {
      await updateCandidateStage(candidateId, nextStage)

      setCandidates((currentCandidates) =>
        currentCandidates.map((candidate) => {
          if (candidate.id !== candidateId || candidate.stage === nextStage) {
            return candidate
          }

          return {
            ...candidate,
            stage: nextStage,
            notes: `${candidate.notes} | Stage moved to ${nextStage} (${now})`,
          }
        }),
      )

      setSelectedCandidate((currentCandidate) => {
        if (!currentCandidate || currentCandidate.id !== candidateId) {
          return currentCandidate
        }

        return {
          ...currentCandidate,
          stage: nextStage,
          notes: `${currentCandidate.notes} | Stage moved to ${nextStage} (${now})`,
        }
      })
    } catch (moveError) {
      setError(moveError instanceof Error ? moveError.message : 'Failed to move candidate')
    }
  }

  const handleCreateCandidate = async () => {
    const defaultPosition = positions[0]?.name || 'Unassigned'
    const nextCandidate = {
      id: `cand-${String(candidates.length + 1).padStart(3, '0')}`,
      name: 'New Candidate',
      role: defaultPosition,
      appliedPosition: defaultPosition,
      stage: 'Applying Period',
      applicationDate: new Date().toISOString().slice(0, 10),
      referred: false,
      assessmentAdded: false,
      email: 'new.candidate@example.com',
      phone: '+94 70 000 0000',
      location: 'Colombo, Sri Lanka',
      notes: 'New candidate profile created from dashboard.',
    }

    try {
      const createdCandidate = await createCandidate(nextCandidate)
      setCandidates((currentCandidates) => [createdCandidate, ...currentCandidates])
      setSelectedCandidate(createdCandidate)
      setIsModalOpen(true)
      setActiveView('Candidate')
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Failed to create candidate')
    }
  }

  const handleDeleteCandidate = async (id) => {
    try {
      await deleteCandidate(id)
      setCandidates((currentCandidates) => currentCandidates.filter((candidate) => candidate.id !== id))
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(null)
        setIsModalOpen(false)
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete candidate')
    }
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedStage('All')
  }

  const handleResetDirectoryFilters = () => {
    setDirectorySearch('')
    setDirectoryStageFilter('All')
    setDirectoryPositionFilter('All')
  }

  const handleAddPosition = async (newPosition) => {
    try {
      const createdPosition = await createPosition(newPosition)
      setPositions((currentPositions) => [createdPosition, ...currentPositions])
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : 'Failed to create position')
    }
  }

  const handleDeletePosition = async (positionId) => {
    const deletedPosition = positions.find((position) => position.id === positionId)
    try {
      await deletePosition(positionId)
      setPositions((currentPositions) => currentPositions.filter((position) => position.id !== positionId))

      if (deletedPosition) {
        const fallback = positions.find((position) => position.id !== positionId)?.name || 'General Role'
        setCandidates((currentCandidates) =>
          currentCandidates.map((candidate) => {
            if ((candidate.appliedPosition || candidate.role) !== deletedPosition.name) {
              return candidate
            }
            return {
              ...candidate,
              role: fallback,
              appliedPosition: fallback,
            }
          }),
        )
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete position')
    }
  }

  const handleUpdatePosition = async (updatedPosition) => {
    const previousPosition = positions.find((position) => position.id === updatedPosition.id)
    try {
      const savedPosition = await updatePosition(updatedPosition.id, updatedPosition)

      setPositions((currentPositions) =>
        currentPositions.map((position) =>
          position.id === savedPosition.id ? savedPosition : position,
        ),
      )

      if (previousPosition && previousPosition.name !== savedPosition.name) {
        setCandidates((currentCandidates) =>
          currentCandidates.map((candidate) => {
            const appliedPosition = candidate.appliedPosition || candidate.role
            if (appliedPosition !== previousPosition.name) {
              return candidate
            }
            return {
              ...candidate,
              role: savedPosition.name,
              appliedPosition: savedPosition.name,
            }
          }),
        )
      }
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Failed to update position')
    }
  }

  const renderDashboard = () => (
    <>
      <Header
        activeCount={filteredCandidates.length}
        selectedTab="Dashboard"
        positionOptions={positions}
        selectedPosition={selectedDashboardPosition}
        onChangePosition={setSelectedDashboardPosition}
      />

      <div className="workspace__toolbar">
        <FilterBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          stageFilter={selectedStage}
          onStageFilterChange={setSelectedStage}
          stages={stageOrder}
          onResetFilters={handleResetFilters}
        />
        <TopActions selectedCount={filteredCandidates.length} />
      </div>

      {error ? <div className="banner banner--error">{error}</div> : null}
      {loading ? <div className="banner">Loading candidates from mock data...</div> : null}

      <KanbanBoard
        candidates={candidates.filter(
            (candidate) => !selectedDashboardPosition || (candidate.appliedPosition || candidate.role) === selectedDashboardPosition,
        )}
        searchTerm={searchTerm}
        selectedStage={selectedStage}
        onSelectCandidate={handleOpenCandidate}
        onMoveCandidate={handleMoveCandidate}
      />
    </>
  )

  const renderActiveView = () => {
    if (activeView === 'Home') {
      return (
        <HomeView
          positions={positions}
          candidates={candidates}
          onAddPosition={handleAddPosition}
          onDeletePosition={handleDeletePosition}
          onUpdatePosition={handleUpdatePosition}
        />
      )
    }

    if (activeView === 'Candidate') {
      return (
        <CandidateDirectory
          candidates={directoryCandidates}
          searchTerm={directorySearch}
          onSearchTermChange={setDirectorySearch}
          stageFilter={directoryStageFilter}
          onStageFilterChange={setDirectoryStageFilter}
          positionFilter={directoryPositionFilter}
          onPositionFilterChange={setDirectoryPositionFilter}
          positions={positions}
          onResetFilters={handleResetDirectoryFilters}
          onSelectCandidate={handleOpenCandidate}
          onDeleteCandidate={handleDeleteCandidate}
          onAddCandidate={handleCreateCandidate}
        />
      )
    }

    if (activeView === 'Calendar') {
      return <CalendarView />
    }

    if (activeView === 'Settings') {
      return (
        <SettingsPanel
          themeMode={themeMode}
          onSetThemeMode={setThemeMode}
          onCloseSettings={() => setActiveView('Dashboard')}
        />
      )
    }

    return renderDashboard()
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={() => {
          window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
          setIsAuthenticated(true)
        }}
      />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        onChangeView={setActiveView}
        onLogout={() => {
          window.localStorage.removeItem(AUTH_STORAGE_KEY)
          setIsAuthenticated(false)
          setActiveView('Dashboard')
        }}
      />

      <main className="workspace">
        {renderActiveView()}
      </main>

      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCandidate}
        stageOrder={stageOrder}
        positions={positions}
      />
    </div>
  )
}

export default App
