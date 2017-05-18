'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('../config')
const prodApi = require('./api.js')
const prodUi = require('./ui.js')
// const getFormFields = require('../../lib/get-form-fields')
// console.log('up and runnning yarn events')

const getProducts = function (event) {
  const category = $(this).attr('id')
  prodApi.index(category)
  .then(prodUi.getProductsSuccess)
  .catch(prodUi.getProductsFailure)
}

const getProduct = function (prodId) {
  prodApi.show(prodId)
  .then(prodUi.getProductSuccess)
  .catch(prodUi.getProductFailure)
}

const hideProduct = function () {
  $('#product').hide()
}

// js for handlebars for products

// $('#cart').click(flip)

const addHandlers = () => {
  $('.product-category').on('click', getProducts)
}

module.exports = {
  getProducts,
  getProduct,
  hideProduct,
  addHandlers
}
