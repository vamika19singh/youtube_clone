import express from 'express';
import { createChannel, getChannelById, getMyChannels } from '../controllers/channelController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

//logged in user channel
router.get("/my", protect, getMyChannels);

// Get channel by ID
router.get("/:id", getChannelById);

// Creatimg protected route for channel
router.post("/", protect, createChannel);

export default router;