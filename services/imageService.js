import sharp from 'sharp';
import axios from 'axios';
import cloudinary from 'cloudinary';
import 'dotenv/config';
import streamifier from 'streamifier';  // For handling buffer as a stream

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload a buffer to Cloudinary using streams
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);  // Return secure URL of the uploaded image
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const processImage = async (url) => {
  try {
    const response = await axios({ url, responseType: 'arraybuffer' });

    const compressedImageBuffer = await sharp(response.data).resize(50).toBuffer();

    const imageUrl = await uploadToCloudinary(compressedImageBuffer);

    return imageUrl;
  } catch (error) {
    throw new Error(`Error processing image: ${error.message}`);
  }
};

import fs from 'fs';
import csvParser from 'csv-parser';

export const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const products = [];
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        console.log('Row:', row); // Log row content for debugging
        
        // Remove columns with empty names
        const filteredRow = Object.keys(row).reduce((acc, key) => {
          if (key.trim() !== '') {
            acc[key] = row[key];
          }
          return acc;
        }, {});

        // Ensure all required columns are present
        if (filteredRow['S. No'] && filteredRow['Product Name'] && filteredRow['Input Image Urls']) {
          const product = {
            serialNumber: filteredRow['S. No'].trim(),
            productName: filteredRow['Product Name'].trim(),
            inputImageUrls: filteredRow['Input Image Urls'].split(',').map(url => url.trim()),
          };
          products.push(product);
        } else {
          console.warn('Skipping row due to missing columns:', filteredRow);
        }
      })
      .on('end', () => {
        if (products.length === 0) {
          reject(new Error('No valid products found in CSV'));
        } else {
          resolve(products);
        }
      })
      .on('error', (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      });
  });
};

// Example usage






