import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  serialNumber: String,
  productName: String,
  inputImageUrls: [String],
  outputImageUrls: [String],
  status: { type: String, enum: ['Pending', 'Processing', 'Completed'], default: 'Pending' },
  requestId: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
