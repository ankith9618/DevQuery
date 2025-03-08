import React, { useContext, useEffect, useState } from "react";
import "./QueryCard.css";
import { ReactComponent as LikeIcon } from '../QueryDetails/likes.svg';
import { ReactComponent as LikeFilledIcon } from '../QueryDetails/likefilled.svg';
import { ReactComponent as CommentIcon } from '../QueryDetails/comments.svg';
import { smartFormatTime } from "../UtilityFunctions/script.js";
import { UserDetailsContext } from "../Context/UserDetailsContext.js";

const QueryCard = ({ query, setSelectedQuery }) => {
    const { user } = useContext(UserDetailsContext);
    const [liked, setLiked] = useState(false);

    const openQuery = () => {
        setSelectedQuery(query);
    };

    useEffect(() => {
        if (query.likedBy.includes(user._id))
            setLiked(true);
    }, [setLiked, user, query.likedBy]);

    if (!query) return <p className="query-card-no-query">No query found.</p>;

    return (
        <div className={"query-card-container " + (user._id === query.userId ? "posted-by-me" : "")} onClick={openQuery} >
            <div className="query-card-header">
                <h3 className="query-card-title">{query.title}</h3>
                <span className="query-card-update-date">{smartFormatTime(query.postedAt ?? query.lastUpdated)}</span>
            </div>
            <div className="query-card-tags">
                {query.tags.map((tag, index) => (
                    <span key={index} className="query-card-tag">{tag}</span>
                ))}
            </div>
            <div className="query-card-footer">
                <div className="query-card-actions">
                    <div className="query-card-action-btn">
                        {liked ?
                            <LikeFilledIcon className="query-card-icon query-card-liked" /> :
                            <LikeIcon className="query-card-icon" />
                        }
                        <span>{query.likesCount ?? 0}</span>
                    </div>
                    <div className="query-card-action-btn">
                        <CommentIcon className="query-card-icon" />
                        <span>{query.replyCount}</span>
                    </div>
                    <div className="username">
                        ~ {query.user.username}
                    </div>
                </div>
            </div>

        </div >
    );
};

export default QueryCard;