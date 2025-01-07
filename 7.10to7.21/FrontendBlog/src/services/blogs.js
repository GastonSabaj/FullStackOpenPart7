import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}


const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLikesToBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const getBlogById = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const addCommentToBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(`${baseUrl}/${id}/comments`, { comment: newObject }, config)
  return request.then(response => response.data)
}

export default { addCommentToBlog, getAll, getBlogById, getToken, setToken, createBlog, addLikesToBlog, deleteBlog }