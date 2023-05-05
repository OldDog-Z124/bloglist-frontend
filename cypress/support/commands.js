// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('.loginform-form').as('loginform')

  cy.get('@loginform')
    .find('.loginform-form-username input')
    .type(username)

  cy.get('@loginform')
    .find('.loginform-form-password input')
    .type(password)

  cy.get('@loginform')
    .find('.loginform-form-submit button')
    .click()
})

Cypress.Commands.add('logout', () => {
  cy.get('.main-user-logout').click()
})

Cypress.Commands.add('createBlog', ({title, author, url}) => {
  cy.get('.togglable').find('#hide button').click()

  cy.get('.blogform').find('.blogform-form').as('blogform')

  cy.get('@blogform')
    .find('.blogform-form-title input')
    .type(title)

  cy.get('@blogform')
    .find('.blogform-form-author input')
    .type(author)

  cy.get('@blogform')
    .find('.blogform-form-url input')
    .type(url)

  cy.get('@blogform')
    .find('.blogform-form-submit button')
    .click()
})

Cypress.Commands.add('createBlogAPI', (user, blog) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, user)
    .then(response => {
      return response.body.token
    })
    .then(token => {
      return cy.request({
        method: 'POST', 
        url: `${Cypress.env('BACKEND')}/blogs`,
        body: blog,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    })
    .then(response => {
      cy.visit('')
    })
  
})