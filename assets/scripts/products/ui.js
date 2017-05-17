'use strict'
const store = require('../store')
const showProductsTemplate = require('../templates/browse-products.handlebars')

const getProductsSuccess = (data) => {
  store.data = data
  const showProductsHTML = showProductsTemplate({
    products: data.products
  })
  $('.products').empty()
  $('.products').append(showProductsHTML)
  $('#landing').hide()
  $('#products').show()
}

const getProductsFailure = (product) => {
//  console.log('read bombed')
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
