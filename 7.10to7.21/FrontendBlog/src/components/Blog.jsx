import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  blogService  from '../services/blogs'
import userService from '../services/users'

const Blog = ({ blog, onDelete, user, onLikeHandler }) => {
  console.log("El usuario del Blog.jsx es :",user)
  console.log("El blog recibido por props vale: ",blog)
  // const [visible, setVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)
  //const [likes, setLikes] = useState(blog.likes)

  console.log("El id de blogObject es: ",blogObject.id)
  useEffect(() => {
    console.log("Actualizo el blog!")
    setBlogObject(blogObject)
  }, [blogObject])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

  const addLike = () => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 };
    
    blogService.addLikesToBlog(blogObject.id, updatedBlog)
      .then(() => {
        setBlogObject(updatedBlog);
        console.log(`Incrementé en 1 los likes del blog: ${blogObject.title}`);
      })
      .catch(err => console.log(err));

    if(onLikeHandler) onLikeHandler();
  };

  const deleteBlog =  () => {


    userService.getLoggedUser(user).then((usuarioLogeado) => {
      //Si el usuario logeado coincide con el usuario creador del blog, entonces puedo borrarlo
      console.log("el usuario logeado es: ",usuarioLogeado)
      console.log("el blogObject es: ",blogObject)
      //blogObject.user es el id del usuario que crea el blog
      console.log(blogObject.user === usuarioLogeado.id)

      if(blogObject.user === usuarioLogeado.id){
        if(window.confirm(`Do you really want to delete the blog "${blogObject.title}" by ${blogObject.author}?`)){
          blogService
            .deleteBlog(blogObject.id)
            .then(() => {
              console.log(`Eliminó el blog: ${blogObject.title}`);
              onDelete(blogObject.id);  // Llama a la función de actualización pasada como prop
            })
            .catch(err => console.log(err));
        }
      }
      else{
        window.alert("No puedes borrar un blog que no te pertenece");
      }
    });
  }

  return (
    <div style={blogStyle}>
        <div>
          <span data-testid={`blog-title-${blogObject.id}`}> 
            <Link to={`/blogs/${blogObject.id}`}> 
              {blogObject.title} 
            </Link>
          </span> 
        </div>
    </div>
  );

}

export default Blog