import Product from '../models/productModel.js';
import { parseCSV } from '../services/imageService.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import imageProcessingQueue from '../workers/imageProcessingWorker.js';
export const getProductStatusBySerialNumber = async (req, res) => {
  const { serialNumber } = req.params;

  try {
    // Find the product by serialNumber
    const product = await Product.findOne({ serialNumber });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is defined before accessing its properties
    const { status, outputImageUrls } = product;

    // Return the product's status and output image URLs
    res.status(200).json({ status, outputImageUrls });
  } catch (error) {
    console.error('Error fetching product status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const uploadCSV = async (req, res, next) => {
  try {
    const requestId = uuidv4();

    const products = await parseCSV(req.file.path);

    await Product.insertMany(products.map(p => ({
      ...p, requestId, status: 'Pending'
    })));

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Failed to delete temporary file:', err);
      }
    });

    res.json({ requestId });
  } catch (error) {
    next(error);
  }
};


export const getStatus = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    // Query the products based on requestId
    const products = await Product.find({ requestId });

    if (!products) {
      return res.status(404).json({ message: 'No products found with the given requestId.' });
    }

    res.json({
      requestId,
      status: products[0].status, // Assuming all products have the same status for the request
      totalProducts: products.length,
    });
  } catch (error) {
    next(error);
  }
};

export const processImages = async (req, res) => {
  const { serialNumber } = req.params;

  try {
    const product = await Product.findOne({ serialNumber });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await imageProcessingQueue.add({
      product,
    });

    res.status(200).json({ message: 'Image processing started', product });
  } catch (error) {
    console.error('Error processing images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};