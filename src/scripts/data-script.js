'use strict'

const fs = require('fs')
const { mongoConnect, mongoDisconnect } = require('../db/mongoose-db')
const nerdcastRepository = require('../repositories/nerdcast-repository')
const { jsonToCSV } = require('../util')

async function convidadosPorCategoria() {
  const data = await nerdcastRepository.getConvidadosPorCategoria()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorCategoria.csv', csv)
}

async function convidadosPorTema() {
  const data = await nerdcastRepository.getConvidadosPorTema()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorTema.csv', csv)
}

async function convidadosPorParticipacoes() {
  const data = await nerdcastRepository.getConvidadosPorParticipacoes()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorParticipacoes.csv', csv)
}

async function episodiosPorDuracao() {
  const data = await nerdcastRepository.getEpisodiosPorDuracao()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/EpisodiosPorDuracao.csv', csv)
}

async function quantidadeConvidadosPorPrograma() {
  const data = await nerdcastRepository.getQuantidadeConvidadosPorPrograma()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/QuantidadeConvidadosPorPrograma.csv', csv)
}

async function totalEpisodiosPorAno() {
  const data = await nerdcastRepository.getTotalEpisodiosPorAno()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/TotalEpisodiosPorAno.csv', csv)
}

async function convidadosPorEpisodio() {
  const data = await nerdcastRepository.getConvidadosPorEpisodio()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorEpisodio.csv', csv)
}

async function run() {
  await mongoConnect()

  await Promise.all([
    convidadosPorCategoria(),
    convidadosPorTema(),
    convidadosPorParticipacoes(),
    episodiosPorDuracao(),
    quantidadeConvidadosPorPrograma(),
    totalEpisodiosPorAno(),
    convidadosPorEpisodio(),
  ])

  await mongoDisconnect()
}

run().catch((err) => console.log(err))
