import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
function setToken (newToken) {
  token = `Bearer ${newToken}`
}

function getAll () {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

async function create (newBlog) {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

async function update (id, newBlog) {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

async function deleteBlog (id) {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

const loginsService = {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
}

export default loginsService
