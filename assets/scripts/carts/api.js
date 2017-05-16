'use strict'
const config = require('../config')
const store = require('../store')

const create = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/carts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

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

const destroy = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/carts/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (data, action) => {
  return $.ajax({
    url: config.apiOrigin + '/carts/' + data.cart.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token,
      Action: action
    },
    data
  })
}

module.exports = {
  index,
  show,
  update,
  destroy,
  create
}
