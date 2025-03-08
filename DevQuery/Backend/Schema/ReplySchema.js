import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
        default: null
    },
    user: {
        username: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    reply: {
        type: String,
        required: true,
        trim: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: []
    },
    replyCount: {
        type : Number,
        default:0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    parentReplyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: null
    }
});

ReplySchema.index({ queryId: 1, userId: 1, parentReplyId: 1 });
ReplySchema.index({lastUpdated: 1});

const Reply = mongoose.model('Reply', ReplySchema, "Replies");
export default Reply;
