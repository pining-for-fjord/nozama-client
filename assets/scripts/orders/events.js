'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('../config')
const ordersApi = require('./api.js')
const ordersUi = require('./ui.js')
// const getFormFields = require('../../lib/get-form-fields')
// console.log('up and runnning yarn events')

const getOrders = function () {
  ordersApi.index()
  .then(ordersUi.getOrdersSuccess)
  .catch(ordersUi.getOrdersFailure)
}

const getOrder = function (orderId) {
  ordersApi.show(orderId)
  .then(ordersUi.getOrderSuccess)
  .catch(ordersUi.getOrderFailure)
}

const hideOrder = function () {
  $('#order').hide()
}

// js for handlebars for orderucts

// $('#cart').click(flip)

const addHandlers = () => {
  $('#order-button').on('click', getOrders)
}

module.exports = {
  getOrders,
  getOrder,
  hideOrder,
  addHandlers
}
