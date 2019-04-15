beforeEach(() => {
  cy.visit('/')
  cy.wait(2000)
})

describe('Page navigation tests', () => {
  it('Changes to course page when clicking on course header', () => {
    cy.get('.course-title').first().click()
    cy.url().should('include', '/courses')
  })

  it('Goes to correct course page when clicking on course card', () => {
    cy.get('.course-title').first().click()
    cy.contains('MAY1')
  })

  it('Returns to frontpage when clicking on logo', () => {
    cy.get('.course-title').first().click()
    cy.contains('MAY1')
    cy.get('.hero-logo').first().click()
    cy.contains('Etusivu')
  })

  it('Return to frontpage when clickin on Materiaalit', () => {
    cy.get('.course-title').first().click()
    cy.get('.navigator-item').first().click()
    cy.url().should('be', '/')
  })

  it('Goes to course admin page when navigation link is pressed', () => {
    cy.get('.dropdown-content-link').first().click({force: true})
    cy.wait(500)
    cy.url().should('be', '/courseAdmin')
  })
})

describe('Consecutive navigation tests', () => {
  it('test 1', () => {
    cy.get('.course-title').first().click()
    cy.contains('MAY1')
    cy.get('.hero-logo').first().click()
    cy.contains('Etusivu')
    cy.get('.course-title').eq(3).click()
    cy.contains('MAA5')
    cy.get('.hero-logo').first().click()
    cy.contains('Etusivu')
  })

  it('test 2', () => {
    cy.get('.course-title').last().click()
    cy.contains('MAA3')
    cy.get('.hero-logo').first().click()
    cy.contains('Etusivu')
    cy.get('.course-title').eq(4).click()
    cy.contains('MAA6')
    cy.get('.hero-logo').first().click()
    cy.contains('Etusivu')
  })
})
