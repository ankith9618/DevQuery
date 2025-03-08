
import { validationResult } from 'express-validator';
import Reply from '../Schema/ReplySchema.js';

export const likeToReply = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {replyId} = req.body;
    const {userId} = req.user;
    try {
        const reply = await Reply.findById(replyId);
        if (!reply) 
            return res.status(404).json({ message: "Reply No More Exist" });

        const hasLiked = reply.likedBy.includes(userId);

        if (hasLiked) {
            reply.likedBy = reply.likedBy.filter(id => id.toString() !== userId);
            reply.likesCount -= 1;
        } else {
            reply.likedBy.push(userId);
            reply.likesCount += 1;
        }
        await reply.save();
        res.json({ success: true, likesCount: reply.likesCount, likedBy: reply.likedBy });
    } catch (error) {
        res.status(500).json({ message: "Error toggling like" });
    }
};
