describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');

    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 1);

    cy.get('[data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');
  });

  it('Atualiza corretamente o contador de tarefas restantes', () => {
    cy.visit('');
  
    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');
  
    cy.get('.todo-count')
      .should('contain.text', '3');
  
    cy.get('.todo-list li .toggle')
      .first()
      .check();
  
    cy.get('.todo-count')
      .should('contain.text', '2');
  });

  it('Remove todas as tarefas concluídas com o botão "Clear completed"', () => {
    cy.visit('');
  
    cy.get('.new-todo')
      .type('Comprar pão{enter}')
      .type('Estudar testes{enter}')
      .type('Lavar o carro{enter}');
  
    cy.get('.todo-list li .toggle')
      .eq(0).check();
    cy.get('.todo-list li .toggle')
      .eq(1).check();
  
    cy.get('.clear-completed')
      .should('be.visible')
      .click();
  
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .find('label')
      .should('have.text', 'Lavar o carro');
  
    cy.get('.todo-count')
      .should('contain.text', '1');
  });
});
