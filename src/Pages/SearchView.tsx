import { useEffect, useState } from "react";
import { Rectan_Movie } from "../Components/Card-Movie";
import useSearch from "../Hooks/useSearch";
import { getBySearch } from "../Services/GetMovies";
import "../Styles/SearchView.css";
import { useFilter } from "../Hooks/useFilter";
import { Movie, MovieR } from "../type";
import useSeo from "../Hooks/useSeo";
import { Loader } from "../Components/Icons";

function SearchView() {
  const [moviesR, setMoviesR] = useState<MovieR[]>([]);
  const [notFound, setNotFound] = useState(false);
  const { search } = useSearch();
  const [loading, setLoading] = useState(false);
  const { handleFilter, ActiveGenre, Genres, filter, mappedFilter } = useFilter(
    { moviesR }
  );
  const { setSeoInfo } = useSeo();

  useEffect(() => {
    if (!search) return;
    setNotFound(false);
    setLoading(true);

    
    getBySearch(search).then((movies) => {
      if (movies.length === 0) {
        setNotFound(true);
      }
      let MovieResult: Movie[] = movies;
      const moviesGenres = MovieResult.map((m) => {
 
        let genres: string[] = [];
        m.genre_ids.forEach((genre) => {
          let findGenre = Genres.current.find((g) => g.id === genre)?.name;
          if (findGenre) {
            genres.push(findGenre);
          }
        });
        return { ...m, genre_ids: genres };
        //   Genres.current.forEach((genre,index)=>{

        //   })
      });
      setMoviesR(moviesGenres);
      setLoading(false);
    });
  }, [search]);

  useEffect(() => {
    setSeoInfo({
      title: `${search}-Movies`,
      description: "Search your favorites movies and tv shows",
    });
  }, [search]);



  return (
    <section className="section-view">
      <aside className="aside-filter">
        <article>
          <h2 className="title-filter">Filtrar por genero</h2>

          <div className="filter-by-genre">
            {filter.length > 0 &&
              filter.map((genre) => (
                <p
                  key={genre.name}
                  className={`check ${
                    ActiveGenre(genre.name) ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleFilter(genre.name);
                  }}
                >
                  {genre.name}
                </p>
              ))}
          </div>
        </article>
      </aside>
      {loading ? (
        <ul
          className={`ul-view ${
            mappedFilter.length < 4 ? "ul-view-nothing" : ""
          }`}
        >
          {" "}
          <Loader/>
        </ul>
      ) : (
        <ul
          className={`ul-view ${
            mappedFilter.length < 4 ? "ul-view-nothing" : ""
          }`}
        >
          {mappedFilter.length > 0 &&
            mappedFilter.map((m) => (
              <Rectan_Movie key={crypto.randomUUID()} m={m} />
            ))}
        </ul>
      )}

      {notFound && <h2 className="not-found">Not Found</h2>}
    </section>
  );
}

export default SearchView;

///MORE STUFFF
// const filterBygenre=moviesR.filter(movie=>{
//     return movie.genre_ids.some(g=>filter.find(f=>f.name===g)?.active)

// })

// //console.log(filter.every(genre=> genre.active===false))
// const mappedFilter= filter.every(genre=> genre.active===false)
// ?moviesR
// :filterBygenre;
