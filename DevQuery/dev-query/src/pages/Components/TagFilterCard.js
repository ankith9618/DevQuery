import React, { useState } from "react";
import "./TagFilterCard.css";
import {popularTags,categories} from '../UtilityFunctions/tags.js';


export default function TagFilterCard({ onClose }) {
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="tag-popup-overlay">
            <div className="tag-popup">
                    <div className="heading">Categories</div>
                <div className="categories">
                    {categories.map((category) => (
                        <button key={category} className="category">
                            <strong>{category}</strong>
                        </button>
                    ))}
                </div>
                    <div className="heading" >Tags </div>
                <div className="tag-list">
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-btn ${selectedTags.includes(tag) ? "selected" : ""}`}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className="popup-actions">
                    <button className="apply-btn" onClick={onClose}>Apply</button>
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
