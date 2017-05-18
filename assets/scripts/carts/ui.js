'use strict'
const store = require('../store')

const onCreateCartSuccess = function (data) {
  store.cart = data.cart
  console.log(store.cart)
}

const onCreateCartFailure = function (error) {
  console.log(error)
}

const onUpdateCartSuccess = function (data) {
  console.log(data)
}

const onUpdateCartFailure = function (error) {
  console.log(error.status)
  if (error.status === 404) {
    console.log('test')
    $('#alreadyInCart').modal('show')
  }
}

const deleteCartSuccess = function (data) {
  console.log('Cart deleted')
  store.user = null
  store.cart = null
}

const deleteCartFailure = function (error) {
  console.log(error)
}

const onGetCartSuccess = function (data) {
  const events = require('./events')
  store.cart = data.cart
  events.showCart(data.cart)
  events.recalculateCart()
}

module.exports = {
  onCreateCartSuccess,
  onCreateCartFailure,
  onUpdateCartSuccess,
  onUpdateCartFailure,
  deleteCartSuccess,
  deleteCartFailure,
  onGetCartSuccess
}
