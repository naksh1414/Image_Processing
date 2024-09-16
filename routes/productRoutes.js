import express from "express";
import { uploadCSV, getStatus } from "../controllers/productControllers.js";
import upload from "../middlewares/multerConfig.js";
import { getProductStatusBySerialNumber } from "../controllers/productControllers.js";
import { processImages } from "../controllers/productControllers.js";
const router = express.Router();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/status/:requestId", getStatus);
router.get("/status/serial/:serialNumber", getProductStatusBySerialNumber);
router.post("/process-image/:serialNumber", processImages)
export default router;
