'use strict'
const store = require('../store')

const onCreateCartSuccess = function (data) {
  store.cart = data.cart
  console.log(store.cart)
  console.log('cart created!')
}

const onCreateCartFailure = function (error) {
  console.log(error)
}

const onUpdateCartSuccess = function (data) {
  console.log(data.products)
}

const onAddToCartSuccess = function (data) {
  console.log(store.addedItem)
  $('.cartItem').empty()
  $('.cartItem').text(store.addedItem)
  $('#addItem').modal('show')
}

const onUpdateCartFailure = function (error) {
  if (error.status === 404) {
    console.log('test')
    $('#alreadyInCart').modal('show')
  }
}

const deleteCartSuccess = function (data) {
  store.cart = null
  console.log('cart deleted')
}

const deleteCartFailure = function (error) {
  console.log(error)
}

const onGetCartSuccess = function (data) {
  const events = require('./events')
  store.cart = data.cart
  console.log(data.cart)
  console.log(store.cart)
  console.log('price of cart after get', store.cart.totalPrice)
  events.showCart(data.cart)
  events.recalculateCart()
}

const onAddToCartFailure = function (error) {
  console.log(error)
}

module.exports = {
  onCreateCartSuccess,
  onCreateCartFailure,
  onUpdateCartSuccess,
  onUpdateCartFailure,
  deleteCartSuccess,
  deleteCartFailure,
  onGetCartSuccess,
  onAddToCartSuccess,
  onAddToCartFailure
}
