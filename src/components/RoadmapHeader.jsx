import { useNavigate } from 'react-router-dom'
import FileUpload from './FileUpload'
import FileExport from './FileExport'
import ProgressBar from './ProgressBar'
import './RoadmapHeader.css'

function RoadmapHeader({ roadmap, onFileLoad, onError }) {
  const hasRoadmap = roadmap && roadmap.items && roadmap.items.length > 0
  const navigate = useNavigate()

  const handleOpenTasks = () => {
    if (!hasRoadmap) return
    navigate('/tasks')
  }

  return (
    <header className="roadmap-header">
      <div className="roadmap-header-content">
        {hasRoadmap && (
          <>
            <div className="roadmap-header-title-section">
              <h1 className="roadmap-header-title">{roadmap.title}</h1>
              {roadmap.description && (
                <p className="roadmap-header-description">{roadmap.description}</p>
              )}
            </div>
            <ProgressBar roadmap={roadmap} />
          </>
        )}
        <div className="roadmap-header-actions">
          <FileUpload onFileLoad={onFileLoad} onError={onError} />
          <FileExport roadmap={roadmap} />
          <button
            type="button"
            className="roadmap-header-open-tasks"
            onClick={handleOpenTasks}
            disabled={!hasRoadmap}
          >
            Открыть список задач
          </button>
        </div>
      </div>
    </header>
  )
}

export default RoadmapHeader


