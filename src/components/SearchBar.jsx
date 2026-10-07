import { Search } from "lucide-react";

// SearchBar – A reusable search input component
// Receives the current search value and an onChange handler via props
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-icon"><Search size={18} /></span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
