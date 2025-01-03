import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message:'', type: ''},
    reducers: {
        setNotification(state, action) {
            console.log("El payload que recibo es: "  , action.payload)
            return action.payload
        },
        clearNotification(state, action) {
            return {message: '', type: ''}          
        }
    }
})

//Lo que hago acá es exportar las acciones que se van a poder despachar desde otro componente (dispatch)
export const { setNotification, clearNotification } = notificationSlice.actions
//Exporto tambien las funciones del reducer
export default notificationSlice.reducer
