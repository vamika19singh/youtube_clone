import express from 'express';
import { createChannel } from '../controllers/channelController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Creatimg protected route for channel
router.post("/", protect, createChannel);

export default router;