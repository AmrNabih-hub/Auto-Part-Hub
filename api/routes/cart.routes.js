const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
} = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET api/cart
// @desc    Get user cart
// @access  Private
router.get('/', protect, getCart);

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, addToCart);

// @route   DELETE api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
