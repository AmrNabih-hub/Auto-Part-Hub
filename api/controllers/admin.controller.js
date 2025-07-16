const Product = require('../models/product.model');

// @desc    Get all pending products
// @route   GET /api/admin/products/pending
// @access  Private (Admin)
exports.getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'Pending' });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a product
// @route   PATCH /api/admin/products/:id/approve
// @access  Private (Admin)
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.status = 'Approved';
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject a product
// @route   PATCH /api/admin/products/:id/reject
// @access  Private (Admin)
exports.rejectProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.status = 'Rejected';
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
