'use strict'

const mongoose = require('mongoose')
const { connectionString } = require('../config')

// Carrega os Models
const Nerdcast = require('../models/nerdcast-model')
const Historico = require('../models/historico-model')

exports.mongoConnect = async () => {
  return await mongoose.connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
}

exports.mongoDisconnect = async () => {
  return await mongoose.disconnect()
}
