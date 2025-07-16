const express = require('express');
const router = express.Router();
const {
  getPendingProducts,
  approveProduct,
  rejectProduct,
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router
  .route('/products/pending')
  .get(protect, authorize('admin'), getPendingProducts);
router
  .route('/products/:id/approve')
  .patch(protect, authorize('admin'), approveProduct);
router
  .route('/products/:id/reject')
  .patch(protect, authorize('admin'), rejectProduct);

module.exports = router;
