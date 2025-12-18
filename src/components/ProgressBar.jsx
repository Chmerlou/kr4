import './ProgressBar.css'

function ProgressBar({ roadmap }) {
  if (!roadmap || !roadmap.items || roadmap.items.length === 0) {
    return null
  }

  const totalItems = roadmap.items.length
  const completedItems = roadmap.items.filter(
    item => (item.status || 'not_started') === 'done'
  ).length
  const progressPercentage = totalItems > 0 
    ? Math.round((completedItems / totalItems) * 100) 
    : 0

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-bar-label">ПРОГРЕСС</span>
        <span className="progress-bar-percentage">{progressPercentage}%</span>
      </div>
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.max(progressPercentage, 2)}%` }}
        ></div>
      </div>
      <div className="progress-bar-stats">
        <span>{completedItems} из {totalItems} выполнено</span>
      </div>
    </div>
  )
}

export default ProgressBar


