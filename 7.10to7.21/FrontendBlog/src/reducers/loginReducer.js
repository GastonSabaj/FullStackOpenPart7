import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'blogs',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return action.payload //Esto se va a guardar en el state de redux, cuyo payload debe ser el array de blogs recibido
        },
        getUser: (state, action) => {
            return state
        }
    }
})

//Lo que hago acá es exportar las acciones que se van a poder despachar desde otro componente (dispatch)
export const { setUser, getUser} = userSlice.actions
//Exporto tambien las funciones del reducer
export default userSlice.reducer
