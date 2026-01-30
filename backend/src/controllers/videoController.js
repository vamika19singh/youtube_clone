import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

//@desc  Create a new video
//@route POST /api/videos
//@access Private
export const createVideo = async (req, res) => {
    try {
        const {
            title,
            description, 
            videoUrl, 
            thumbnailUrl, 
            category,
            channelId,
        } = req.body;

        if(!title || !videoUrl || !thumbnailUrl || !category || !channelId) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const channel = await Channel.findById(channelId);
        if(!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        //Ensure the channel belongs to the authenticated user
        if(channel.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You do not own this channel",
            });
        }

        const video = await Video.create({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            category,
            channel: channel._id,
            uploader: req.user._id,
        });

        //Add video to channel
        channel.videos.push(video._id);
        await channel.save();

        res.status(201).json({
            message: "Video uploaded successfully",
            video,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while uploading video",
        });
    }
};


//@desc  Get all videos
//@route GET /api/videos
//@access Public
export const getAllVideos = async (req, res) => {
    try{
        const videos = await Video.find()
        .populate("channel", "channelName")
        .populate("uploader", "username")
        .sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching videos",
        });
    }
};

//@desc  Get video by category
//@route GET /api/videos/category/:category
//@access Public
export const getVideosByCategory = async (req, res) => {
    try {
        const videos = await Video.find({
        category: req.params.category,
    })
        .populate("channel", "channelName")
        .populate("uploader", "username")
        .sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching videos by category",
        });
    }
};

//@desc  search video by title
//@route GET /api/videos/search
//@access Public
export const searchVideos = async (req, res) => {
    try {
        const {q} = req.query;
        
        if(!q) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }
        const videos = await Video.find({
            title: { $regex: q, $options: "i" },
        })
        .populate("channel", "channelName")
        .populate("uploader", "username")
        .sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: "Server error while searching videos",
        });
    }
};

//@desc  Get video of a channel
//@route GET /api/videos/channel/:channelId
//@access Public
export const getVideosByChannel = async (req, res) => {
    try {
        const videos = await Video.find({
            channel: req.params.channelId,
        })
        .populate("uploader", "username")
        .sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching channel videos",
        });
    }
};

//@desc Get single video by ID
//@route GET /api/videos/:id
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        )
        .populate("channel", "channelName")
        .populate("uploader", "username")
        .populate("comments.user", "username");

        if(!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching video",
        });
    }
};

//@desc Like a video
//@route POST /api/videos/:id/like
export const likeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if(!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        video.likes += 1;
        await video.save();

        res.status(200).json({
            message: "Video liked",
            likes: video.likes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while liking video",
        });
    }
};

//@desc Dislike a video
//@route POST /api/videos/:id/dislike
//@access Private
export const dislikeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if(!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        video.dislikes += 1;
        await video.save();

        res.status(200).json({
            message: "Video disliked",
            dislikes: video.dislikes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while disliking video",
        });
    }
};

//@desc  Add comment to a video
//@route POST /api/videos/:id/comment
//@access Private
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if(!text) {
            return res.status(400).json({
                message: "Comment text is required",
            });
        }

        const video = await Video.findById(req.params.id);

        if(!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        video.comments.push({
            user: req.user._id,
            text,
        });

        await video.save();

        res.status(201).json({
            message: "Comment added successfully",
            comments: video.comments,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while adding comment",
        });
    }
};