import { validationResult } from "express-validator";
import Reply from "../Schema/ReplySchema.js";
import Query from "../Schema/QuerySchema.js";

export const deleteReply = async (req, res) => {
    try {
        const { replyId } = req.body;
        const currentUserId = req.user.userId; // Extracted from authentication

        if (!replyId) {
            return res.status(400).json({ error: "Reply ID is required" });
        }

        // Find the reply to check ownership
        const reply = await Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ error: "Reply not found" });
        }

        // Ensure only the reply owner can delete it
        if (reply.user.userId.toString() !== currentUserId.toString()) {
            return res.status(403).json({ error: "Unauthorized: Cannot delete others' replies" });
        }

        // Delete the reply
        await Reply.findByIdAndDelete(replyId);

        // Remove the reply ID from the `Query` document
        await Query.updateOne(
            { _id: reply.queryId }, 
            { $pull: { replies: replyId }, $inc: { replyCount: -1 } }
        );

        res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
