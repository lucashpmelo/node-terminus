'use strict'

const mongoose = require('mongoose')
const fs = require('fs')
const { mongoConnect } = require('../db/mongoose-db')
const nerdcastList = require('../data/json/nerdcasts-sinc_2021-10-29.json')

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

  const data = episodes.map((episode) => {
    return episode.export
  })

  fs.writeFileSync(
    './src/data/json/nerdcasts-sinc_2022-05-27.json',
    JSON.stringify(data)
  )

  return data
}

async function run() {
  console.log('INICIO')

  await mongoConnect()

  // const retorno = await importEpisodes()
  // const retorno = await exportEpisodes()

  console.log('FIM')

  return retorno
}

// run()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
