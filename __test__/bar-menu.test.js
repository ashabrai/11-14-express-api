'use strict';

const superagent = require('superagent');
const server = require('../src/lib/server');
const barMenuMock = require('./lib/barMenu-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/barMenu`;

describe('/api/barMenu', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(barMenuMock.pCleanBarMenuPostMocks());

  // PUT
  test('should respond with 200 status code, and new json bar menu', () => {
    let savedMock;
    return barMenuMock.pCreateBarMenuPostMock()
      .then((mock) => {
        savedMock = mock;
        return superagent.put(`${API_URL}/${mock.barMenu._id}`)
          .send({
            name: 'I am the updated title',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('I am the updated title');
        expect(response.body.alcohol).toEqual(savedMock.barMenu.alcohol);
        expect(response.body._id.toString()).toBeTruthy();
        expect(response.body.barMenu.toString()).toEqual(savedMock.barMenu._id.toString());
      });
  });
});
//   test('should respond with 200 status and json bar menu if there is a matching id', () => {
//     let savedBarMenuMock = null;
//     return barMenuMock.pCreateBarMenuMock()
//       .t
// hen((createdBarMenuMock) => {
//         savedBarMenuMock = createdBarMenuMock;
//         return superagent.get(`${API_URL}/${createdBarMenuMock._id}`);
//       })
//       .then((getResponse) => {
//         expect(getResponse.status).toEqual(200);
//         expect(getResponse.body._id.toString()).toEqual(savedBarMenuMock._id.toString());
//         expect(getResponse.body.name).toEqual(savedBarMenuMock.name);
//       });
//   });
// });
