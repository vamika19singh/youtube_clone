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

