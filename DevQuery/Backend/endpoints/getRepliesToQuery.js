
import { validationResult } from "express-validator";
import Query from "../Schema/QuerySchema.js";

export const getRepliesToQuery = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {queryId}  = req.body;

    try {
        const replies = await Query.findById(queryId,{replies:1}).populate("replies");
        res.status(200).json(replies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
