import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import store from './store'
import {NotificationContextProvider} from "./contexts/NotificationContext" 
import { BlogContextProvider } from './contexts/BlogContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BlogContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </BlogContextProvider>
    </Provider>
  )