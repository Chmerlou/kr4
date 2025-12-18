import './ErrorCard.css'

function ErrorCard({ message, onClose }) {
  if (!message) return null

  return (
    <div className="error-card">
      <div className="error-card-content">
        <div className="error-card-text">
          <p className="error-card-title">Ошибка загрузки</p>
          <p className="error-card-message">{message || 'Файл не соответствует структуре дорожной карты'}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="error-card-close">
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorCard


