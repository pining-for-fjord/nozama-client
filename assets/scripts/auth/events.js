'use strict'

const setAPIOrigin = require('../../../lib/set-api-origin')
const config = require('../config')
const userApi = require('../api.js')
const userUi = require('../ui.js')
const getFormFields = require('../../../lib/get-form-fields')
// console.log('up and runnning user events')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  userApi.signUp(data)
    .then(userUi.signUpSuccess)
    .catch(userUi.signUpFailure)
}
const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  userApi.signIn(data)
    .then(userUi.signInSuccess)
    .catch(userUi.signInFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
//  console.log('sign out ran')
  userApi.signOut()
    .then(userUi.signOutSuccess)
    .catch(userUi.signOutFailure)
}

const onChgPswd = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
//  console.log('changed password')
  userApi.chgPswd(data)
    .then(userUi.chgPswdSuccess)
    .catch(userUi.chgPswdFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChgPswd)
}

module.exports = {
  addHandlers
}
