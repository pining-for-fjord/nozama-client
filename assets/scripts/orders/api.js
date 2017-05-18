'use strict'
const config = require('../config')
const store = require('../store')

const index = () => {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const show = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/orders' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const create = (data, stripeToken) => {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
      paymentToken: stripeToken
    }
  })
}

module.exports = {
  index,
  show,
  create
}
