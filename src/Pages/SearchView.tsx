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
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="md:w-72 flex-shrink-0">
          {" "}
          {/* Increased width for better fit */}
          <div className="sticky top-24 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filter by Genre
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {" "}
              {/* Changed to grid for consistent sizing */}
              {filter.length > 0 &&
                filter.map((genre) => (
                  <button
                    key={genre.name}
                    onClick={() => handleFilter(genre.name)}
                    className={`w-full px-3 py-2 rounded-full text-sm font-medium transition-all
                      ${
                        ActiveGenre(genre.name)
                          ? "bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-[rgb(3,3,79)]"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }
                      flex items-center justify-center whitespace-nowrap
                    `}
                  >
                    {genre.name}
                  </button>
                ))}
            </div>
          </div>
        </aside>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ul className="flex-1 grid gap-4">
            {mappedFilter.length > 0 &&
              mappedFilter.map((m) => (
                <Rectan_Movie key={crypto.randomUUID()} m={m} />
              ))}
          </ul>
        )}

        {notFound && (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-2xl text-white/70">No results found</h2>
          </div>
        )}
      </div>
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
