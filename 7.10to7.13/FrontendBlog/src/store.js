import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

//El store sirve para almacenar los datos de la aplicación
const store = configureStore({
    reducer: {
        notification: notificationReducer,
    }
  })

export default store