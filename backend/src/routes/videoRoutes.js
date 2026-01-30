import express from 'express';
import { createVideo, getAllVideos, getVideosByCategory, searchVideos, getVideosByChannel } from '../controllers/videoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get("/", getAllVideos);
router.get("/search", searchVideos);
router.get("/category/:category", getVideosByCategory);
router.get("/channel/:channelId", getVideosByChannel);

// Creating protected route for video
router.post("/", protect, createVideo);

export default router;