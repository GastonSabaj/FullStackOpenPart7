import Blog from './Blog' //Lo importo sin {} dado que está exportado por default ( las {} se usa cuando se exportan varias cosas)
import { useRef, useEffect, useState } from 'react'

import { setBlogs, appendBlog } from '../reducers/blogReducer'; // Los reducers que van a modificar el estado de redux del contexto del blog
import {useBlogsDispatch, useBlogsValue} from "../contexts/BlogContext"

import { setNotification, clearNotification } from '../reducers/notificationReducer'; // Asegúrate de importar las acciones
import {useNotificationDispatch, useNotificationValue} from "../contexts/NotificationContext" 

import blogService from '../services/blogs'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

//Es importante desestructurar los props con {} para poder manipular cada props por separado, dado que si no los pongo entre {}, me va a tomar todo como 1 solo props
const Blogs = ({user}) => {

    const [notificationType, setNotificationType] = useState('')
    //Acá se usa el useNotificationDispatch
    const notificationDispatch = useNotificationDispatch()
    //Esta variable contiene el valor del estado de notificaciones
    const notificationStateValue = useNotificationValue()
  
    const blogsDispatch = useBlogsDispatch()
    const blogsStateValue = useBlogsValue()
  

    const blogFormRef = useRef()

      //Cada vez que me logeo o me deslogeo, se ejecuta esto porque trackea el valor de user cuando cambia
      useEffect(() => {
        // console.log("Se actualizó el usuario!!")
        if (user) {
          blogService.getAll().then(blogs =>
            blogsDispatch(setBlogs(blogs))
          )
        } else {
          setBlogs([])  // Limpiar los blogs cuando no hay usuario logueado
        }
      }, [user]) // Se ejecuta cada vez que cambia 'user'

      const addBlog = (blogObject) => {

        blogFormRef.current.toggleVisibility()
        blogService
          .createBlog(blogObject) // Envío el blogObject al backend
          .then(returnedBlog => {
    
            //De esta manera disparo la accion de appendBlog para actualizar el redux-state del contexto de blogs
            blogsDispatch(appendBlog(returnedBlog))
            console.log("Ahora el nuevo valor del estado de blogs de redux es: ", blogsStateValue)
            
            const notification = {
              message: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
              type: 'success'
            }

            notificationDispatch(setNotification(notification));
            setNotificationType('success')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    
            // event.target.reset()  // Limpiar el formulario después de la creación
    
            console.log("El id de returnedBlog es: ",returnedBlog.id)
          })
          .catch(error => {
            console.log(error)
            //setErrorMessage(error.response.data.error)
          
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    
      const handleDeleteBlog = (id) => {
        console.log("Elimino el blog: ", id)
        blogsDispatch(setBlogs(blogsStateValue.filter(blog => blog.id !== id)));  // Filtra el blog eliminado de la lista

        const notification = {
          message: `Blog deleted successfully!`,
          type: 'success'
        }

        notificationDispatch(setNotification(notification));
        setTimeout(() => {
          notificationDispatch(clearNotification());
        }, 5000);
      };
    

    return (
        <div>
            <h2>blogs</h2>
            {/* Toggable form para crear un nuevo blog */}
            <Togglable buttonLabel="new blog"  ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
            {
                blogsStateValue
                .slice() // crea una copia del arreglo, dado que el estado de redux es inmutable y la funcion .sort modifica al array
                .sort((a, b) => b.likes - a.likes)
                .map(blog => <Blog key={blog.id} blog={blog} user={user} onDelete={handleDeleteBlog} />)
            }
        </div>
    )
}

export default Blogs