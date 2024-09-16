import Product from '../models/productModel.js';
import { processImage } from '../services/imageService.js';
import Queue from 'bull';

const imageProcessingQueue = new Queue('imageProcessing');

imageProcessingQueue.process(async (job, done) => {
  const { product } = job.data;
  const outputUrls = [];

  for (const url of product.inputImageUrls) {
    const compressedUrl = await processImage(url);
    outputUrls.push(compressedUrl);
  }

  // Update product with output URLs
  await Product.findByIdAndUpdate(product._id, { outputImageUrls: outputUrls, status: 'Completed' });
  done();
});

export default imageProcessingQueue;
