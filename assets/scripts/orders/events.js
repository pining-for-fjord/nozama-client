'use strict'


const ordersApi = require('./api.js')
const ordersUi = require('./ui.js')
const store = require('../store.js')
const prod = require('../products/events')


const getOrders = function () {
  ordersApi.index()
  .then(ordersUi.getOrdersSuccess)
  .catch(ordersUi.getOrdersFailure)
  $('#landing').hide()
  $('#products').hide()
  $('#cart').hide()
  $('#checkout-container').hide()
  $('.about__section').hide()
}

const getOrder = function (orderId) {
  ordersApi.show(orderId)
  .then(ordersUi.getOrderSuccess)
  .catch(ordersUi.getOrderFailure)
}

const createToken = function (event) {
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

    store.stripeToken = token

    const order = {
      order: {
        shippingAddress: {
          recipientName: $('input[name=name]').val(),
          address: $('input[name=address]').val(),
          city: $('input[name=city]').val(),
          state: $('input[name=state]').val(),
          country: $('input[name=country]').val(),
          zip: $('input[name=zip_code]').val()
        },
        totalPrice: parseInt(store.cart.totalPrice, 10),
        products: store.cart.products
      }
    }
    ordersApi.create(order, token)
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
  $('.about__section').hide()
  $('.cart-body').show()
  $('#place-order').show()
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
  $('#shop-again').on('click', prod.returnHomeButton)
}

module.exports = {
  getOrders,
  getOrder,
  hideOrder,
  addHandlers,
  setupStripe
}
