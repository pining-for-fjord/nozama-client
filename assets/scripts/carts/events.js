'use strict'
const api = require('./api')
const ui = require('./ui')
const cart = require('../store')

const createCart = function () {
  const data = {
    cart: {
      totalPrice: 0,
      products: []
    }
  }
  api.create(data)
      .then(ui.onCreateCartSuccess)
      .catch(ui.onCreateCartFailure)
}

// ***********************************************
const hideCart = function () {
  $('#cart').hide()
}

const showCart = function () {
  $('#cart').show()
  $('#landing').hide()
}

const addToCart = function (data) {
  console.log(data)
  api.update(data, 'add')
    .then(ui.onUpdateCartSuccess)
    .catch(ui.onUpdateCartFailure)
}

const addHandlers = () => {
  $('.glyphicon-shopping-cart').on('click', showCart)
}

module.exports = {
  hideCart,
  addHandlers,
  createCart,
  addToCart
}
