'use strict'
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
// const user = require('../store')
const showCartTemplate = require('../templates/cart.handlebars')

const createCart = function () {
  const data = {
    cart: {
      totalPrice: 0,
      products: []
    }
  }
  api.create(data)
      .then(ui.onCreateCartSuccess)
      .catch(ui.onCreateCartFailure)
}

// ***********************************************
const hideCart = function () {
  $('#cart').hide()
}

const showCart = function () {
  $('#cart').show()
  $('#landing').hide()

  const showProductsHTML = showCartTemplate({
    cart: store.cart
  })
  $('.fullCart').empty()
  $('.fullCart').append(showProductsHTML)
  $('#landing').hide()
  $('#fullCart').show()

  /* Assign actions */

  /* Update quantity */
}
/* Recalculate cart */
function recalculateCart ()
{
  const taxRate = 0.05
  const shippingRate = 0
  const fadeTime = 300

  console.log('stuff happening')
  let subtotal = 0

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text())
  })

  /* Calculate totals */
  let tax = subtotal * taxRate
  let shipping = (subtotal > 0 ? shippingRate : 0)
  let total = subtotal + tax + shipping

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2))
    $('#cart-tax').html(tax.toFixed(2))
    $('#cart-shipping').html(shipping.toFixed(2))
    $('#cart-total').html(total.toFixed(2))
    if(total == 0){
      $('.checkout').fadeOut(fadeTime)
    }else{
      $('.checkout').fadeIn(fadeTime)
    }
    $('.totals-value').fadeIn(fadeTime)
  })
}

const addToCart = function (data) {
  const params = {
    cart: {
      totalPrice: data.price,
      products: [{
        _id: data._id,
        sku: data.sku,
        quantity: 1,
        name: data.name,
        price: data.price
      }]
    }
  }
  store.cart.products.push(params.cart.products[0])
  store.cart.totalPrice = data.price
  api.update(params, 'add')
    .then(ui.onUpdateCartSuccess)
    .catch(ui.onUpdateCartFailure)
}

$('.product-quantity input').change(function () {
  updateQuantity(this)
})

function updateQuantity (quantityInput)
{
  /* Calculate line price */
  let productRow = $(quantityInput).parent().parent()
  let price = parseFloat(productRow.children('.product-price').text())
  let quantity = $(quantityInput).val()
  let linePrice = price * quantity

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2))
      recalculateCart()
      $(this).fadeIn(fadeTime)
    })
  })
}

/* Remove item from cart */
  function removeItem (removeButton)
  {
    /* Remove row from DOM and recalc cart total */
    let productRow = $(removeButton).parent().parent()
    productRow.slideUp(fadeTime, function () {
      productRow.remove()
      recalculateCart()
    })
  }

const addHandlers = () => {
  $('.glyphicon-shopping-cart').on('click', showCart)
  $('.glyphicon-shopping-cart').on('click', recalculateCart)
  $('.product-removal button').on('click', function () {
    removeItem(this)
  })
}

module.exports = {
  hideCart,
  addHandlers,
  createCart,
  addToCart
}
