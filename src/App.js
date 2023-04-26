import { useState, useEffect, useRef } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: null, type: null })
  const blogFormRef = useRef()

  /*
  useEffect(() => {
    blogsService.getAll().then(blogs => {
      const copeBlog = blogs.map(blog => blog)
      copeBlog.sort((a, b) => b.likes - a.likes)
      setBlogs(copeBlog)
    })
  }, [])
  */

  useEffect(() => {
    const user = JSON.parse(
      window.localStorage.getItem('user')
    )

    if (user === null) return
    blogsService.setToken(user.token)
    setUser(user)
  }, [])

  async function handleLogin (credentials) {
    try {
      const user = await loginService.login(credentials)

      blogsService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setMessageWithTimeLimit({
        text: 'Login Successful',
        type: 'successful'
      })
    } catch (exception) {
      setMessageWithTimeLimit({
        text: exception.response.data.message,
        type: 'error'
      })
    }
  }

  function handleLogout () {
    window.localStorage.removeItem('user')
    setUser(null)
    setMessageWithTimeLimit({
      text: 'Exited',
      type: 'successful'
    })
  }

  async function handleCreateBlog (newBlog) {
    try {
      blogFormRef.current.hide()
      const createdBlog = await blogsService.create(newBlog)
      console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))
      setMessageWithTimeLimit({
        text: `a new blog ${newBlog.title} ${newBlog.author}`,
        type: 'successful'
      })
    } catch (exception) {
      setMessageWithTimeLimit({
        text: exception.response.data.message,
        type: 'error'
      })
    }
  }

  async function likesToAddOne (blog) {
    const { id, title, author, url, likes, user } = blog
    const blogToUpdate = {
      title,
      author,
      url,
      likes: likes + 1,
      user: user.id
    }

    const updatedBlog = await blogsService.update(id, blogToUpdate)

    setBlogs(blogs.map(b => {
      if (b.id === blog.id) {
        return updatedBlog
      }
      return b
    }))
  }

  async function handleDeleteBlog (id) {
    await blogsService.deleteBlog(id)

    const newBlogs = blogs.filter(blog => {
      if (blog.id !== id) return true
      return false
    })

    setBlogs(newBlogs)
  }

  function setMessageWithTimeLimit (message, time = 5000) {
    setMessage(message)
    setTimeout(() => {
      setMessage({ text: null, type: null })
    }, time)
  }

  if (user === null) {
    return (
      <div>
        <Message text={message.text} type={message.type} />
        <LoginForm login={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Message text={message.text} type={message.type} />
      <h2>blogs</h2>
      <p>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      {blogs && blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} likesToAddOne={likesToAddOne} handleDeleteBlog={handleDeleteBlog} />
        )}
    </div>
  )
}

export default App
