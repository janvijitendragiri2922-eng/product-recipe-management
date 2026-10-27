"use client";
import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSearch() {
    onSearch(query);
  }
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Products..."
        className="search-bar input"
      />

      <button className="search-btn"  onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}



