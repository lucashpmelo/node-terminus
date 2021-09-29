const mongoose = require("mongoose")
const nerdcastModel = require("../models/nerdcast-model")
const JNService = require("../services/jovemNerd-service")
const { connectionString } = require("../config")

async function mongoConnect() {
  return await mongoose.connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
}

async function findListEpisodes() {
  const params = {
    order: "ASC",
    orderby: "id",
    offset: 0,
    per_page: 50,
  }

  let flag = true

  while (flag) {
    const { data } = await JNService.sinc(params)

    console.log("OFFSET: ", params.offset)
    console.log("RETORNO: ", data.length)

    if (data.length) {
      for (const i in data) {
        await findById(data[i].id)
      }

      params["offset"] += params.per_page
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

  const nerdcast = new nerdcastModel(data)

  return nerdcast.save()
}

async function run() {
  console.log("INICIO")

  await mongoConnect()

  await findListEpisodes()

  console.log("FIM")
}

run().catch((err) => console.log(err))
