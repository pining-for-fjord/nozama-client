'use strict'
const store = require('../store')

const onCreateCartSuccess = function (data) {
  store.cart = data.cart
}

const onCreateCartFailure = function (error) {
  console.log(error)
}

const onUpdateCartSuccess = function (data) {
  console.log(data)
}

const onUpdateCartFailure = function (error) {
  console.log(error)
}

module.exports = {
  onCreateCartSuccess,
  onCreateCartFailure,
  onUpdateCartSuccess,
  onUpdateCartFailure
}
