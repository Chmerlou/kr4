import { Link } from 'react-router-dom'
import './RoadmapCard.css'

function RoadmapCard({ item }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'done':
        return {
          color: '#34d399',
          label: 'Выполнено',
          icon: '✅'
        }
      case 'in_progress':
        return {
          color: '#60a5fa',
          label: 'В работе',
          icon: '⏳'
        }
      default:
        return {
          color: '#f87171',
          label: 'Не начато',
          icon: '⚪'
        }
    }
  }

  const statusConfig = getStatusConfig(item.status || 'not_started')
  const statusClass = item.status || 'not_started'

  return (
    <Link to={`/item/${item.id}`} className="roadmap-card-link">
      <div className={`roadmap-card roadmap-card--${statusClass}`}>
        <div className="roadmap-card-status-bar" style={{ backgroundColor: statusConfig.color }}></div>
        <div className="roadmap-card-content">
          <div className="roadmap-card-header">
            <h3 className="roadmap-card-title">{item.title}</h3>
            <div 
              className="roadmap-card-status-badge"
              style={{ backgroundColor: statusConfig.color }}
            >
              <span className="roadmap-card-status-icon">{statusConfig.icon}</span>
              <span className="roadmap-card-status-label">{statusConfig.label}</span>
            </div>
          </div>
          {item.description && (
            <p className="roadmap-card-description">
              {item.description.length > 120
                ? `${item.description.substring(0, 120)}...`
                : item.description}
            </p>
          )}
          {item.targetDate && (
            <div className="roadmap-card-deadline">
              📅 {new Date(item.targetDate).toLocaleDateString('ru-RU')}
            </div>
          )}
          {item.note && (
            <div className="roadmap-card-note-indicator">
              <span className="roadmap-card-note-text">📝 Есть заметка</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RoadmapCard
