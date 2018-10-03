'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const BarMenu = require('../model/barMenu');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

// router.post('/api/barMenus', jsonParser, (request, response, next) => {
//   return new BarMenu(request.body).save()
//     .then((savedBarMenu) => {
//       logger.log(logger.INFO, 'Responding with a 200 status code');
//       return response.json(savedBarMenu);
//     })
//     .catch(next);
// });

// router.get('api/barMenus/:id', (request, response, next) => {
//   return BarMenu.findById(request.params.id)
//     .then((barMenu) => {
//       if (barMenu) {
//         logger.log(logger.INFO, 'Responding with a 200 status and a bar menu');
//         return response.json(barMenu);
//       }
//       logger.log(logger.INFO, 'Responding with a 404 status code, menu not found');
//       return next(new HttpError(404, 'bar menu not found'));
//     })
//     .catch(next);
// });
router.put('/api/barMenu/:id', jsonParser, (request, response, next) => {
  return BarMenu.findById(request.params.id)
    .then((barMenu) => {
      if (!request.alcohol) {
        throw HttpError(400, 'alcohol is required');
      }
      if (!barMenu) {
        throw HttpError(400, 'not bar found');
      }
      if (request.body.name) {
        barMenu.set({
          name: `${request.body.name}`,
        });
      }
      if (request.body.alcohol) {
        barMenu.set({
          alcohol: `${request.body.alcohol}`,
        });
      }
      logger.log(logger.INFO, 'Responding with 200 status update drink menu');
      return barMenu.save()
        .then(updateBarMenu => response.json(updateBarMenu))
        .catch(next);
    })
    .catch(next);
});
// router.delete('/api/barMenus/:id', (request, response, next) => {
//   return BarMenu.findByIdAndDelete(request.params.id)
//     .then((barMenu) => {
//       if (barMenu) {
//         logger.log(logger.INFO, 'drink item deleted');
//         return response.json(204, barMenu);
//       }
//       logger.log(logger.INFO, 'Responding with 404 status bar menu not found');
//       return next(new HttpError(404, 'Bar menu has not been found'));
//     })
//     .catch(next);
// });
