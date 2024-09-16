import Product from '../models/productModel.js';
import { parseCSV } from '../services/imageService.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

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