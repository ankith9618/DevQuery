import React, { useEffect, useState } from 'react';
import QueryCard from './QueryCard.js';
import './MyQueries.css';
import SearchBar from '../Components/SearchCard.js';
import QueryDetails from '../QueryDetails/QueryDetails.js';
import { getUserQueries } from '../UtilityFunctions/script.js';
import filterIcon from './filterIcon.svg';
import Loader from '../Components/Loader.js';

export default function MyQueries() {
  const [queries, setQueries] = useState(null);
  const [filteredQueries, setFilteredQueries] = useState([]);
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    async function getuserQueriesData() {
      try {
        const allQueries = await getUserQueries();
        if (allQueries && allQueries.queries) {
          setQueries(allQueries.queries);
          setFilteredQueries(allQueries.queries);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    }
    getuserQueriesData();
  }, [setQueries, setFilteredQueries,queries]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredQueries(queries);
    } else {
      setFilteredQueries(
        queries.filter((q) => q.title.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  return queries ? (
    selectedQuery ? (
      <QueryDetails
        query={selectedQuery}
        setSelectedQuery={setSelectedQuery}
        setSearchQuery={setSelectedQuery}
        queries={queries}
        setQueries={setQueries}
      />
    ) : (
      <>
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
          <button className="filter-icon">
            <img src={filterIcon} alt="Filter" />
          </button>
        </div>
        <div className="queries">
          {filteredQueries.length > 0 ? (
            filteredQueries.map((query, index) => (
              <QueryCard
                key={query.id || index}
                query={query}
                setSelectedQuery={setSelectedQuery}
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