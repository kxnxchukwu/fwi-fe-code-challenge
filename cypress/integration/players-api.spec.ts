import initialData from '../../src/assets/initialData.json';

const PLAYERS_ENDPOINT = 'http://localhost:3000/api/players';
const DEFAULT_PLAYERS = Object.values(initialData);

beforeEach(() => {
  // make sure data gets reset between each test
  cy.writeFile('./src/assets/data.json', JSON.stringify(initialData));
});

describe('players API', () => {
  context('listing all players and pagination', () => {
    it('should return the list of players', () => {
      cy.request(PLAYERS_ENDPOINT).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.eq(
          'application/json; charset=utf-8'
        );
        expect(response.body).to.have.property('size', -1);
        expect(response.body).to.have.property('from', 0);
        expect(response.body).to.have.property('total', 50);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.deep.equal(DEFAULT_PLAYERS);
      });
    });

    it('should allow for pagination using the from and size query parameters', () => {
      cy.request(`${PLAYERS_ENDPOINT}?size=1`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.eq(
          'application/json; charset=utf-8'
        );
        expect(response.body).to.have.property('size', 1);
        expect(response.body).to.have.property('from', 0);
        expect(response.body).to.have.property('total', 50);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.deep.equal(DEFAULT_PLAYERS.slice(0, 1));
      });

      cy.request(`${PLAYERS_ENDPOINT}?size=10&from=10`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.eq(
          'application/json; charset=utf-8'
        );
        expect(response.body).to.have.property('size', 10);
        expect(response.body).to.have.property('from', 10);
        expect(response.body).to.have.property('total', 50);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.deep.equal(
          DEFAULT_PLAYERS.slice(10, 20)
        );
      });
    });

    it('should allow for sorting with the sortBy and sortOrder query params', () => {
      const sortedByName = DEFAULT_PLAYERS.slice().sort((a, b) => {
        return a.name.localeCompare(b.name, 'en-US', {
          numeric: true,
          caseFirst: 'upper',
        });
      });

      cy.request(`${PLAYERS_ENDPOINT}?sortBy=name&size=3`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('size', 3);
        expect(response.body).to.have.property('from', 0);
        expect(response.body).to.have.property('total', 50);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.deep.equal(sortedByName.slice(0, 3));
      });

      cy.request(`${PLAYERS_ENDPOINT}?sortBy=name&size=3&sortOrder=desc`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('size', 3);
          expect(response.body).to.have.property('from', 0);
          expect(response.body).to.have.property('total', 50);
          expect(response.body).to.have.property('items');
          expect(response.body.items).to.deep.equal(
            sortedByName.slice(-3).reverse()
          );
        }
      );

      const sortedByWinnings = DEFAULT_PLAYERS.slice().sort(
        (a, b) => a.winnings - b.winnings
      );

      cy.request(`${PLAYERS_ENDPOINT}?sortBy=winnings&size=3`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('size', 3);
          expect(response.body).to.have.property('from', 0);
          expect(response.body).to.have.property('total', 50);
          expect(response.body).to.have.property('items');
          expect(response.body.items).to.deep.equal(
            sortedByWinnings.slice(0, 3)
          );
        }
      );

      cy.request(
        `${PLAYERS_ENDPOINT}?sortBy=winnings&size=3&sortOrder=desc`
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('size', 3);
        expect(response.body).to.have.property('from', 0);
        expect(response.body).to.have.property('total', 50);
        expect(response.body).to.have.property('items');
        expect(response.body.items).to.deep.equal(
          sortedByWinnings.slice(-3).reverse()
        );
      });
    });

    it('should return a bad request with invalid values for query paramters', () => {
      cy.request({
        url: `${PLAYERS_ENDPOINT}?size=bob`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.equal({
          reason: '"size" must be a number',
        });
      });

      cy.request({
        url: `${PLAYERS_ENDPOINT}?from=bob`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.equal({
          reason: '"from" must be a number',
        });
      });

      cy.request({
        url: `${PLAYERS_ENDPOINT}?sortBy=bob`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.reason).to.equal(
          '"sortBy" must be one of [name, country, winnings]'
        );
      });

      cy.request({
        url: `${PLAYERS_ENDPOINT}?sortOrder=bob`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.reason).to.equal(
          '"sortOrder" must be one of [asc, desc]'
        );
      });
    });
  });

  context('get a specific player', () => {
    it('should find a player by id', () => {
      const [player1] = DEFAULT_PLAYERS;
      cy.request(`${PLAYERS_ENDPOINT}/${player1.id}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(player1);
      });
    });

    it('should return a 404 for an unknown player id', () => {
      cy.request({
        url: `${PLAYERS_ENDPOINT}/unknown-id`,
        failOnStatusCode: false,
      })
        .its('status')
        .should('be.equal', 404);
    });
  });

  context('creating players', () => {
    it('should be able to create a new player by sending a POST', () => {
      const newPlayer = {
        name: 'New Player',
        country: 'US',
        winnings: 1000,
      };

      let id = '';
      cy.request({
        url: PLAYERS_ENDPOINT,
        method: 'POST',
        body: newPlayer,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', 'New Player');
        expect(response.body).to.have.property('country', 'US');
        expect(response.body).to.have.property('winnings', 1000);
        expect(response.body).to.have.property('id');
        ({ id } = response.body);

        expect(response.body).to.have.property(
          'imageUrl',
          `https://i.pravatar.cc/40?u=${id}`
        );

        expect(response.headers).to.have.property(
          'location',
          `/api/players/${id}`
        );
      });

      cy.request(`${PLAYERS_ENDPOINT}/${id}`)
        .its('status')
        .should('be.equal', 200);
    });

    it('should allow the imageUrl to be an empty string', () => {
      const newPlayer = {
        name: 'New Player',
        country: 'US',
        winnings: 1000,
        imageUrl: '',
      };

      let id = '';
      cy.request({
        url: PLAYERS_ENDPOINT,
        method: 'POST',
        body: newPlayer,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', 'New Player');
        expect(response.body).to.have.property('country', 'US');
        expect(response.body).to.have.property('winnings', 1000);
        expect(response.body).to.have.property('id');
        ({ id } = response.body);

        expect(response.body).to.have.property(
          'imageUrl',
          `https://i.pravatar.cc/40?u=${id}`
        );

        expect(response.headers).to.have.property(
          'location',
          `/api/players/${id}`
        );
      });

      cy.request(`${PLAYERS_ENDPOINT}/${id}`)
        .its('status')
        .should('be.equal', 200);
    });

    it('should allow a custom imageUrl', () => {
      const newPlayer = {
        name: 'New Player',
        country: 'US',
        winnings: 1000,
        imageUrl: 'https://example.com',
      };

      let id = '';
      cy.request({
        url: PLAYERS_ENDPOINT,
        method: 'POST',
        body: newPlayer,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', 'New Player');
        expect(response.body).to.have.property('country', 'US');
        expect(response.body).to.have.property('winnings', 1000);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property(
          'imageUrl',
          'https://example.com'
        );
        ({ id } = response.body);
      });

      cy.request(`${PLAYERS_ENDPOINT}/${id}`)
        .its('status')
        .should('be.equal', 200);
    });

    it('should prevent a user from being created with invalid data', () => {
      cy.request({
        url: PLAYERS_ENDPOINT,
        method: 'POST',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });

  context('modifying players', () => {
    it('should be able to modify a player with a PATCH request', () => {
      const [player1] = DEFAULT_PLAYERS;

      const changed1 = {
        name: 'Changed Name',
      };

      cy.request({
        url: `${PLAYERS_ENDPOINT}/${player1.id}`,
        method: 'PATCH',
        body: changed1,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          ...player1,
          ...changed1,
        });
      });

      cy.request(`${PLAYERS_ENDPOINT}/${player1.id}`)
        .its('body')
        .should('deep.equal', {
          ...player1,
          ...changed1,
        });

      const changed2 = {
        winnings: 30000,
      };
      cy.request({
        url: `${PLAYERS_ENDPOINT}/${player1.id}`,
        method: 'PATCH',
        body: changed2,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          ...player1,
          ...changed1,
          ...changed2,
        });
      });

      cy.request(`${PLAYERS_ENDPOINT}/${player1.id}`)
        .its('body')
        .should('deep.equal', {
          ...player1,
          ...changed1,
          ...changed2,
        });
    });

    it('should return a 400 for invalid data', () => {
      const [player1] = DEFAULT_PLAYERS;
      const url = `${PLAYERS_ENDPOINT}/${player1.id}`;

      cy.request({
        url,
        method: 'PATCH',
        body: { id: 'noooo' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('reason', '"id" is not allowed');
      });

      cy.request({
        url,
        method: 'PATCH',
        body: { name: 100 },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          'reason',
          '"name" must be a string'
        );
      });

      cy.request({
        url,
        method: 'PATCH',
        body: { name: '' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          'reason',
          '"name" is not allowed to be empty'
        );
      });

      cy.request({
        url,
        method: 'PATCH',
        body: { imageUrl: 'noooo' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          'reason',
          '"imageUrl" must be a valid uri'
        );
      });

      cy.request({
        url,
        method: 'PATCH',
        body: { imageUrl: '' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property(
          'reason',
          '"imageUrl" is not allowed to be empty'
        );
      });
    });

    it('should return a 404 for a non-existing player', () => {
      cy.request({
        url: `${PLAYERS_ENDPOINT}/unknown-id`,
        method: 'PATCH',
        body: { name: 'New Name' },
        failOnStatusCode: false,
      })
        .its('status')
        .should('equal', 404);
    });
  });

  context('deleting players', () => {
    it('should be able to delete a player by id', () => {
      const [player1] = DEFAULT_PLAYERS;
      it('should allow a user to be deleted', () => {
        const url = `${PLAYERS_ENDPOINT}/${player1.id}`;

        cy.request({ url, failOnStatusCode: false })
          .its('status')
          .should('be.equal', 200);

        cy.request({ url, method: 'DELETE' })
          .its('status')
          .should('be.equal', 204);

        cy.request({ url, failOnStatusCode: false })
          .its('status')
          .should('be.equal', 404);
      });
    });

    it('should return a 404 if trying to delete a non-existing player', () => {
      cy.request({
        url: `${PLAYERS_ENDPOINT}/unknown-id`,
        failOnStatusCode: false,
      })
        .its('status')
        .should('be.equal', 404);
    });
  });
});
