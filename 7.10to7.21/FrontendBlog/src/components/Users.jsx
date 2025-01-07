import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([]) // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true) // Estado para indicar carga

  useEffect(() => {
    //Defino la funcion asíncrona para obtener los usuarios
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers() //Espero una respuesta
        setUsers(response) // Actualiza el estado con los usuarios
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false) // Detiene el estado de carga
      }
    }

    fetchUsers() // Llama a la funcion para obtener los usuarios
  }, []) // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  if (loading) {
    return <div>Loading...</div> // Muestra un mensaje mientras se cargan los datos
  }

  console.log("Los usuarios son: ", users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Blogs created</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user.id}> 
                <td>   
                  <Link to={`/users/${user.id}`}>{user.username}</Link> 
                </td> 
                <td>{user.blogs.length}</td> 
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
