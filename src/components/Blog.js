import { useState } from 'react'

function Blog ({ blog, likesToAddOne, handleDeleteBlog }) {
  const [visible, setVisible] = useState(false)
  const toggleText = visible ? 'hide' : 'view'
  function handleToggle () {
    setVisible(!visible)
  }

  const visibleStyle = {
    display: visible ? '' : 'none'
  }
  const style = {
    padding: '10px 20px',
    margin: '10px',
    border: '2px solid #000',
    borderRadius: '10px'
  }

  return (
    <div style={style}>
      <div>
        <span>{blog.title} {blog.author}</span>
        <button onClick={handleToggle}>{toggleText}</button>
      </div>
      <div style={visibleStyle}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          <span>{blog.likes}</span>
          <button onClick={() => likesToAddOne(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
      <div>
        <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  )
}
export default Blog
