'use strict';

const mongoose = require('mongoose');


const seattleBarSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  barMenu:
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'barMenu',
    },
},
{
  usePushEach: true,
});

module.exports = mongoose.model('seattleBar', seattleBarSchema);
