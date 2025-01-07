import { createContext, useReducer, useContext } from 'react'
//Estoy importando el export default del notificationReducer, que son los reducers
import blogSlice from '../reducers/blogReducer'

//Creo un contexto
const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  //Lo que hago acá es definir el estado y el dispatch, donde el estado es la notificacion y el dispatch es el dispatch  
  const [blogs, blogsDispatch] = useReducer(blogSlice, [])

  return (
    <BlogContext.Provider value={[blogs, blogsDispatch] }>
      {props.children}
    </BlogContext.Provider>
  )
}

//Esta funcion sirve para obtener el estado del array de value definido como propiedad del contexto
export const useBlogsValue = () => {
    //Utilizo useContext para poder obtener el array de valores definidos en value
    const blogsAndDispatch = useContext(BlogContext) 
    return blogsAndDispatch[0] //Accedo a el primer elemento del array
}
  
export const useBlogsDispatch = () => {
    const blogsAndDispatch = useContext(BlogContext) 
    return blogsAndDispatch[1]
}

export default BlogContext