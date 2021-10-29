'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  id: {
    type: Number,
    required: true,
    index: true,
  },
  lista: [
    {
      type: Object,
      required: true,
    },
  ],
})

module.exports = mongoose.model('historico', schema)
