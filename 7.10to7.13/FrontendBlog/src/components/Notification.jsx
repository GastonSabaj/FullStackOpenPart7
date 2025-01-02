import { useState, useEffect } from 'react'
import { useNotificationValue } from '../contexts/NotificationContext'


const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(true)

  // Este useEffect sirve para desaparecer la notificación al final de 4 segundos
  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 4000) // Desaparecerá lentamente al final de 4 segundos
      return () => clearTimeout(timer)
    }
  }, [message])

  //Si el mensaje es null, no se muestra nada
  if (message === null) {
    return null
  }



  return (
    <div className={`${type} ${visible ? 'fade-in' : 'fade-out'}`}>
      {message}
    </div>
  )
}

export default Notification
