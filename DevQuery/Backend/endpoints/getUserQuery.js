import User from "../Schema/UserSchema.js";
import { validationResult } from "express-validator";

export const getUserQuery = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.userId; 
    try {
        const queries = await User.findById(userId, { queries: 1, _id: 0 }).populate("queries");
       
        if (!queries) {
            return res.status(404).json({ error: "User not found" });
        }
      
        res.status(200).json(queries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
