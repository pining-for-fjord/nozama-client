'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('../config')
const ordersApi = require('./api.js')
const ordersUi = require('./ui.js')
const store = require('../store.js')
// const getFormFields = require('../../lib/get-form-fields')
// console.log('up and runnning yarn events')

const getOrders = function () {
  ordersApi.index()
  .then(ordersUi.getOrdersSuccess)
  .catch(ordersUi.getOrdersFailure)
  $('#landing').hide()
  $('#products').hide()
  $('#cart').hide()
  $('#checkout-container').hide()
}

const getOrder = function (orderId) {
  ordersApi.show(orderId)
  .then(ordersUi.getOrderSuccess)
  .catch(ordersUi.getOrderFailure)
}

const createToken = function (event) {
  console.log('card is', $('#card-number').val());
  console.log('exp year is', $('#card-expiry-year').val());
  console.log('exp month is', $('#card-expiry-month').val());
  event.preventDefault()
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val()

  }, stripeResponseHandler)
}

const stripeResponseHandler = function (status, response) {
  if (response.error) {
    console.log(response.error)
  } else {
    const token = response.id
    console.log(token)
    store.stripeToken = token
    ordersApi.create()
    .then(ordersUi.createOrderSuccess)
    .catch(ordersUi.createOrderFailure)
  }
}

const hideOrder = function () {
  $('#order').hide()
  $('#checkout-container').hide()
}
const showOrderForm = function () {
  $('#cart').hide()
  $('#checkout-container').show()
}

const setupStripe = function () {
  Stripe.setPublishableKey('pk_test_9WemBaMhQokjQEfkfAQiLXmr')
}

// js for handlebars for orderucts

// $('#cart').click(flip)

const addHandlers = () => {
  $('#order-button').on('click', getOrders)
  $('#place-order').on('click', createToken)
  $('#checkout-button').on('click', showOrderForm)

}

module.exports = {
  getOrders,
  getOrder,
  hideOrder,
  addHandlers,
  setupStripe
}
