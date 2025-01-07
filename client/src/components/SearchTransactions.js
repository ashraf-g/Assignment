import React from "react";

const SearchTransactions = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title, description, or price"
        className="p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export default SearchTransactions;
