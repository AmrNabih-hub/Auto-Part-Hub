const mongoose = require('mongoose');

const VendorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  address: { type: String },
});

module.exports = mongoose.model('VendorProfile', VendorProfileSchema);
