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
            nerdcast = new Nerdcast()

            const episodio = await findById(episode.id)

            nerdcast['id'] = episodio.id
            nerdcast['url'] = episodio.url
            nerdcast['published_at'] = episodio.published_at
            nerdcast['pub_date'] = episodio.pub_date
            nerdcast['modified_at'] = episodio.modified_at
            nerdcast['duration'] = episodio.duration
            nerdcast['title'] = episodio.title
            nerdcast['slug'] = episodio.slug
            nerdcast['episode'] = episodio.episode
            nerdcast['product'] = episodio.product
            nerdcast['product_name'] = episodio.product_name
            nerdcast['product_email'] = episodio.product_email
            nerdcast['friendly_post_type'] = episodio.friendly_post_type
            nerdcast['friendly_post_type_slug'] =
              episodio.friendly_post_type_slug
            nerdcast['friendly_post_time'] = episodio.friendly_post_time
            nerdcast['subject'] = episodio.subject
            nerdcast['image'] = episodio.image
            nerdcast['image_alt'] = episodio.image_alt
            nerdcast['audio_high'] = episodio.audio_high
            nerdcast['audio_medium'] = episodio.audio_medium
            nerdcast['audio_low'] = episodio.audio_low
            nerdcast['audio_zip'] = episodio.audio_zip
            nerdcast['insertions'] = episodio.insertions
            nerdcast['ads'] = episodio.ads
            nerdcast['description'] = episodio.description
            nerdcast['jump-to-time'] = episodio['jump-to-time']
            nerdcast['guests'] = episodio.guests
            nerdcast['cacete-de-agulha'] = episodio['cacete-de-agulha']
            nerdcast['escalpo-solidario'] = episodio['escalpo-solidario']
            nerdcast['fan-arts'] = episodio['fan-arts']
            nerdcast['editor'] = episodio.editor
            nerdcast['comments'] = episodio.comments
            nerdcast['post_type_class'] = episodio.post_type_class
          } else if (
            new Date(episode.modified_at).toISOString() !==
            new Date(nerdcast.modified_at).toISOString()
          ) {
            let historico = await Historico.findOne({ id: episode.id })

            if (!historico) historico = new Historico({ id: episode.id })

            historico['lista'].push(nerdcast.toObject())

            bulkHistorico.push(historico)

            const episodio = await findById(episode.id)

            nerdcast.url = episodio.url
            nerdcast.published_at = episodio.published_at
            nerdcast.pub_date = episodio.pub_date
            nerdcast.modified_at = episodio.modified_at
            nerdcast.duration = episodio.duration
            nerdcast.title = episodio.title
            nerdcast.slug = episodio.slug
            nerdcast.episode = episodio.episode
            nerdcast.product = episodio.product
            nerdcast.product_name = episodio.product_name
            nerdcast.product_email = episodio.product_email
            nerdcast.friendly_post_type = episodio.friendly_post_type
            nerdcast.friendly_post_type_slug = episodio.friendly_post_type_slug
            nerdcast.friendly_post_time = episodio.friendly_post_time
            nerdcast.subject = episodio.subject
            nerdcast.image = episodio.image
            nerdcast.image_alt = episodio.image_alt
            nerdcast.audio_high = episodio.audio_high
            nerdcast.audio_medium = episodio.audio_medium
            nerdcast.audio_low = episodio.audio_low
            nerdcast.audio_zip = episodio.audio_zip
            nerdcast.insertions = episodio.insertions
            nerdcast.ads = episodio.ads
            nerdcast.description = episodio.description
            nerdcast['jump-to-time'] = episodio['jump-to-time']
            nerdcast.guests = episodio.guests
            nerdcast['cacete-de-agulha'] = episodio['cacete-de-agulha']
            nerdcast['escalpo-solidario'] = episodio['escalpo-solidario']
            nerdcast['fan-arts'] = episodio['fan-arts']
            nerdcast.editor = episodio.editor
            nerdcast.comments = episodio.comments
            nerdcast.post_type_class = episodio.post_type_class
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
  const params = {
    id: id,
  }

  const { status, data } = await JNService.sinc(params)

  if (status >= 400) throw new Error(data.message)

  return data
}

async function run() {
  console.log('INICIO DA SINCRONIZAÇÃO')

  await mongoConnect()

  await findListEpisodes()

  await mongoDisconnect()

  console.log('FIM DA SINCRONIZAÇÃO')
}

run().catch((err) => console.log(err))
