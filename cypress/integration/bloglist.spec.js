describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'secret'
    })
    cy.visit('http://localhost:3000')
  })



  it('Login form is shown', function () {
    cy.contains('username')
    cy.get('#usernameInput')
    cy.contains('password')
    cy.get('#passwordInput')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('secret')
      cy.get('#loginButton').click()
      cy.contains('logged in as hellas')
    })

    it('fails with wrong credentials', function () {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset-blogs')
      cy.visit('http://localhost:3000')
      cy.login({ username: 'hellas', password: 'secret' })
    })

    it('A blog can be created', function () {
      cy.get('.togglableButton').contains('create new blog').click()
      cy.get('#blogFormTitle').type('Example Blog')
      cy.get('#blogFormAuthor').type('John Appleseed')
      cy.get('#blogFormUrl').type('https://example.com')
      cy.get('#blogFormSubmit').contains('create').click()
      cy.get('.basicBlogInfo')
    })

    describe('When blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Example Blog',
          author: 'John Appleseed',
          url: 'https://example.com'
        }).then(() => {
          cy.reload()
        })
      })

      it('Users can like a blog', function () {
        cy.get('.basicBlogInfo > button').click()
        cy.contains('like').click()
      })

      it('Poster can delete a blog', function () {
        cy.get('.basicBlogInfo > button').click()
        cy.contains('remove').click()
      })

      describe('When multiple blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'More liked blog',
            author: 'John Appleseed',
            url: 'https://a.example.com',
            likes: 5
          }).then(() => {
            cy.createBlog({
              title: 'Most liked blog',
              author: 'John Appleseed',
              url: 'https://b.example.com',
              likes: 10
            })
          }).then(() => {
            cy.reload()
          })
        })

        it('Blogs are sorted by descending number of likes', function () {
          cy.get('.basicBlogInfo > button').click({ multiple: true })
          cy.get('.blogLikes > span')
            .then(blogLikesText => {
              const blogLikes = blogLikesText.map((_, value) =>
                parseInt(value.textContent))
              for (let i = 0; i < blogLikes.length - 1; i++) {
                assert.isAtMost(blogLikes[i + 1], blogLikes[i])
              }
            })
        })
      })
    })
  })
})