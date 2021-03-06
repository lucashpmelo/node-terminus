'use strict'

const mongoose = require('mongoose')
const Nerdcast = mongoose.model('nerdcast')

exports.getConvidadosPorCategoria = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: '$guests' },
    {
      $group: {
        _id: { product: '$product', id: '$guests.id' },
        product_name: { $max: '$product_name' },
        nome: { $max: '$guests.name' },
        soma: { $sum: 1 },
      },
    },
    { $sort: { product_name: 1, soma: -1, nome: 1 } },
    {
      $project: {
        _id: false,
        product: '$_id.product',
        categoria: '$product_name',
        idGuest: '$_id.id',
        convidado: '$nome',
        total: '$soma',
      },
    },
  ])

  return res
}

exports.getConvidadosPorTema = async () => {
  const res = await Nerdcast.aggregate([
    { $project: { subject: { $split: ['$subject', ','] }, guests: '$guests' } },
    { $unwind: '$subject' },
    { $unwind: '$guests' },
    {
      $group: {
        _id: { subject: '$subject', id: '$guests.id' },
        nome: { $max: '$guests.name' },
        soma: { $sum: 1 },
      },
    },
    { $sort: { '_id.subject': 1, soma: -1, nome: 1 } },
    {
      $project: {
        _id: false,
        tema: '$_id.subject',
        idGuest: '$_id.id',
        convidado: '$nome',
        total: '$soma',
      },
    },
  ])

  return res
}

exports.getConvidadosPorParticipacoes = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: '$guests' },
    {
      $group: {
        _id: '$guests.id',
        nome: { $max: '$guests.name' },
        soma: { $sum: 1 },
      },
    },
    { $sort: { soma: -1, nome: 1 } },
    {
      $project: {
        _id: false,
        idGuest: '$_id',
        convidado: '$nome',
        total: '$soma',
      },
    },
  ])

  return res
}

exports.getEpisodiosPorDuracao = async () => {
  const products = await Nerdcast.aggregate([
    { $group: { _id: '$product' } },
    { $sort: { _id: 1 } },
    { $project: { _id: false, product: '$_id' } },
  ])

  const res = await Promise.all(
    products.map(async function ({ product }) {
      const aggregate = [
        { $match: { product: `${product}` } },
        {
          $facet: {
            durationMin: [{ $sort: { duration: 1 } }, { $limit: 1 }],
            durationMax: [{ $sort: { duration: -1 } }, { $limit: 1 }],
            durationAvg: [
              { $group: { _id: null, duration: { $avg: '$duration' } } },
            ],
            info: [
              {
                $group: {
                  _id: null,
                  product: { $max: '$product' },
                  product_name: { $max: '$product_name' },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            min: { $arrayElemAt: ['$durationMin', 0] },
            max: { $arrayElemAt: ['$durationMax', 0] },
            avg: { $arrayElemAt: ['$durationAvg', 0] },
            info: { $arrayElemAt: ['$info', 0] },
          },
        },
        {
          $project: {
            product: '$info.product',
            categoria: '$info.product_name',
            minDuration: { $toInt: '$min.duration' },
            minEpisode: '$min.episode',
            minTitle: '$min.title',
            maxDuration: { $toInt: '$max.duration' },
            maxEpisode: '$max.episode',
            maxTitle: '$max.title',
            avgDuration: { $toInt: '$avg.duration' },
          },
        },
      ]

      return Nerdcast.aggregate(aggregate).then((res) => res[0])
    })
  )

  return res
}

exports.getQuantidadeConvidadosPorPrograma = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: '$guests' },
    {
      $group: {
        _id: {
          id: '$id',
          product: '$product',
          product_name: '$product_name',
          title: '$title',
          episode: '$episode',
        },
        soma: { $sum: 1 },
      },
    },
    { $sort: { '_id.product': 1, soma: -1, '_id.episode': 1 } },
    {
      $project: {
        _id: false,
        product: '$_id.product',
        categoria: '$_id.product_name',
        episode: '$_id.episode',
        titulo: '$_id.title',
        total: '$soma',
      },
    },
  ])

  return res
}

exports.getTotalEpisodiosPorAno = async () => {
  const res = await Nerdcast.aggregate([
    {
      $group: {
        _id: {
          publicacao: {
            $year: { date: '$pub_date', timezone: 'America/Sao_Paulo' },
          },
          product: '$product',
        },
        product_name: { $max: '$product_name' },
        soma: { $sum: 1 },
      },
    },
    { $sort: { '_id.product': 1, '_id.publicacao': 1 } },
    {
      $project: {
        _id: false,
        product: '$_id.product',
        categoria: '$product_name',
        ano: '$_id.publicacao',
        total: '$soma',
      },
    },
  ])

  return res
}

exports.getConvidadosPorEpisodio = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: '$guests' },
    { $sort: { product: 1, id: 1, 'guests.name': 1 } },
    {
      $project: {
        _id: false,
        product: '$product',
        categoria: '$product_name',
        episode: '$episode',
        titulo: '$title',
        idGuests: '$guests.id',
        convidado: '$guests.name',
      },
    },
  ])

  return res
}

exports.getDuracaoPorEpisodio = async () => {
  const res = await Nerdcast.aggregate([
    { $sort: { product: 1, id: 1 } },
    {
      $project: {
        _id: false,
        product: '$product',
        episode: '$episode',
        duration: '$duration',
        'start-time': '$jump-to-time.start-time',
        'end-time': '$jump-to-time.end-time',
      },
    },
  ])

  return res
}
