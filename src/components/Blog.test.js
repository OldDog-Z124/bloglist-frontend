import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog>', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'root',
      name: 'root',
      id: '643ccf9b2fb5135aca4b41ae'
    },
    id: '643ccf9e2fb5135aca4b41b8'
  }

  let component = null
  let likesToAddOne = null
  let handleDeleteBlog = null

  beforeEach(() => {
    likesToAddOne = jest.fn()
    handleDeleteBlog = jest.fn()

    component = render(
      <Blog
        blog={blog}
        likesToAddOne={likesToAddOne}
        handleDeleteBlog={handleDeleteBlog}
      />
    )
  })

  test('whether a blog compenent render title and author, but does not render URL and number of likes by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
    const user = userEvent.setup()

    await user.click(component.container.querySelector('.blog-show'))

    const blogUrl = component.container.querySelector('.blog-url')

    expect(blogUrl).toHaveAttribute('href', blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()

    await user.click(component.container.querySelector('.blog-show'))

    const blogLikesAdd = component.container.querySelector('.blog-likes-add')

    await user.click(blogLikesAdd)
    await user.click(blogLikesAdd)

    expect(likesToAddOne.mock.calls).toHaveLength(2)
  })
})
