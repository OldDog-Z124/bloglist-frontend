import { useState } from 'react'

function BlogForm ({ createBlog }) {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  async function handleCreateBlog (event) {
    event.preventDefault()

    try {
      await createBlog({
        title, author, url
      })

      setTitle(null)
      setAuthor(null)
      setUrl(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor='title'>title:</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title ?? ''}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            type='text'
            name='author'
            id='author'
            value={author ?? ''}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input
            type='text'
            name='url'
            id='url'
            value={url ?? ''}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
