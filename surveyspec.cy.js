// survey_tests.js

describe('SuperSurvey - Create survey', () => {
  before(()=>{
    // Visit website
    cy.launchWebsite();
  });

  it('should add Survey Title and edit it using TinyMCE editor', () => {
    cy.fixture('survey.json').then((data) =>{
    // Confirm title name text field is displayed and has default text
    cy.get(data.elementSurveyTitle).should('have.value', data.defaultSurveyTitle);   

    // Type survey title and click the editor icon in the survey title field
    cy.get(data.elementSurveyTitle).clear().type(data.surveyTitle).then(()=>{
      cy.get(data.elementEditorIcon).should('be.visible').click();
    })

    // Confirm TinyMCE editor is opened
    cy.get(data.elementTINYMCE).should('be.visible');

    // Type and save changes in TinyMCE editor
    cy.get(data.elementTINYMCE).clear().type(data.editedSurveyTitle);
    cy.get(data.elementTINYMCEOk).click();

    // Confirm the changes are saved
    cy.get(data.elementSurveyTitle).should('have.value', data.editedSurveyTitle);
  })
  });

  it('should choose Survey Type', () => {
    cy.fixture('survey.json').then((data) =>{
    // Confirm survey type dropdown is displayed and has default option
    cy.get(data.elementSurveyTypeDropDown).should('contain.text', data.surveyType);

    // Choose "Survey/Other" from the dropdown menu
    cy.get(data.elementSurveyTypeDropDown).select(data.surveyType);
    })
  });

  it('should add Multiple Choice Answer and perform actions', () => {
    cy.fixture('survey.json').then((data) =>{
    // Add an question
    cy.get(data.elementAddQuestionButton).click(); 

    // Click the multiple choice option
    cy.contains(data.multipleChoiceOption).should('be.visible').click();

    // Confirm multiple choice template is displayed
    cy.contains(data.multipleChoiceOption).should('be.visible');

    // Confirm New Survey button is display
    cy.get(data.elementNewSurveyButton).should('be.visible');

    // Confirm question text field is displayed and has default text
    cy.get(data.elementQuestionTextField).should('have.value', data.defaultQuestionText);

    // Type in question text field
    cy.get(data.elementQuestionTextField).type(data.questionText)

    // Confirm first answer text field is displayed and has default text
    cy.get(data.elementAnswerTextField).first().should('have.value', data.firstDefaultAnswerText);

    // Type in first answer text field
    cy.get(data.elementAnswerTextField).first().type(data.firstAnswerText);

    // Confirm second answer text field is displayed and has default text
    cy.get(data.elementAnswerTextField).eq(1).should('have.value', data.secondDefaultAnswerText);

    // Type in second answer text field
    cy.get(data.elementAnswerTextField).eq(1).type(data.secondAnswerText);

    // Confirm options to delete and move fields are visible in the answer text field
    cy.get(data.elementAnswerTextField).first().trigger('mouseover').then(()=>{
      cy.get(data.elementDeleteAnswerButton).should('exist');
        });
  
      cy.get(data.elementAnswerTextField).first().trigger('mouseover').then(()=>{
      cy.get(data.elementDragAnswerButton).should('exist');
        });

    // Confirm a new answer text field is generated
    cy.get(data.elementAnswerTextField).last().should('have.value', data.secondDefaultAnswerText);
      })
  });

  it('should preview questions and verify elements on the page', () => {
    cy.fixture('survey.json').then((data) =>{
    // Preview questions
    cy.get('input[type="submit').should('exist').click(); 

    // Confirm new browser tab is created displaying the correct survey title
    cy.url().should('contain', data.newBrowserTab);
    cy.get('h1').contains(data.editedSurveyTitle).should('be.visible');
    cy.contains(data.questionText).should('be.visible');

    // Confirm multiple choice checkboxes are displayed for the answer options
    cy.contains('label', data.firstAnswerText).find('input[type="checkbox"]').should('be.visible');
    cy.contains('label', data.secondAnswerText).find('input[type="checkbox"]').should('be.visible');

    // Confirm when finish button is clicked the message "Thanks for taking the survey" is displayed
    cy.get(data.elementPreviewFinishButton).should('exist').click();
    cy.contains(data.finishedMessage).should('be.visible');

    // Close the current tab
      cy.window().then(win => {
        win.close();
      });
    })
  });
    

  it('should save the survey and verify success message', () => {
    cy.fixture('survey.json').then((data) =>{
    // Click Create Survey button
    cy.get(data.elementSaveSurveyButton).should('exist').click(); 
    
    // Confirm success message is displayed
    cy.get(data.elementNewSurveyButton).should('contain.text', data.successMessage);
    cy.get(data.elementNewSurveyButton).should('contain.text', Cypress.moment().format('D/M/YYYY'));
    cy.get(data.elementNewSurveyButton).should('contain.text', Cypress.moment().format('m:ss.SSS'));
    })
  });

  it('should display popup for negative case empty question field', () => {
    cy.fixture('survey.json').then((data) =>{
    // Visit website
    cy.visit('/')

    // Confirm survey type dropdown is displayed and has default option
    cy.get(data.elementSurveyTypeDropDown).should('contain.text', data.surveyType);

    // Add an question
    cy.get(data.elementAddQuestionButton).click(); 

    // Click the multiple choice option
    cy.contains(data.multipleChoiceOption).should('be.visible').click();

    // Try to save survey with empty fields
    cy.get(data.elementSuccessMessage).click(); 

    // Assert that an error message is displayed
    cy.contains(data.elementErrorMessageLineOne).should('be.visible'); 
    cy.contains(data.elementErrorMessageLineTwo).should('be.visible'); 
    cy.contains(data.elementErrorMessageOKButton).should('be.visible').click();
    })
  });
});