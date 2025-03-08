import React, { useState } from "react";
import { Search } from "lucide-react";
import "./SearchCard.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };
  const changeSearchText = (e) => {
    setQuery((query) => e.target.value);
  }
  return (
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={changeSearchText}
          className="search-input"
        />
        <button type="submit" onClick={handleSearch} className="search-button">
          <Search className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
