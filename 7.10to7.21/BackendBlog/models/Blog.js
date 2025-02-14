  const mongoose = require('mongoose');

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [String] //Es un array de strings
  });
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      //Esto se encarga de cambiar el nombre del campo _id al campo id en el objeto retornado.
      returnedObject.id = returnedObject._id.toString()
    }
  })


  const Blog = mongoose.model('Blog', blogSchema);

  module.exports = Blog;
