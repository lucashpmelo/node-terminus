'use strict'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://jovemnerd.com.br/wp-json/jovemnerd/v1',
  responseType: 'json',
  timeout: 30000,
})

exports.sinc = async (params) => {
  try {
    const options = {
      method: 'GET',
      url: '/nerdcasts',
      params: params,
    }

    const response = await instance(options)

    const { status, data } = response

    return { status, data }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response

      return { status, data }
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        const retorno = {
          status: 504,
          data: {
            message: `${error.message}`,
          },
        }
        return retorno
      } else {
        const retorno = {
          status: 502,
          data: {
            message: `${error.message}`,
          },
        }
        return retorno
      }
    } else {
      const retorno = {
        status: 500,
        data: {
          message: `${error.message}`,
        },
      }

      return retorno
    }
  }
}
