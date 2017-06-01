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

  $('.browse-products').on('click', function () {
    event.preventDefault()
    const result = $.grep(products.products.products, function (e) {
      return e._id === event.target.id
    })
    cartsEvents.addToCart(result[0])
  })
}

const getProductsFailure = (error) => {
log
}

const getProductSuccess = (product) => {
  store.product = product
}

const getProductFailure = (product) => {

}

module.exports = {
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductFailure
}
