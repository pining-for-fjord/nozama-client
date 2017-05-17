'use strict'
const store = require('../store')
const showOrdersTemplate = require('../templates/order-history.handlebars')

const getOrdersSuccess = (data) => {
  console.log(data)
  store.orders = data.orders
  const showOrdersHTML = showOrdersTemplate({
    orders: data.orders
  })
  $('.orders').empty()
  $('.orders').append(showOrdersHTML)
  $('#landing').hide()
  $('#orders').show()
}

const getOrdersFailure = (error) => {
//  console.log('read bombed')
}

const getOrderSuccess = (data) => {
  store.order = data.order
}

const getOrderFailure = (error) => {
//  console.log('read bombed')
}

module.exports = {
  getOrdersSuccess,
  getOrdersFailure,
  getOrderSuccess,
  getOrderFailure
}
