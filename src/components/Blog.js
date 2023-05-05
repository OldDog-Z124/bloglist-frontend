import { useState } from 'react'

function Blog ({ blog, user, likesToAddOne, handleDeleteBlog }) {
  const [visible, setVisible] = useState(false)
  const toggleText = visible ? 'hide' : 'view'
  function handleToggle () {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div className='blog-header'>
        <h3 className='blog-title'>{blog.title}</h3>
        <p className='blog-author'>{blog.author}</p>
        <button className='blog-show' onClick={handleToggle}>{toggleText}</button>
      </div>
      {visible &&
        <>
          <div className='blog-main'>
            <a className='blog-url blog-item' href={blog.url} title={blog.url} target='__blank'>Home</a>
            <div className='blog-creater blog-item'>{blog.user.name}</div>
            <div className='blog-likes blog-item'>
              <span className='blog-likes-number'>{blog.likes}</span>
              <button className='blog-likes-add' onClick={() => likesToAddOne(blog)}>like</button>
            </div>
          </div>
          <div className='blog-footer'>
            {
              user.username === blog.user.username &&
              <button className='blog-remove' onClick={() => handleDeleteBlog(blog.id)}>remove</button>
            }
          </div>
        </>
      }
    </div>
  )
}
export default Blog
