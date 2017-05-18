'use strict'
const store = require('../store')
const showOrdersTemplate = require('../templates/order-history.handlebars')

const getOrdersSuccess = (data) => {
  console.log(data)
  store.orders = data.orders
  console.log(data.orders)
  const showOrdersHTML = showOrdersTemplate({
    orders: data.orders
  })
  $('#order').empty()
  $('#order').append(showOrdersHTML)
  $('#landing').hide()
  $('#order').show()

}

const getOrdersFailure = (error) => {
  console.log('read bombed')
}

const getOrderSuccess = (data) => {
  store.order = data.order
}

const getOrderFailure = (error) => {
  console.log('read bombed')
}

const createOrderSuccess = () => {
  console.log('created order');
}

const createOrderFailure = (error) => {
  console.log('uh oh', error);
}

module.exports = {
  getOrdersSuccess,
  getOrdersFailure,
  getOrderSuccess,
  getOrderFailure,
  createOrderSuccess,
  createOrderFailure
}
