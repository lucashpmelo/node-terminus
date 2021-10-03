'use strict'

const fs = require('fs')
const { mongoConnect } = require('../db/connect-db')
const nerdcastRepository = require('../repositories/nerdcast-repository')
const { jsonToCSV } = require('../util')

async function convidadosPorCategoria() {
  await mongoConnect()

  const data = await nerdcastRepository.getConvidadosPorCategoria()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorCategoria.csv', csv)
}

// convidadosPorCategoria().catch((err) => console.log(err))

async function convidadosPorTema() {
  await mongoConnect()

  const data = await nerdcastRepository.getConvidadosPorTema()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorTema.csv', csv)
}

// convidadosPorTema().catch((err) => console.log(err))

async function convidadosPorParticipacoes() {
  await mongoConnect()

  const data = await nerdcastRepository.getConvidadosPorParticipacoes()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorParticipacoes.csv', csv)
}

// convidadosPorParticipacoes().catch((err) => console.log(err))

async function episodiosPorDuracao() {
  await mongoConnect()

  const data = await nerdcastRepository.getEpisodiosPorDuracao()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/EpisodiosPorDuracao.csv', csv)
}

// episodiosPorDuracao().catch((err) => console.log(err))

async function quantidadeConvidadosPorPrograma() {
  await mongoConnect()

  const data = await nerdcastRepository.getQuantidadeConvidadosPorPrograma()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/QuantidadeConvidadosPorPrograma.csv', csv)
}

// quantidadeConvidadosPorPrograma().catch((err) => console.log(err))

async function totalEpisodiosPorAno() {
  await mongoConnect()

  const data = await nerdcastRepository.getTotalEpisodiosPorAno()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/TotalEpisodiosPorAno.csv', csv)
}

// totalEpisodiosPorAno().catch((err) => console.log(err))

async function convidadosPorEpisodio() {
  await mongoConnect()

  const data = await nerdcastRepository.getConvidadosPorEpisodio()

  const csv = jsonToCSV(data)

  fs.writeFileSync('./src/data/csv/ConvidadosPorEpisodio.csv', csv)
}

// convidadosPorEpisodio().catch((err) => console.log(err))
