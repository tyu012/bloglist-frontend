describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.get('#usernameInput')
    cy.contains('password')
    cy.get('#passwordInput')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.createUser({
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'secret'
      })
    })

    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('secret')
      cy.get('#loginButton').click()
      cy.contains('logged in as hellas')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('hellas')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()
      cy.contains('wrong username or password')
    })
  })
})