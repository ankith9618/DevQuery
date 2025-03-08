
import { ReactComponent as LikesIcon } from './likes.svg';
import { ReactComponent as LikeFilledIcon } from './likefilled.svg';
import { ReactComponent as CommentsIcon } from './comments.svg';
import { smartFormatTime } from "../UtilityFunctions/script.js";
import { ReactComponent as DeleteIcon } from './delete.svg';

import RepliesCard from './RepliesCard.js';
import { useContext, useEffect, useState } from 'react';

import { deleteQuery, likeToQuery } from '../UtilityFunctions/script.js';
import { UserDetailsContext } from '../Context/UserDetailsContext.js';

export default function SelectedQuery({ query, setSelectedQuery,setQueries,queries }) {

    const [showAddComment, setShowAddComment] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const { user } = useContext(UserDetailsContext);
 
    

    const onCommentsClick = async () => {
        setShowAddComment((showAddComment) => !showAddComment);
    };

    const handleDeleteQuery = async (e) => {
        e.preventDefault();
        await deleteQuery(query);
        setQueries((prevQueries) => prevQueries.filter(q => q._id !== query._id));
        setSelectedQuery(null);
    };
    
    const updateLike = async (e) => {
        e.preventDefault();
        setLikesCount((likesCount) => (liked) ? likesCount - 1 : likesCount + 1);
        setLiked((liked) => !liked);
        await likeToQuery(query);
    }

    useEffect(() => {
        if(!query) return;
        if (query.likedBy.includes(user._id))
            setLiked(true);
        setLikesCount(query.likesCount);
        setCommentsCount(query.replyCount);
    }, [query, setLiked,user]);
    return (
        <div className='selected-query'>
            <button className="back-button" onClick={() => setSelectedQuery(null)}>
                &larr; Back
            </button>
            <div className="query-card-details">
                <div className='title'>{query.title}</div>
                <p className="query-content">{query.query}</p>
                <div className="query-tags">
                    {query.tags.map((tag, index) => (
                        <span key={index} className="query-tag">{tag}</span>
                    ))}
                </div>
                <div className="query-meta">
                    <div>
                        Posted by: <span className='user-name'>{query.user.username}</span>
                    </div>
                    <div className='icons'>
                        <span onClick={updateLike}>{liked ?
                            <LikeFilledIcon />
                            :
                            <LikesIcon style={{ fill: 'rgba(40, 124, 181, 0.88)' }} />
                        }
                            <span>{likesCount}</span>
                        </span>
                        <span onClick={onCommentsClick} style={{ cursor: 'pointer' }}>
                            <CommentsIcon style={{ fill: 'rgba(175, 187, 8, 0.88)' }} />
                            <span>{commentsCount}</span>
                        </span>
                        <span onClick={handleDeleteQuery}>
                            {query.userId===user._id &&<DeleteIcon />}
                        </span>
                        <span>{smartFormatTime(query.postedAt||query.lastUpdated)}</span>
                    </div>
                </div>
            </div>
            <RepliesCard query={query} showAddComment={showAddComment} setShowAddComment={setShowAddComment} commentsCount={commentsCount} setCommentsCount={setCommentsCount}/>
        </div>
    );
}
