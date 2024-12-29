const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('Product', productSchema);
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
