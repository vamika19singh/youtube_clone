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