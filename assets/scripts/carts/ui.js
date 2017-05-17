'use strict'
const store = require('../store')
const cart = require('../carts.js')

const onCreateCartSuccess = function (data) {
  store.cart = data.cart
}

const onCreateCartFailure = function (error) {
  console.log(error)
}

const onUpdateCartSuccess = function (data) {
}

const onUpdateCartFailure = function (error) {
  console.log(error)
}

const cartExport = function () {
  /* Set rates + misc */
}


module.exports = {
  onCreateCartSuccess,
  onCreateCartFailure,
  onUpdateCartSuccess,
  onUpdateCartFailure
}
