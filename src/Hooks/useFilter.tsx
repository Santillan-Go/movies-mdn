import { useRef, useState } from "react";
import { ALL_GENRES } from "../Mock/GenresConst";
import { GenreActive, MovieR } from "../type";
import { genres } from "../Mock/Genres.json";

export function useFilter({moviesR}:{moviesR:MovieR[]}){
    const [filter, setFilter] = useState<GenreActive[]>(ALL_GENRES);
   
    const Genres = useRef(genres);
    const handleFilter = (name: string) => {
        const activateGenre = filter.map((g) =>
          g.name === name ? { ...g, active: !g.active } : g
        );
        setFilter(activateGenre);
      };
  ///ALL IN ONE FUNCTION
    const getFilterdByGenres =
(): MovieR[] => {

        const activesGenres = filter
          .filter((genre) => genre.active)
          .map((genre) => genre.name);
    
        if (activesGenres.length === 0) {
          return moviesR;
        }
    
        return moviesR.filter((movie) =>
          movie.genre_ids.some((genre) => activesGenres.includes(genre))
        );
    
        return moviesR.filter((movie) =>
          activesGenres.some((genre) => movie.genre_ids.includes(genre))
        );
  
      }

      const ActiveGenre = (name: string) => {
        let findGenre = filter.find((g) => g.name === name);
        return findGenre?.active;
      };

      const mappedFilter = getFilterdByGenres();

      return{

        getFilterdByGenres,
        handleFilter,
        ActiveGenre,
        Genres,
        filter,
        setFilter,
        mappedFilter
      }
    }