'use strict';

// this is my many which is vincio blog post
const faker = require('faker');
const seattleBarMock = require('./seattlebar-mock');
const BarMenu = require('../../src/model/barMenu');


const barMenuMock = module.exports = {};

barMenuMock.pCreateSeattleBarMock = () => {
  const resultMock = {};

  return seattleBarMock.pCreateSeattleBarMock()
    .then((createdSeattleBarMock) => {
      resultMock.seattleBar = createdSeattleBarMock;

      return new BarMenu({
        name: faker.lorem.words(5),
        alcohol: faker.lorem.words(5),
        seattleBar: createdSeattleBarMock.id,
      }).save();
    })
    .then((createdBarMenuMock) => {
      resultMock.barMenu = createdBarMenuMock;
      return resultMock;
    });
};
barMenuMock.pCleanBarMenuPostMocks = () => {
  return Promise.all([
    BarMenu.remove({}),
    seattleBarMock.pCleanSeattleBarMock(),
  ]);
};
