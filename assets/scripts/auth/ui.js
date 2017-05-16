'use strict'
require('../index')
const cartsEvents = require('../carts/events')

const store = require('../store')

const signUpSuccess = (data) => {
  $('#sign-up').trigger('reset')
}
const signUpFailure = () => {
}
const signInSuccess = (data) => {
//  console.log('signin success ran data is ', data)
  store.user = data.user
  $('#sign-in').trigger('reset')
  cartsEvents.createCart()
}

const signInFailure = () => {
//  console.error(error)
}

const signOutSuccess = (data) => {
  store.user = null
}

const signOutFailure = (error) => {
//  console.error('signout failure ran error is ', error)
}

const chgPswdSuccess = (data) => {
  $('#change-password').trigger('reset')
//  console.log(data)
}

const chgPswdFailure = (error) => {
//  console.error(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  chgPswdSuccess,
  chgPswdFailure
}
