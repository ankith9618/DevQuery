
import { validationResult } from "express-validator";
import Reply from "../Schema/ReplySchema.js";

export const getRepliesToReply = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {parentReplyId}  = req.body;

    try {
        const replies = await Reply.find({parentReplyId});

        res.status(200).json(replies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
