'use strict'
const store = require('../store')
const showOrdersTemplate = require('../templates/order-history.handlebars')

const getOrdersSuccess = (data) => {
  store.orders = data.orders
  const showOrdersHTML = showOrdersTemplate({
    orders: data.orders
  })
  $('#order').empty()
  $('#order').append(showOrdersHTML)
  $('#landing').hide()
  $('#order').show()
}

const getOrdersFailure = (error) => {
  console.log(error)
}

const getOrderSuccess = (data) => {
  store.order = data.order
}

const getOrderFailure = (error) => {
  console.log(error)
}

const createOrderSuccess = () => {
  const cartApi = require('../carts/events')
  cartApi.deleteCart()
  cartApi.createCart()
  $('#orderPlaced').modal('show')
  $('input').val('')
  $('#card-expiry-month').val('Month')
  $('#card-expiry-year').val('Year')
  $('#place-order').hide()
}

const createOrderFailure = (error) => {
  console.log(error)
}

module.exports = {
  getOrdersSuccess,
  getOrdersFailure,
  getOrderSuccess,
  getOrderFailure,
  createOrderSuccess,
  createOrderFailure
}
