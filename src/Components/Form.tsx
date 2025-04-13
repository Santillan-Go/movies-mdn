import React, { useEffect, useState } from "react";
import useSearch from "../Hooks/useSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "@mui/icons-material";

export const Form = () => {
  const [query, setQuery] = useState<string>("");
  const { setSearch } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
      setSearch(urlQuery);
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) return;
    setSearch(query);

    setSearchParams({ q: query });
    navigate(`/search?q=${encodeURIComponent(query)}`);
    //navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        className="w-full px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Search movies..."
        onChange={handleChange}
        autoComplete="off"
        value={query}
        name="query"
        type="text"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[rgb(3,3,79)] text-white rounded-md hover:bg-[rgb(3,3,100)] transition-colors flex items-center gap-2"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};
