import './FileUpload.css'

function FileUpload({ onFileLoad, onError }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      onError('Пожалуйста, выберите JSON-файл')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target.result
        const roadmap = JSON.parse(content)
        
        // Валидация структуры
        if (!roadmap.title || !Array.isArray(roadmap.items)) {
          throw new Error('Неверный формат файла. Ожидается объект с полями title и items')
        }

        // Валидация items
        roadmap.items.forEach((item, index) => {
          if (!item.id || !item.title) {
            throw new Error(`Пункт ${index + 1} должен содержать поля id и title`)
          }
        })

        onFileLoad(roadmap)
      } catch (error) {
        onError(`Ошибка при чтении файла: ${error.message}`)
      }
    }

    reader.onerror = () => {
      onError('Ошибка при чтении файла')
    }

    reader.readAsText(file)
    // Сброс input для возможности повторной загрузки того же файла
    event.target.value = ''
  }

  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="file-upload-button">
        <span className="file-upload-text">Импорт JSON</span>
      </label>
      <input
        id="file-input"
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="file-upload-input"
      />
    </div>
  )
}

export default FileUpload


