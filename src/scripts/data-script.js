"use strict"

const { mongoConnect } = require("../db/connect-db")
const nerdcastRepository = require("../repositories/nerdcast-repository")
const { jsonToCSV } = require("../util")
const fs = require("fs")

async function convidadosPorCategoria() {
  await mongoConnect()

  const data = await nerdcastRepository.getConvidadosPorCategoria()

  const csv = jsonToCSV(data)

  fs.writeFileSync("ConvidadosPorCategoria.csv", csv)
}

convidadosPorCategoria().catch((err) => console.log(err))
