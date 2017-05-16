'use strict'
const config = require('../config')

const index = () => {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'GET'
  })
}

const show = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/orders' + id,
    method: 'GET'
  })
}

module.exports = {
  index,
  show
}
