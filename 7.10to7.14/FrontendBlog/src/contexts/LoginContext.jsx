import { createContext, useReducer, useContext } from 'react'

import loginSlice from '../reducers/loginReducer'

//Primero creo el contexto
const LoginContext = createContext()

//Luego creo el provider
export const LoginContextProvider = (props) => {
    //Lo que hago acá es definir el estado y el dispatch, donde el estado es el usuario y el dispatch es para disparar la accion al reducer
    const [user, userDispatch] = useReducer(loginSlice, {})

    return (
        <LoginContext.Provider value={[user, userDispatch] }>
            {props.children}
        </LoginContext.Provider>
    )
}

//Hook personalizado
export const useUserValue = () => {
    const userAndDispatch = useContext(LoginContext)
    return userAndDispatch[0]
}

//Hook personalizado
export const useUserDispatch = () => {
    const userAndDispatch = useContext(LoginContext)
    return userAndDispatch[1]
}

export default LoginContext