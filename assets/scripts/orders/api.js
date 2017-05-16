'use strict'
const config = require('../config')

const index = () => {
  return $.ajax({
    url: config.apiOrigin + '/carts',
    method: 'GET'
  })
}

const show = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/carts' + id,
    method: 'GET'
  })
}

module.exports = {
  index,
  show
}
