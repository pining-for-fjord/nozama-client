'use strict'
const config = require('../config')

const index = () => {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET'
  })
}

const show = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/products' + id,
    method: 'GET'
  })
}

module.exports = {
  index,
  show
}
