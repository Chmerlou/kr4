import { useState } from 'react'
import RoadmapCard from './RoadmapCard'
import './RoadmapGrid.css'

const STATUS_FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'not_started', label: 'Не начато' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Выполнено' },
]

function RoadmapGrid({ roadmap }) {
  const [statusFilter, setStatusFilter] = useState('all')

  if (!roadmap || !roadmap.items || roadmap.items.length === 0) {
    return (
      <div className="roadmap-grid-empty">
        <div className="roadmap-grid-empty-content">
          <p className="roadmap-grid-empty-title">Дорожная карта не загружена</p>
          <p className="roadmap-grid-empty-text">Загрузите JSON-файл с дорожной картой, чтобы начать работу</p>
        </div>
      </div>
    )
  }

  const filteredItems = statusFilter === 'all'
    ? roadmap.items
    : roadmap.items.filter(item => {
        const itemStatus = item.status || 'not_started'
        return itemStatus === statusFilter
      })

  return (
    <div className="roadmap-grid-container">
      <div className="roadmap-grid-filters">
        {STATUS_FILTERS.map(filter => (
          <button
            key={filter.value}
            className={`roadmap-grid-filter ${statusFilter === filter.value ? 'active' : ''}`}
            onClick={() => setStatusFilter(filter.value)}
          >
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
      <div className="roadmap-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <RoadmapCard key={item.id} item={item} />
          ))
        ) : (
          <div className="roadmap-grid-no-results">
            <p>Нет пунктов с выбранным статусом</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoadmapGrid
