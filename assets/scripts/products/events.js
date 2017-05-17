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

const hideProduct = function () {
  $('#product').hide()
}

// js for handlebars for products

// $('#cart').click(flip)

const showList = () => {
  const vw = $(window).outerWidth()
  if (vw > 768) {
    $('.card').hover(
  function () {
    $('.description').toggleClass('show')
    $('.image-wrapper').toggleClass('shrink')
    flip()
  })
  }
}

function flip () {
  $('#cart').addClass('flipped')
  $('#cart').addClass('added')
  $('.backside').addClass('show')
  $('.front').addClass('hide')
}

const addHandlers = () => {
  $('.product-category').on('click', getProducts)
  $('.product-category').on('click', '.card', showList)
}

module.exports = {
  getProducts,
  getProduct,
  hideProduct,
  addHandlers
}
