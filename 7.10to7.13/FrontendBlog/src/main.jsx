import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import store from './store'
import {NotificationContextProvider} from "./contexts/NotificationContext" 
import { BlogContextProvider } from './contexts/BlogContext'
import { LoginContextProvider } from './contexts/LoginContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <LoginContextProvider>  {/* Contexto de login */}
          <BlogContextProvider>   {/* Contexto para manejo de blogs */}
            <NotificationContextProvider> {/* Contexto para la notificacion */}
              <App />
            </NotificationContextProvider>
          </BlogContextProvider>
        </LoginContextProvider>
    </Provider>
  )