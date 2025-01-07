import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import blogService from '../services/blogs'

import CommentForm from './CommentForm'

const BlogDetails = () => {

    const { id } = useParams();

    const [blog, setBlog] = useState(null);

    const addComment = (comment) => {
        console.log("El comentario que recibo es: ", comment)
        blogService.addCommentToBlog(id,comment)
            .then(() => {
            blogService.getBlogById(id).then((blogData) => { 
                console.log("El blog actualizado es: ", blogData)
                setBlog(blogData);
            });
            })
            .catch((error) => {
            console.error('Error adding comment:', error);
            });
    };
    
    useEffect(() => {
        blogService.getBlogById(id).then((blogData) => {
        setBlog(blogData);
      }).catch((error) => {
        console.error('Error fetching blog details:', error);
      });
    }, []); //Se ejecuta 1 sola vez al cargar el componente
  
    
    if (!blog) return <div>Cargando...</div>;

    return (
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>added by {blog.author}</p>

        <h2>Comments</h2>
        <CommentForm createComment={addComment} />
        <ul>
            {blog.comments.map((comment, index) => (
                <li key={index}>{comment || '(sin comentario)'}</li>
            ))}
        </ul>
      </div>
    )
}

export default BlogDetails