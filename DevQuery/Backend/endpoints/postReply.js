import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import Reply from '../Schema/ReplySchema.js';
import Query from '../Schema/QuerySchema.js';
import User from '../Schema/UserSchema.js';

export const postReply = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { queryId, reply, parentReplyId } = req.body;
    const {username,userId} = req.user;

    try {
        // Validate queryId
        if (queryId && !mongoose.Types.ObjectId.isValid(queryId)) {
            return res.status(400).json({ error: 'Invalid queryId format' });
        }

        // Validate parentReplyId
        if (parentReplyId && !mongoose.Types.ObjectId.isValid(parentReplyId)) {
            return res.status(400).json({ error: 'Invalid parentReplyId format' });
        }

        // Create and save new reply
        const newReply = new Reply({
            queryId,
            user:{username,userId},
            reply,
            lastUpdated: Date.now(),
            parentReplyId: parentReplyId || null,
        });


        // Update the query to track replies
        if (queryId) {
            const queryUpdate = await Query.findByIdAndUpdate(
                queryId,
                { 
                    $push: { replies: newReply._id },
                    $inc: { replyCount: 1 } 
                }, 
                { new: true }
            );

            if (!queryUpdate) {
                return res.status(404).json({ error: 'Query not found' });
            }
        }

        // Check if parent reply exists before proceeding
        if (parentReplyId) {
            const parent = await Reply.findById(parentReplyId);
            if (!parent) {
                return res.status(404).json({ error: 'Parent reply not found' });
            }
        }
        await newReply.save();
        
        await User.findByIdAndUpdate(userId, { $inc: { repliesCount: 1 } });

        res.status(200).json({ message: "Reply saved successfully" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'You have already posted this reply.' });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
