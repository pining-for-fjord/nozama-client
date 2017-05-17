'use strict'
require('../index')
const cartsEvents = require('../carts/events')

const store = require('../store')

const signUpSuccess = () => {
  $('#sign-up').trigger('reset')
}
const signUpFailure = () => {
  $('#sign-up').trigger('reset')
}
const signInSuccess = (data) => {
//  console.log('signin success ran data is ', data)
  store.user = data.user
  $('#sign-in').trigger('reset')
  $('.sign-in').hide()
  $('.sign-out').show()
  $('.dropdown-menu').trigger('click')
  cartsEvents.createCart()
}

const signInFailure = () => {
  $('#sign-in').trigger('reset')
  $('#signInFailure').modal('show')
  $('.dropdown-menu').trigger('click')
}

const signOutSuccess = (data) => {
  store.user = null
}

const signOutFailure = () => {
//  console.error('signout failure ran error is ', error)
}

const chgPswdSuccess = () => {
  $('#change-password').trigger('reset')
  $('.dropdown-menu').trigger('click')
  $('#chgPswdSuccess').modal('show')
//  console.log(data)
}

const chgPswdFailure = () => {
  $('.dropdown-menu').trigger('click')
  $('#chgPswdFailure').modal('show')
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
