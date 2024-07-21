import React, { createContext, useRef, useState } from "react";
import { type Movie } from "../type";
export interface ContextProps {
  searchMovies: Movie[];
  setSearchMovies: (search: Movie[]) => void;
  //setSearchMovies:React.Dispatch<React.SetStateAction<Movie[]>>
  MovieRef: {
    current: Movie[];
  };
  search: string;
  setSearch: (search: string) => void;
}

const SearchContext = createContext<ContextProps>({
  searchMovies: [],
  setSearchMovies: () => {},
  MovieRef: {
    current: [],
  },
  search: "",
  setSearch: () => {},
});

export const SearchProvider = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const MovieRef = useRef([]);

//   useEffect(() => {
//     console.log("I HAVE CHANGED!");
//   }, [searchMovies]);
  return (
    <SearchContext.Provider
      value={{ searchMovies, setSearchMovies, MovieRef, search,setSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
