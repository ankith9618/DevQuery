import { useState, useEffect } from "react";
import './RepliesCard.css';
import { getAllReplies } from '../UtilityFunctions/script.js';
import { postReply } from "../UtilityFunctions/script.js";
import { deleteReply } from '../UtilityFunctions/script.js';

import Reply from './Reply.js';
import Loader  from '../Components/Loader.js';

function PostReply({ newReply, setNewReply, handleReplySubmit, text }) {
    return (
        <div className="reply-input">
            <input
                type="text"
                placeholder={text}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
            />
            <button onClick={handleReplySubmit}>Post</button>
        </div>
    );
}

export default function RepliesCard({ query, showAddComment, setShowAddComment, setCommentsCount }) {

    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");


    const handleReplySubmit = async () => {
        if (newReply.trim() === "") return;

        try {
            await postReply(query, newReply);
            setNewReply("");
            const fetchedReplies = await getAllReplies(query);
            setReplies(fetchedReplies);
            setShowAddComment((showAddComment) => !showAddComment);
            setCommentsCount((commentsCount) => commentsCount + 1);

        } catch (error) {
            console.error("Failed to post reply:", error);
        }
    };

    const handleDeleteReply = async (reply) => {
        try {
            await deleteReply(reply);
            setCommentsCount((commentsCount) => commentsCount - 1);
            const fetchedReplies = await getAllReplies(query);
            setReplies(fetchedReplies);

        } catch (error) {
            console.error("Error deleting reply:", error);
        }
    };



    useEffect(() => {
        async function loadReplies() {
            const fetchedReplies = await getAllReplies(query);
            if(fetchedReplies) 
                setReplies(fetchedReplies);
            else setReplies([]);
        };
        loadReplies();

    }, [setReplies, query]);

    return (
        <>
            {showAddComment &&
                <PostReply
                    handleReplySubmit={handleReplySubmit}
                    newReply={newReply}
                    setNewReply={setNewReply}
                    text="Write a comment.."
                />
            }
            <div className="replies-container">
                <span>Comments</span>

                { !replies ?(
                    <Loader className="loader"/>
                ):
                 (replies.length > 0 ? (
                    replies.map((reply, index) => (
                        <div key={index} className="reply-card">
                            <Reply reply={reply} handleDeleteReply={handleDeleteReply} />
                        </div>
                    ))
                ) : (
                    <p>No replies yet.</p>
                ))}

            </div>
        </>
    );
}

