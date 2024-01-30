import React, { FC, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <input
      style={{ width: "100%", padding: 4, marginBottom: 8 }}
      type="text"
      placeholder="Search..."
      onChange={handleInputChange}
    />
  );
};
