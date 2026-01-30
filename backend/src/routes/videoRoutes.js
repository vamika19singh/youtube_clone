import express from 'express';
import { 
    createVideo, 
    getAllVideos, 
    getVideosByCategory, 
    searchVideos, 
    getVideosByChannel,
    getVideoById,
    likeVideo,
    dislikeVideo,
    addComment
} from '../controllers/videoController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get("/", getAllVideos);
router.get("/search", searchVideos);
router.get("/category/:category", getVideosByCategory);
router.get("/channel/:channelId", getVideosByChannel);
router.get("/:id", getVideoById);

// Protected routes
router.post("/", protect, createVideo);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);
router.post("/:id/comment", protect, addComment);

export default router;