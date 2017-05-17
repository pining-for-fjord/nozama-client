'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
// const user = require('../store')
const showCartTemplate = require('../templates/cart.handlebars')

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

  const showProductsHTML = showCartTemplate({
    cart: store.cart
  })
  $('.fullCart').empty()
  $('.fullCart').append(showProductsHTML)
  $('#landing').hide()
  $('#fullCart').show()
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
  store.cart.products.push(params.cart.products[0])
  store.cart.totalPrice = data.price
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
