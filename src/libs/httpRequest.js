const gaxios = require('gaxios')
const asyncHandler = require('express-async-handler')

const httpRequest = async (url, { headers, timeout, method, data } = {}) => {
  console.log(url)
  const defaultHeaders = { 'Content-Type': 'application/json' }
  const defaultTimeout = 10000
  const defaultMethod = 'GET'
  const defaultData = null

  const options = {
    url: url,
    headers: headers || defaultHeaders,
    timeout: timeout || defaultTimeout,
    method: method || defaultMethod,
    body: data || defaultData,
  }
  try {
    const response = await gaxios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = httpRequest
