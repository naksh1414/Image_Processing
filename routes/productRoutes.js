import express from 'express';
import { uploadCSV, getStatus } from '../controllers/productControllers.js';
import upload from '../middlewares/multerConfig.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadCSV);
router.get('/status/:requestId', getStatus);

export default router;
