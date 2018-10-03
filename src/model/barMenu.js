'use strict';


const mongoose = require('mongoose');
const HttpError = require('http-errors');
const SeattleBar = require('../model/seattlebar');

const barMenuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alcohol: {
    type: String,
    required: true,
    minLength: 5,
  },
  seattleBar: // this could all be lowercase
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'seattleBar',
    },
});

function barMenuPreHook(done) {
  return SeattleBar.findById(this.seattleBar)
    .then((seattleBarFound) => {
      if (!seattleBarFound) {
        throw new HttpError(404, 'bar item not found');
      }
      seattleBarFound.barMenus.push(this._id);
      return seattleBarFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}
const seattleBarPostHook = (document, done) => {
  return SeattleBar.findById(document.seattleBar)
    .then((seattleBarFound) => {
      if (!seattleBarFound) {
        throw new HttpError(500, 'bar item not found');
      }
      seattleBarFound.barMenu = seattleBarFound.barMenu.filter((barMenu) => {
        return barMenu._id.toString() !== document._id.toString();
      });
      return seattleBarFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
};
barMenuSchema.pre('save', barMenuPreHook);
barMenuSchema.post('remove', seattleBarPostHook);


module.exports = mongoose.model('barMenu', barMenuSchema);
