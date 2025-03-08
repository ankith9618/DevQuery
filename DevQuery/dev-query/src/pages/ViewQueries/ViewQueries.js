import React, { useEffect, useState, useRef } from "react";
import { getTopQueries } from "../UtilityFunctions/script.js";
import "./ViewQueries.css";
import SearchBar from "../Components/SearchCard.js";
import QueryDetails from "../QueryDetails/QueryDetails.js";
import QueryCard from "../MyQueries/QueryCard.js";
import filterIcon from "../MyQueries/filterIcon.svg";
import sortUpIcon from "../Components/sort-up.svg";
import sortDownIcon from "../Components/sort-down.svg";
import refreshIcon from "../Components/refresh.svg";
import Loader from "../Components/Loader.js";
import TagFilterCard from "../Components/TagFilterCard.js"; 

export default function ViewQueries() {
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [topQueries, setTopQueries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTagPopup, setShowTagPopup] = useState(false); // State for Tag Filter Popup
    const [refreshState, setRefreshState] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]); // Store selected tags
    const [sortOrders, setSortOrders] = useState({
        time: null,
        popular: null,
        tags: null
    });

    const dropdownRef = useRef(null);

    useEffect(() => {
        async function getTopQueriesData() {
            try {
                const allQueries = await getTopQueries();
                if (allQueries) {
                    setTopQueries(allQueries);
                    setFilteredQueries(allQueries);
                }
            } catch (error) {
                console.error("Error fetching queries:", error);
            }
        }
        getTopQueriesData();
    }, [refreshState]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredQueries(topQueries);
        } else {
            setFilteredQueries(
                topQueries.filter((q) =>
                    q.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSort = (type) => {
        const newOrder = sortOrders[type] === "asc" ? "desc" : "asc";
        setSortOrders((prev) => ({ ...prev, [type]: newOrder }));
    };

    const handleTagFilterApply = (tags) => {
        setSelectedTags(tags);
        setShowTagPopup(false); // Close popup

        if (tags.length === 0) {
            setFilteredQueries(topQueries); // Reset to all queries if no tags are selected
        } else {
            setFilteredQueries(
                topQueries.filter((query) =>
                    tags.every((tag) => query.tags.includes(tag)) // Filter queries that contain selected tags
                )
            );
        }
    };

    function refreshAnimation() {
        let refreshBtn = document.querySelector(".refresh");
        let refreshIcon = document.querySelector(".refresh img");

        refreshIcon.classList.add("spin");
        refreshBtn.classList.add("disabled");

        setSortOrders({ time: null, popular: null, tags: null });

        setTimeout(() => {
            refreshIcon.classList.remove("spin");
            refreshBtn.classList.remove("disabled");
            setRefreshState((prev) => !prev);
        }, 5000);
    }

    useEffect(() => {
        let sortedQueries = [...filteredQueries];

        if (sortOrders.time) {
            sortedQueries.sort((a, b) =>
                sortOrders.time === "asc"
                    ? new Date(a.lastUpdated) - new Date(b.lastUpdated)
                    : new Date(b.lastUpdated) - new Date(a.lastUpdated)
            );
        }

        if (sortOrders.popular) {
            sortedQueries.sort((a, b) =>
                sortOrders.popular === "asc" ? a.likesCount - b.likesCount : b.likesCount - a.likesCount
            );
        }

        setFilteredQueries(sortedQueries);
    }, [sortOrders,filteredQueries]);

    return topQueries ? (
        selectedQuery ? (
            <QueryDetails
                query={selectedQuery}
                setSelectedQuery={setSelectedQuery}
                setSearchQuery={setSearchQuery}
                queries={topQueries}
                setQueries={setTopQueries}
            />
        ) : (
            <>
                <div className="search-bar">
                    <div className="refresh" onClick={refreshAnimation}>
                        <img src={refreshIcon} alt="" />
                    </div>
                    <SearchBar onSearch={handleSearch} />
                    <div className="filter-container" ref={dropdownRef}>
                        <button className="filter-icon" onClick={toggleDropdown}>
                            <img src={filterIcon} alt="Filter" />
                        </button>
                        {showDropdown && (
                            <div className="filter-dropdown">
                                <div className="filter-option" onClick={() => handleSort("time")}>
                                    Last Modified
                                    <img src={sortOrders.time === "asc" ? sortUpIcon : sortDownIcon} alt="Sort" />
                                </div>
                                <div className="filter-option" onClick={() => handleSort("popular")}>
                                    Popular
                                    <img src={sortOrders.popular === "asc" ? sortUpIcon : sortDownIcon} alt="Sort" />
                                </div>
                                <div className="filter-option" onClick={() => setShowTagPopup(true)}>
                                    Tags
                                    <img src={sortOrders.tags === "asc" ? sortUpIcon : sortDownIcon} alt="Sort" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {showTagPopup && <TagFilterCard onClose={() => setShowTagPopup(false)} onApply={handleTagFilterApply} />}

                <div className="queries">
                    {filteredQueries.length > 0 ? (
                        filteredQueries.map((query, index) => (
                            <QueryCard
                                key={query.id || index}
                                query={query}
                                setSelectedQuery={setSelectedQuery}
                                showDesc={true}
                            />
                        ))
                    ) : (
                        <p>No matching queries found.</p>
                    )}
                </div>
            </>
        )
    ) : (
        <div className="loader">
            <Loader />
        </div>
    );
}
