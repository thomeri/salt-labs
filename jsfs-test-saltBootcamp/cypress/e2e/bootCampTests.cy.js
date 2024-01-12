const testBootcamp = 'dnfs';
const devName = 'Carla Sharpson';

describe('functional tests', () => {
  const BootcampApp = {
    visit: () => cy.visit('http://localhost:5173'),
    addDevForm: () => cy.get('[id="addDeveloperForm"]'),
    addDevBtn: () => cy.get('[class="form__button-addDev"]'),
    developerGallery: () => cy.get('[class="gallery"]'),
    addNewDeveloper: (name) => {
      const firstInput = BootcampApp.addDevForm().find(
        '.form__input-name'
      );
      name && firstInput.type(name);
      BootcampApp.addDevBtn().click();
      return;
    },
    filterSelect: () => {
      cy.get('.gallery__filter-select-bootcamp').within(() => {
        cy.get('option').parent().select('dnfs');
      })
    },
  };
  
  beforeEach(() => {
    fetch('http://localhost:3001/api/reset');
    BootcampApp.visit();
  });

  it('loads the site', () => {
    BootcampApp.visit();
  });

  describe('The form', () => {
    it('exists', () => {
      BootcampApp.addDevForm().should("exist");
    });

    it('Error message displays when submitting with empty input', () => {
      BootcampApp.addNewDeveloper();
      cy.get('.form__error-message').should('exist');
    });

    it('creates a new developer', () => {
      cy.get('.bootcamp-list__person--developer')
      .should('have.length', 9 );
      BootcampApp.addNewDeveloper(devName);
      cy.wait(500);
      cy.get('.bootcamp-list__person--developer')
        .should('have.length', 10 );
    });
  });

  describe('The Gallery', () => {
    it('exists', () => {
      BootcampApp.developerGallery().should('exist');
    })
    it('checks that all lists render with no filter active', () => {
       cy.get('.gallery__bootcamp-list').should('have.length', 3);
    });

    it('displays only 1 bootcamp when dnfs is selected in the filter', () => {
      BootcampApp.filterSelect();
      cy.get('.gallery__bootcamp-list').should('have.length', 1);
    });
  
    it('developer can be deleted', () => {
      cy.get('.bootcamp-list__person--developer').should('have.length', 9);
      cy.get('.bootcamp-list__person--developer').first().click();
      cy.get('.bootcamp-list__person__button-delete').click();
      cy.get('.bootcamp-list__person--developer').should('have.length', 8);
    });

    it('instructor does not have delete button on click', () => {
      cy.get('.bootcamp-list__person--instructor').should('have.length', 7);
      cy.get('.bootcamp-list__person--instructor').first().click();
      cy.get('.bootcamp-list__person__button-delete').should('not.exist');
    });

    it('deletes the correct developer', () => {
      BootcampApp.addNewDeveloper('Delete This Developer');
      cy.wait(500);
      cy.get('.bootcamp-list__person--developer').contains('Delete This Developer').click()
      cy.get('.bootcamp-list__person__button-delete').click();
      cy.get('.bootcamp-list__person--developer').contains('Delete This Developer').should('not.exist')
    });
  });
});