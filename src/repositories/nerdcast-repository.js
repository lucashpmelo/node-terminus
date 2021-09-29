"use strict"

const mongoose = require("mongoose")
const Nerdcast = mongoose.model("nerdcast")

exports.getConvidadosPorCategoria = async () => {
  const res = await Nerdcast.aggregate([
    { $unwind: "$guests" },
    {
      $group: {
        _id: { product: "$product", id: "$guests.id" },
        product_name: { $max: "$product_name" },
        nome: { $max: "$guests.name" },
        soma: { $sum: 1 },
      },
    },
    { $sort: { product_name: 1, soma: -1, nome: 1 } },
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
