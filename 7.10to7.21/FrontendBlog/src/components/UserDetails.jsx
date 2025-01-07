import { useParams } from "react-router-dom" 
import { useState, useEffect } from 'react'

import userService from '../services/users'

const UserDetails = () => {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getUserById(id).then((userData) => {
        setUser(userData);
      }).catch((error) => {
        console.error('Error fetching user details:', error);
      });
    }, []); //Se ejecuta 1 sola vez al cargar el componente
  
    
    if (!user) return <div>Cargando...</div>;

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
}

export default UserDetails