import User from "../Schema/UserSchema.js";
import Query from "../Schema/QuerySchema.js";
import Reply from "../Schema/ReplySchema.js";

export const dashBoard = async (req, res) => {
    try {
        const { userId } = req.user;

        // Fetch user details
        const user = await User.findById(userId).select("followers repliesCount queries");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch recent reply (latest reply and the query it belongs to)
        const recentRepliesQueryId = await Reply.findOne({ "user.userId": userId })
            .sort({ lastUpdated: -1 })
            .select("queryId");

        let recentReplyQuery = null;
        if (recentRepliesQueryId && recentRepliesQueryId.queryId) {
            recentReplyQuery = await Query.findById(recentRepliesQueryId.queryId).select("title lastUpdated");
        }

        // Fetch most recent query posted by the user
        const recentQueries = await Query.find({ userId })
            .sort({ lastUpdated: -1 })
            .limit(1)
            .select("title lastUpdated");

        res.json({
            statistics: {
                queriesPosted: user.queries.length,
                repliesCount: user.repliesCount,
                followers: user.followers,
            },
            recentActivities: {
                queries: recentQueries,
                repliedTo: recentReplyQuery ? [recentReplyQuery] : [],
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
