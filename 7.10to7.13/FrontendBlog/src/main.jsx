import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import store from './store'
import {NotificationContextProvider} from "./contexts/NotificationContext" 

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </Provider>
  )