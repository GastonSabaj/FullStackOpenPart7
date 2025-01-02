import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

//El store sirve para almacenar los datos de la aplicación
const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
    }
  })

export default store