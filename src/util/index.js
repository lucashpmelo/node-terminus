"use strict"

const { parse } = require("json2csv")

exports.jsonToCSV = (data) => {
  const csv = parse(data)

  return csv
}
