import { validationResult } from "express-validator";
import Query from "../Schema/QuerySchema.js";
import Reply from "../Schema/ReplySchema.js";
import User from "../Schema/UserSchema.js";

export const deleteQuery = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { queryId } = req.body;
        const { userId } = req.user;

        if (!queryId) {
            return res.status(400).json({ error: "Query ID is required" });
        }

        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(404).json({ error: "Query not found" });
        }

        if (query.user.userId.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own queries" });
        }

        // Remove the query ID from the user's queries array
        await User.findByIdAndUpdate(userId, {
            $pull: { queries: queryId }
        });

        // Delete the query and its replies
        await Query.findByIdAndDelete(queryId);
        await Reply.deleteMany({ queryId });

        res.json({ message: "Query and related replies deleted successfully" });
    } catch (error) {
        console.error("Error deleting query:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
