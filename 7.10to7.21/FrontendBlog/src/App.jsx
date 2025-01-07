import { useDispatch, useSelector } from 'react-redux'

//Importo los reducers
import { setNotification, clearNotification } from './reducers/notificationReducer'; // Asegúrate de importar las acciones
import { setBlogs, appendBlog } from './reducers/blogReducer'; // Los reducers que van a modificar el estado de redux del contexto del blog
import { setUser } from './reducers/loginReducer';

//Se importan estos hooks para poder disparar acciones a los reducers y poder utilizar el valor del estado de redux para cada contexto
import {useNotificationDispatch, useNotificationValue} from "./contexts/NotificationContext" 
import {useBlogsDispatch, useBlogsValue} from "./contexts/BlogContext"
import { useUserDispatch, useUserValue } from './contexts/LoginContext';

//Importo lo relacionado a react-router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom"

import { Container, Row, Col, Navbar } from 'react-bootstrap';

import { useState, useEffect, useRef } from 'react'

//Importo los servicios que conectan al backend
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

//Importo los componentes
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';

import './index.css';


const App = () => {

  //Lo utilizo para el form de login (cada uno es el estado local de cada campo)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  //Acá se usa el useNotificationDispatch
  const notificationDispatch = useNotificationDispatch()
  //Esta variable contiene el valor del estado de notificaciones
  const notificationStateValue = useNotificationValue()

  const userDispatch = useUserDispatch()
  const user = useUserValue()

  //Este useEffect sirve para que si ya estabas logeado, te continue logeado mas allá de que refresques la página
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch(setUser(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      const userForFrontend = {
        username: user.username,
        id: user.id,  // Almacena el id que devuelve el backend
        token: user.token
      }
  
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userForFrontend)
      ) 
      blogService.setToken(user.token)
      userService.setToken(user.token)
      userDispatch(setUser(user))

      setUsername('')
      setPassword('')


      const notification ={
        message: `Login exitoso!`,
        type: 'success'
      }

      notificationDispatch(setNotification(notification));
      console.log("La notificacion (el valor del state de redux) es: ", notificationStateValue)
      setTimeout(() => {
        notificationDispatch(clearNotification())
        //setNotification(null)
      }, 5000)
    } catch (exception) {
      // console.log("Login fallido!")
      const failedLoginNotification = {
        message: `Login fallido!`,
        type: 'error'
      }
      notificationDispatch(setNotification(failedLoginNotification));

      setTimeout(() => {
        //setNotification(null)
        notificationDispatch(clearNotification())
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          data-testid='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      {/* Estoy utilizando el estado de redux de notificacion para mostrar la notificacion */}
      <Notification />

      {user === null ? loginForm() :
        <div>
          
          <div className="navbar">
            <div className="navbar-item"><a href="/users">users</a></div>
            <div className="navbar-item"><a href="/">blogs</a></div>
            <div style={{ marginLeft: '10px', color: 'black'}}> <b> {user.username} logged-in </b></div>
            <div style={{ marginLeft: '10px'}}> 
              {/* Boton de deslogeo */}
              <button onClick={() => {
                window.localStorage.clear()
                userDispatch(setUser(null))
                //setUser(null) 
                blogService.setToken(null)
                userService.setToken(null)
              }} data-testid='logout-button'>logout</button>
            </div>
          </div>
            


            {/* Defino las rutas */}
            <Router>
              <Routes>
                <Route path="/" element={<Blogs user={user} />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
              </Routes>
            </Router>
        </div>
      }

    </div>
  )
}

export default App
