import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './RoadmapDetail.css'

function RoadmapDetail({ roadmap, updateRoadmapItem }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('not_started')
  const [targetDate, setTargetDate] = useState('')
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const noteTimeoutRef = useRef(null)

  const item = roadmap?.items?.find(i => i.id === id)

  useEffect(() => {
    if (item) {
      setNote(item.note || '')
      setStatus(item.status || 'not_started')
      setTargetDate(item.targetDate || '')
    }
  }, [item])

  const isInitialMount = useRef(true)

  // Автоматическое сохранение при изменении статуса
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (item && status !== (item.status || 'not_started')) {
      updateRoadmapItem(id, {
        note,
        status,
        targetDate,
      })
      showTemporaryNotification()
    }
  }, [status])

  // Автоматическое сохранение при изменении даты
  useEffect(() => {
    if (isInitialMount.current) return
    if (item && targetDate !== (item.targetDate || '')) {
      updateRoadmapItem(id, {
        note,
        status,
        targetDate,
      })
      showTemporaryNotification()
    }
  }, [targetDate])

  // Автоматическое сохранение заметки с задержкой (debounce)
  useEffect(() => {
    if (isInitialMount.current) return
    if (item && note !== (item.note || '')) {
      // Очищаем предыдущий таймер
      if (noteTimeoutRef.current) {
        clearTimeout(noteTimeoutRef.current)
      }
      
      // Устанавливаем новый таймер для сохранения через 1 секунду после последнего изменения
      noteTimeoutRef.current = setTimeout(() => {
        updateRoadmapItem(id, {
          note,
          status,
          targetDate,
        })
        showTemporaryNotification()
      }, 1000)
    }

    // Очистка таймера при размонтировании
    return () => {
      if (noteTimeoutRef.current) {
        clearTimeout(noteTimeoutRef.current)
      }
    }
  }, [note])

  // Сброс флага при смене пункта
  useEffect(() => {
    isInitialMount.current = true
  }, [id])

  const showTemporaryNotification = () => {
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 2000)
  }

  if (!item) {
    return (
      <div className="roadmap-item-page-error">
        <p>Пункт не найден</p>
        <button onClick={() => navigate('/')} className="roadmap-item-page-back-button">
          Вернуться на главную
        </button>
      </div>
    )
  }

  const handleSave = () => {
    updateRoadmapItem(id, {
      note,
      status,
      targetDate,
    })
    showTemporaryNotification()
  }

  const handleDeleteNote = () => {
    if (window.confirm('Вы уверены, что хотите удалить заметку?')) {
      setNote('')
      updateRoadmapItem(id, {
        note: '',
        status,
        targetDate,
      })
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'done':
        return { color: '#34d399', label: 'Выполнено' }
      case 'in_progress':
        return { color: '#60a5fa', label: 'В работе' }
      default:
        return { color: '#f87171', label: 'Не начато' }
    }
  }

  const statusConfig = getStatusConfig(status)

  return (
    <div className="roadmap-item-page">
      <button className="roadmap-item-page-back" onClick={() => navigate('/')}>
        ← Назад к списку
      </button>

      <div className="roadmap-item-page-content">
        <div className="roadmap-item-page-main">
          <div className="roadmap-item-page-info">
            <div className="roadmap-item-page-header">
              <h1 className="roadmap-item-page-title">{item.title}</h1>
              <div className="roadmap-item-page-status-selector">
                <label htmlFor="status-select">Статус:</label>
                <select
                  id="status-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="roadmap-item-page-select"
                  style={{ borderLeftColor: statusConfig.color }}
                >
                  <option value="not_started">Не начато</option>
                  <option value="in_progress">В работе</option>
                  <option value="done">Выполнено</option>
                </select>
              </div>
            </div>

            {item.description && (
              <div className="roadmap-item-page-section">
                <h2 className="roadmap-item-page-section-title">Описание</h2>
                <p className="roadmap-item-page-description">{item.description}</p>
              </div>
            )}

            {item.links && item.links.length > 0 && (
              <div className="roadmap-item-page-section">
                <h2 className="roadmap-item-page-section-title">Полезные ссылки</h2>
                <div className="roadmap-item-page-links">
                  {item.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="roadmap-item-page-link"
                    >
                      <span className="roadmap-item-page-link-text">{link.title || link.url}</span>
                      <span className="roadmap-item-page-link-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="roadmap-item-page-section">
              <h2 className="roadmap-item-page-section-title">Планирование</h2>
              <div className="roadmap-item-page-date-input">
                <label htmlFor="target-date">Желаемая дата завершения:</label>
                <input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="roadmap-item-page-input"
                />
              </div>
            </div>
          </div>

          <div className="roadmap-item-page-notes">
            <div className="roadmap-item-page-notes-header">
              <h2 className="roadmap-item-page-section-title">Моя заметка</h2>
              {note && (
                <button
                  onClick={handleDeleteNote}
                  className="roadmap-item-page-delete-note"
                >
                  Удалить заметку
                </button>
              )}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Добавьте свою заметку, конспект, полезные команды или ссылки..."
              className="roadmap-item-page-textarea"
              rows={12}
            />
            <div className="roadmap-item-page-actions">
              {showSaveNotification && (
                <div className="roadmap-item-page-notification">
                  ✓ Изменения сохранены автоматически
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapDetail
