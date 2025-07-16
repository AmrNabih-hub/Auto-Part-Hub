const express = require('express');
const router = express.Router();
const {
  createProduct,
  getVendorProducts,
  updateProduct,
  deleteProduct,
  getAllApprovedProducts,
  getProductById,
} = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.route('/').get(getAllApprovedProducts);
router.route('/:id').get(getProductById);

// Vendor routes
router
  .route('/')
  .post(protect, authorize('vendor'), createProduct);
router
  .route('/vendor')
  .get(protect, authorize('vendor'), getVendorProducts);
router
  .route('/:id')
  .put(protect, authorize('vendor'), updateProduct)
  .delete(protect, authorize('vendor'), deleteProduct);

module.exports = router;