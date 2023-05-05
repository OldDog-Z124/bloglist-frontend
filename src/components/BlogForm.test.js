import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
  const blogToCreate = {
    title: 'Example',
    author: 'Anonymous',
    url: 'https://www.example.com/'
  }

  let component = null
  let user = null
  let createBlog = null

  beforeEach(() => {
    user = userEvent.setup()
    createBlog = jest.fn()

    component = render(<BlogForm createBlog={createBlog} />)
  })

  test('the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
    const titleInput = component.container.querySelector('.blogform-form-title input')
    const authorInput = component.container.querySelector('.blogform-form-author input')
    const urlInput = component.container.querySelector('.blogform-form-url input')

    await user.type(titleInput, blogToCreate.title)
    await user.type(authorInput, blogToCreate.author)
    await user.type(urlInput, blogToCreate.url)

    const submitButton = component.container.querySelector('.blogform-form-submit button')

    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blogToCreate)
  })
})
