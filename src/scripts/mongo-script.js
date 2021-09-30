'use strict'

const mongoose = require('mongoose')
const { mongoConnect } = require('../db/connect-db')
const nerdcastList = require('../data/json/nerdcasts-sinc_2021-09-28.json')

async function importEpisodes() {
  const Nerdcast = mongoose.model('nerdcast')

  const bulk = await Promise.all(
    nerdcastList.map(async function (episode) {
      let nerdcast = await Nerdcast.findOne({ id: episode.id })

      if (!nerdcast) {
        nerdcast = new Nerdcast(episode)
      }

      return nerdcast
    })
  )

  return Nerdcast.bulkSave(bulk)
}

async function exportEpisodes() {
  const Nerdcast = mongoose.model('nerdcast')

  const episodes = await Nerdcast.find({})

  return episodes.map((episode) => {
    return episode.export
  })
}

async function run() {
  console.log('INICIO')

  await mongoConnect()

  const retorno = await importEpisodes()

  console.log('FIM')

  return retorno
}

run()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
