describe('Blog app', function() {
  beforeEach(function() {
    cy.request('GET', `${Cypress.env('BACKEND')}/states/initialization`)
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.get('.loginform')
      .should('exist')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      const user = {
        username: 'root',
        password: '123456'
      }

      cy.login(user)

      cy.get('.loginform')
        .should('not.exist')
    })

    it('fails with wrong credentials', function() {
      const user = {
        username: 'root',
        password: '******'
      }

      cy.login(user)

      cy.get('.loginform')
        .should('exist')
    }) 
  })

  describe('When logged in', function() {
    beforeEach(function() {
      
      const user = {
        username: 'root',
        password: '123456'
      }
      
      cy.login(user)
    })

    it('A blog can be created', function() {
      const newBlog = {
        title: 'example',
        author: 'anonymous',
        url: 'https://www.example.com/'
      }

      cy.createBlog(newBlog)

      cy.get('.blog').should(blog => {
        expect(blog).to.have.length(7)
      })
    })

    it('A blog can be likes', function() {
      
      cy.get('.blog').first().as('the-blog')

      cy.get('@the-blog').find('.blog-show').click()
      
      cy.get('@the-blog').find('.blog-likes-add').click()
      
      cy.get('@the-blog').find('.blog-likes-number').should('contain', '13')
    })

    it('A blog can be remove', function() {
      cy.get('.blog').first().as('the-blog')

      cy.get('@the-blog').find('.blog-show').click()
      
      cy.get('@the-blog').find('.blog-remove').click()
      
      cy.get('.blog').should(blog => {
        expect(blog).to.have.length(5)
      })
        
    })

    it('Only blog creators can see the remove button', function() {
      cy.get('.blog').first().as('the-blog')

      cy.get('@the-blog').find('.blog-show').click()
      cy.get('@the-blog').find('.blog-remove').should('exist')

      cy.logout()

      const user = {
        username: 'goudaner',
        password: 'chifan'
      }
      cy.login(user)

      cy.get('@the-blog').find('.blog-show').click()
      cy.get('@the-blog').find('.blog-remove').should('not.exist')
    })

    it('Blogs is arranged according to likes', function() {
      
    })
  })
})