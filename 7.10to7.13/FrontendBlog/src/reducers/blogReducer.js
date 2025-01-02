import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload //Esto se va a guardar en el state de redux, cuyo payload debe ser el array de blogs recibido
        },
        appendBlog: (state, action) => {
            const newBlog = action.payload //Esto va a ser un objeto de blog
            return [...state, newBlog] //Creo un nuevo array donde es basado en el estado actual y le appendeo el nuevo objeto

        }

    }
})

//Lo que hago acá es exportar las acciones que se van a poder despachar desde otro componente (dispatch)
export const { setBlogs, appendBlog } = blogSlice.actions
//Exporto tambien las funciones del reducer
export default blogSlice.reducer
