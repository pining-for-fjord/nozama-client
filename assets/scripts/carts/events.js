'use strict'
const api = require('./api')
const ui = require('./ui')
// const store = require('../store')
// const user = require('../store')

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
  const params = {
    cart: {
      totalPrice: data.price,
      products: [{
        _id: data._id,
        sku: data.sku,
        quantity: 1,
        name: data.name,
        price: data.price
      }]
    }
  }
  api.update(params, 'add')
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
