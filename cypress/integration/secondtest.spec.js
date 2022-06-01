describe('second suite', () => {
    it('open the homepage', () => {
        cy.intercept('https://api.demoblaze.com/entries').as('entries')
        cy.visit('https://www.demoblaze.com')
        cy.wait('@entries').then(($entriesResponse) => {
            expect($entriesResponse.response.statusCode).to.eq(200)
            expect(JSON.stringify($entriesResponse.response.body)).to.contain('HTC One M9')
        })
    })
    it('stub response on homepage', () => {
        cy.intercept('https://api.demoblaze.com/entries', {fixture : "stubbedResponse.json"}).as('entries')
        cy.visit('https://www.demoblaze.com')
        cy.wait('@entries').then(($entriesResponse) => {
            cy.log($entriesResponse.response.statusCode).to.eq(200)
            expect(JSON.stringify($entriesResponse.response.body)).to.contain('HTC One M9')
        })
        })
    it('stub status coded', () => {
        cy.intercept('https://api.demoblaze.com/view', {statusCode : 500}).as('theView')
        cy.visit('https://www.demoblaze.com/prod.html?idp_=7')
        cy.wait('@theView').then(($theStubbedResponse) => {
            expect($theStubbedResponse.response.statusCode).to.eq(500)
        })
    })
    it.only('demo test', () => {
        cy.visit('https://www.apple.com/')
        cy.origin('https://www.google.com', () => {
                cy.visit('https://www.google.com')
             })
    })
})