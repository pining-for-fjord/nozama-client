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

const returnHome = function () {
  $('#products').hide()
  $('#checkout-container').hide()
  $('#cart').hide()
  $('#checkout').hide()
  $('#orders').hide()
  $('#landing').show()
  $('.about__section').show()
}

const returnHomeButton = function (event) {
  event.preventDefault()
  $('#checkout-container').hide()
  $('#products').hide()
  $('#cart').hide()
  $('#checkout').hide()
  $('#orders').hide()
  $('#landing').show()
  $('.about__section').show()
}

// js for handlebars for products

// $('#cart').click(flip)

const addHandlers = () => {
  $('.product-category').on('click', getProducts)
  $('.navbar-brand').on('click', returnHome)
  $('.keep-shopping').on('click', returnHome)
}

module.exports = {
  getProducts,
  getProduct,
  hideProduct,
  addHandlers,
  returnHomeButton
}
