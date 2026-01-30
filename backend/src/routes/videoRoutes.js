import express from 'express';
import { createVideo } from '../controllers/videoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Creating protected route for video
router.post("/", protect, createVideo);

export default router;