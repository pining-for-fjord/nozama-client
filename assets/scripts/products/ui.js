'use strict'
const store = require('../store')
const showProductsTemplate = require('../templates/browse-products.handlebars')
const products = require('./products')
const cartsEvents = require('../carts/events')

const getProductsSuccess = (data) => {
  store.data = data
  console.log(store.data)
  products.products = store.data
  const showProductsHTML = showProductsTemplate({
    products: data.products
  })
  $('.products').empty()
  $('.products').append(showProductsHTML)
  $('#landing').hide()
  $('#products').show()
  // const vw = $(window).outerWidth()
  // if (vw > 768) {
  //   $('.card').hover(
  // function () {
  //   $('.description').toggleClass('show')
  //   var hovered = $('.image-wrapper')
  //   $('.image-wrapper:hover').toggleClass('shrink')
  //   flip()
  // })
  // }
  for (let i = 0; i < products.products.products.length; i++) {
    $('#' + products.products.products[i]._id).on('click', function () {
      event.preventDefault()
      cartsEvents.addToCart(products.products.products[i])
    })
  }
}

// function flip () {
//   $('#cart').addClass('flipped')
//   $('#cart').addClass('added')
//   $('.backside').addClass('show')
//   $('.front').addClass('hide')
// }

const getProductsFailure = (product) => {
//  console.log('read bombed')
}

const getProductSuccess = (product) => {
  store.product = product
}

const getProductFailure = (product) => {
//  console.log('read bombed')
}

module.exports = {
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductFailure
}
