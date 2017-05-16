'use strict'







// ***********************************************
const hideCart = function () {
  $('#cart').hide()
}

const showCart = function () {
  $('#cart').show()
  $('#landing').hide()
}

const addHandlers = () => {
  $('.glyphicon-shopping-cart').on('click', showCart)
}

module.exports = {
  hideCart,
  addHandlers
}
