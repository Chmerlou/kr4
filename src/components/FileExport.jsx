import './FileExport.css'

function FileExport({ roadmap }) {
  const handleExport = () => {
    if (!roadmap || !roadmap.items) {
      alert('Нет данных для экспорта')
      return
    }

    try {
      const dataStr = JSON.stringify(roadmap, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${roadmap.title || 'roadmap'}_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      alert(`Ошибка при экспорте: ${error.message}`)
    }
  }

  if (!roadmap || !roadmap.items) {
    return null
  }

  return (
    <div className="file-export">
      <button onClick={handleExport} className="file-export-button">
        <span className="file-export-text">Экспорт JSON</span>
      </button>
    </div>
  )
}

export default FileExport


