'use strict'

const mongoose = require('mongoose')
const { mongoConnect, mongoDisconnect } = require('../db/mongoose-db')
const JNService = require('../services/jovemNerd-service')

async function findListEpisodes() {
  const Nerdcast = mongoose.model('nerdcast')
  const Historico = mongoose.model('historico')

  const params = {
    order: 'ASC',
    orderby: 'id',
    offset: 0,
    per_page: 50,
  }

  let flag = true
  let count = 0

  while (flag) {
    const { data } = await JNService.sinc(params)

    if (Array.isArray(data) && data.length) {
      const bulkHistorico = []

      const bulk = await Promise.all(
        data.map(async function (episode) {
          let nerdcast = await Nerdcast.findOne({ id: episode.id })

          if (!nerdcast) {
            nerdcast = await findById(episode.id)
          } else if (
            new Date(episode.modified_at).toISOString() !==
            new Date(nerdcast.modified_at).toISOString()
          ) {
            let historico = await Historico.findOne({ id: episode.id })

            if (!historico) historico = new Historico({ id: episode.id })

            historico['lista'].push(nerdcast)

            bulkHistorico.push(historico)

            nerdcast = await findById(episode.id)
          }

          return nerdcast
        })
      )

      await Promise.all([
        Nerdcast.bulkSave(bulk),
        Historico.bulkSave(bulkHistorico),
      ])

      params['offset'] += params.per_page
      count += data.length

      console.log(`${count} episódios sincronizados...`)
    } else {
      flag = false
    }
  }

  return
}

async function findById(id) {
  const Nerdcast = mongoose.model('nerdcast')

  const params = {
    id: id,
  }

  const { status, data } = await JNService.sinc(params)

  if (status >= 400) throw new Error(data.message)

  const nerdcast = new Nerdcast(data)

  return nerdcast
}

async function run() {
  console.log('INICIO DA SINCRONIZAÇÃO')

  await mongoConnect()

  await findListEpisodes()

  await mongoDisconnect()

  console.log('FIM DA SINCRONIZAÇÃO')
}

run().catch((err) => console.log(err))
