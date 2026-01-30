import Channel from "../models/Channel.js";
import User from "../models/User.js";

//@desc   Create a new channel
//@route  POST /api/channels
//@access Private
export const createChannel = async (req, res) => {
    try {
        const { channelName, description, channelBanner } = req.body;
        
        if(!channelName) {
            return res.status(400).json({
                message: "Channel name is required",
            });
        }

        //if user already has a channel
        const existingChannel = await Channel.findOne({ 
            owner: req.user._id,
            channelName,
        });

        if(existingChannel) {
            return res.status(400).json({
                message: "You already have a channel with this name",
            });
        }

        const channel = await Channel.create({
            channelName,
            description,
            channelBanner,
            owner: req.user._id,
        });

        //channel to user
        req.user.channels.push(channel._id);
        await req.user.save();

        res.status(201).json({
            message: "Channel created successfully!",
            channel,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error while creating channel",
        });
    }
};

//@desc Get channel by ID
//@route GET /api/channels/:id
//@access Public

export const getChannelById = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.id)
        .populate("owner", "username email")
        .populate("videos");

        if(!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching channel",
        });
    }
};

//@desc   Get channel of logged in user
//@route  GET /api/channels/my
//@access Private

export const getMyChannels = async (req, res) => {
    try {
        const channel = await Channel.findOne({ owner: req.user._id });

        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching your channel",
        });
    }
};
        