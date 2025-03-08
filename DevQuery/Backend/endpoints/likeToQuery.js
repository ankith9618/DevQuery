
import { validationResult } from 'express-validator';
import Query from '../Schema/QuerySchema.js';

export const likeToQuery = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {queryId} = req.body;
    const {userId} = req.user;
    try {
        const query = await Query.findById(queryId);
        if (!query) 
            return res.status(404).json({ message: "Query not found" });

        const hasLiked = query.likedBy.includes(userId);

        if (hasLiked) {
            query.likedBy = query.likedBy.filter(id => id.toString() !== userId);
            query.likesCount -= 1;
        } else {
            query.likedBy.push(userId);
            query.likesCount += 1;
        }
        await query.save();
        res.json({ success: true, likesCount: query.likesCount, likedBy: query.likedBy });
    } catch (error) {
        res.status(500).json({ message: "Error toggling like" });
    }
};
