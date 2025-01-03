import { createContext, useReducer, useContext } from 'react'
//Estoy importando el export default del notificationReducer, que son los reducers
import notificationSlice from '../reducers/notificationReducer'

//Creo un contexto
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  //Lo que hago acá es definir el estado y el dispatch, donde el estado es la notificacion y el dispatch es el dispatch  
  const [notification, notificationDispatch] = useReducer(notificationSlice, {message:'', type: ''})

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

//Esta funcion sirve para obtener el estado del array de value definido como propiedad del contexto
export const useNotificationValue = () => {
    //Utilizo useContext para poder obtener el array de valores definidos en value
    const notificationAndDispatch = useContext(NotificationContext) 
    return notificationAndDispatch[0] //Accedo a el primer elemento del array
}
  
export const useNotificationDispatch = () => {
const notificationAndDispatch = useContext(NotificationContext)
return notificationAndDispatch[1]
}

export default NotificationContext