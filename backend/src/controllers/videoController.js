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