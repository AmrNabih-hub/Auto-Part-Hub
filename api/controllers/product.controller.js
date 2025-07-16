const Product = require('../models/product.model');

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Vendor)
exports.createProduct = async (req, res) => {
  const { name, sku, description, price, category, imageUrl, stockQuantity } = req.body;

  try {
    const newProduct = new Product({
      name,
      sku,
      description,
      price,
      category,
      imageUrl,
      stockQuantity,
      vendor: req.user.id,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all products for a vendor
// @route   GET /api/products/vendor
// @access  Private (Vendor)
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Vendor)
exports.updateProduct = async (req, res) => {
  const { name, sku, description, price, category, imageUrl, stockQuantity } = req.body;

  const productFields = {};
  if (name) productFields.name = name;
  if (sku) productFields.sku = sku;
  if (description) productFields.description = description;
  if (price) productFields.price = price;
  if (category) productFields.category = category;
  if (imageUrl) productFields.imageUrl = imageUrl;
  if (stockQuantity) productFields.stockQuantity = stockQuantity;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    if (product.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Vendor)
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    if (product.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all approved products
// @route   GET /api/products
// @access  Public
exports.getAllApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'Approved' });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, status: 'Approved' });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};