'use strict'
const store = require('../store')

const onCreateCartSuccess = function (data) {
  store.cart = data.cart
}

const onCreateCartFailure = function (error) {
  console.log(error)
}

const onUpdateCartSuccess = function (data) {

}

const onAddToCartSuccess = function (data) {
  $('.cartItem').empty()
  $('.cartItem').text(store.addedItem)
  $('#addItem').modal('show')
}

const onUpdateCartFailure = function (error) {
  if (error.status === 404) {
    $('#alreadyInCart').modal('show')
  }
}

const deleteCartSuccess = function (data) {
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

const onAddToCartFailure = function (error) {
  $('#duplicateCartItem').modal('show')
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
