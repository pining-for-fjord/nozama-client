'use strict'
const store = require('../store')
const showProductsTemplate = require('../templates/browse-products.handlebars')
const products = require('./products')
const cartsEvents = require('../carts/events')

const getProductsSuccess = (data) => {
  store.data = data
  products.products = store.data
  const showProductsHTML = showProductsTemplate({
    products: data.products
  })
  $('.products').empty()
  $('.products').append(showProductsHTML)
  $('#landing').hide()
  $('#products').show()
  $('.about__section').hide()

  for (let i = 0; i < products.products.products.length; i++) {
    $('#' + products.products.products[i]._id).on('click', function () {
      event.preventDefault()
      cartsEvents.addToCart(products.products.products[i])
    })
  }
}

const getProductsFailure = (product) => {

}

const getProductSuccess = (product) => {
  store.product = product
}

const getProductFailure = (product) => {
//  console.log('read bombed')
}

module.exports = {
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductFailure
}
