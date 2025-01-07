import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}


/* 
  Esta funcion tiene un problema, y es que necesita recibir un id, y yo en el frontend tengo un json con el token, el username y el name, y no se como pasar esos datos a la funcion.
*/
const getLoggedUser = async (userLocalStorage) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log("El id vale: ", userLocalStorage)

  const id = userLocalStorage._id
  //const response = await axios.get(`${baseUrl}/`, config)
  const response = await axios.get(`${baseUrl}/${id}`, config)
  console.log("La response es: ", response)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}
 
export default { getLoggedUser, getAllUsers, getUserById, setToken, getToken }
