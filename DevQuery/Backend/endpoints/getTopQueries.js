import { validationResult } from "express-validator";
import Query from "../Schema/QuerySchema.js";

export const getTopQueries= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const topQueries = await Query.find({})
            .sort({lastUpdated:-1})
            .limit(15);
        if (!topQueries) {
            return res.status(404).json({ error: "User not found" });
        }
      
        res.status(200).json(topQueries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
