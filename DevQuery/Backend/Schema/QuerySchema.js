import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 80
    },
    query: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    tags: {
        type: [String],
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        username: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likedBy: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'user',
        default: []
    },
    replyCount: {
        type: Number,
        default: 0
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ]
});

QuerySchema.index({ title: 1, userId: 1 }, { unique: true });


QuerySchema.index({ title: 1 });  
QuerySchema.index({ userId: 1 }); 
QuerySchema.index({ tags: 1 });  

const Query = mongoose.model('Query', QuerySchema, "Queries");
export default Query;
