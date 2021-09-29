"use strict"

const Nerdcast = require("../models/nerdcast-model")

exports.getConvidadosPorCategoria = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: "$guests" },
    {
      $group: {
        _id: "$product",
        product_name: { $max: "$product_name" },
        guests: { $push: { id: "$guests.id", name: "$guests.name" } },
      },
    },
    { $unwind: "$guests" },
    {
      $group: {
        _id: { product: "$_id", id: "$guests.id" },
        product_name: { $max: "$product_name" },
        nome: { $max: "$guests.name" },
        soma: { $sum: 1 },
      },
    },
    { $sort: { product_name: 1, soma: -1 } },
    {
      $project: {
        _id: false,
        product: "$_id.product",
        categoria: "$product_name",
        idGuest: "$_id.id",
        convidado: "$nome",
        total: "$soma",
      },
    },
  ])

  return res
}
