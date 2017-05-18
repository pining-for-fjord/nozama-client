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
  $('.remove-product').on('click', function () {
    removeItem(this)
  })
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

const removeFromCart = function (id) {
  for (let i = 0; i < store.cart.products.length; i++) {
    if (id === store.cart.products[i]._id) {
      const data = store.cart.products[i]
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
      store.cart.products.splice(i, 1)
      store.cart.totalPrice = data.price
      api.update(params, 'remove')
        .then(ui.onUpdateCartSuccess)
        .catch(ui.onUpdateCartFailure)
    }
  }
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

  function removeItem (removeButton)
  {
    const fadeTime = 300
    /* Remove row from DOM and recalc cart total */
    let productRow = $(removeButton).parent().parent()
    const id = $(removeButton).parent().parent().attr('id')
    productRow.slideUp(fadeTime, function () {
      productRow.remove()
      recalculateCart()
    })

    removeFromCart(id)
  }

const deleteCart = (id) => {
  api.destroy(id).then(ui.deleteCartSuccess).catch(ui.deleteCartFailure)
}

const addHandlers = () => {
  $('.glyphicon-shopping-cart').on('click', showCart)
  $('.glyphicon-shopping-cart').on('click', recalculateCart)
}

module.exports = {
  hideCart,
  addHandlers,
  createCart,
  addToCart,
  deleteCart
}
