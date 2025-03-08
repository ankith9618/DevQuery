import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as LikesIcon } from './likes.svg';
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { UserDetailsContext } from '../Context/UserDetailsContext.js';
import { smartFormatTime } from "../UtilityFunctions/script.js";
import { likeToReply } from '../UtilityFunctions/script.js';
import { ReactComponent as LikeFilledIcon } from './likefilled.svg';

export default function Reply({ reply, handleDeleteReply }) {
    const { user } = useContext(UserDetailsContext);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const updateLike = async (e) => {
        e.preventDefault();
        setLikesCount((likesCount) => (liked) ? likesCount - 1 : likesCount + 1);
        setLiked((liked) => !liked);
        await likeToReply(reply);
    }

    useEffect(() => {
        setLikesCount(reply.likesCount);
        if (reply.likedBy.includes(user._id))
            setLiked(true);
    }, [user, reply, setLiked, setLikesCount]);
    return (
        <>
            <span className='user-name'>~ {reply.user.username}</span>
            <div className="comment-content">{reply.reply}</div>
            <div className='icons'>
                <span>{smartFormatTime(reply.lastUpdated)}</span>
                <span onClick={updateLike}>
                    {(!liked) ?
                        <LikesIcon style={{ fill: `rgba(187, 172, 8, 0.88)` }} /> : <LikeFilledIcon />
                    }
                    <span>{likesCount}</span>
                </span>
                {(reply.user.username === user.username)
                    &&
                    <span onClick={async () => await handleDeleteReply(reply)} style={{ cursor: "pointer" }}>
                        <DeleteIcon />
                    </span>
                }
            </div>

        </>
    )
}
