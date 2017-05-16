'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('../config')
const prodApi = require('./api.js')
const prodUi = require('./ui.js')
// const getFormFields = require('../../lib/get-form-fields')
// console.log('up and runnning yarn events')

const getProducts = function () {
  prodApi.index()
  .then(prodUi.getProductsSuccess)
  .catch(prodUi.getProductsFailure)
}

const getProduct = function (prodId) {
  prodApi.show(prodId)
  .then(prodUi.getProductSuccess)
  .catch(prodUi.getProductFailure)
}

module.exports = {
  getProducts,
  getProduct
}
