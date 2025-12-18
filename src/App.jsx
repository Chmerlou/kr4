import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import RoadmapHeader from './components/RoadmapHeader'
import RoadmapGrid from './components/RoadmapGrid'
import RoadmapDetail from './components/RoadmapDetail'
import ErrorCard from './components/ErrorCard'
import './App.css'

function AppContent() {
  const [roadmap, setRoadmap] = useLocalStorage('roadmap', null)
  const [error, setError] = useState(null)
  const location = useLocation()

  const showHeader = location.pathname === '/'

  const handleFileLoad = (loadedRoadmap) => {
    const initializedRoadmap = {
      ...loadedRoadmap,
      items: loadedRoadmap.items.map(item => ({
        ...item,
        status: item.status || 'not_started',
        note: item.note || '',
        targetDate: item.targetDate || '',
      })),
    }
    setRoadmap(initializedRoadmap)
    setError(null)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  const updateRoadmapItem = (itemId, updates) => {
    if (!roadmap) return

    const updatedRoadmap = {
      ...roadmap,
      items: roadmap.items.map(item =>
        item.id === itemId
          ? { ...item, ...updates }
          : item
      ),
    }
    setRoadmap(updatedRoadmap)
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <div className="app">
      <div className="app-container">
        {showHeader && (
          <RoadmapHeader
            roadmap={roadmap}
            onFileLoad={handleFileLoad}
            onError={handleError}
          />
        )}

        {error && <ErrorCard message={error} onClose={handleCloseError} />}

        <Routes>
          <Route
            path="/"
            element={null}
          />
          <Route
            path="/item/:id"
            element={
              <RoadmapDetail
                roadmap={roadmap}
                updateRoadmapItem={updateRoadmapItem}
              />
            }
          />
          <Route
            path="/tasks"
            element={<RoadmapGrid roadmap={roadmap} />}
          />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

