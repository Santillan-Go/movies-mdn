import { useContext, useEffect } from "react";
import FavoriteContext from "../Context/FavoriteContext";
import { URL_IMG_API } from "../Components/Card-Movie";
import useSeo from "../Hooks/useSeo";
import { Link } from "react-router-dom";
import { Favorite, Home, Search } from "@mui/icons-material";

function FavoritesView() {
  const { setSeoInfo } = useSeo();
  const { favorite, deleteFavoriteMovie } = useContext(FavoriteContext);

  useEffect(() => {
    setSeoInfo({
      title: "Favorites Movies",
      description: "Look at your favorites Movies and TV shows",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(3,3,79)] to-black/90">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5" />
              Search
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <Favorite className="w-8 h-8 text-red-500" />
          Favorites Movies
        </h1>

        {favorite.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/70 text-lg">No favorite movies yet</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorite.map((movie) => (
              <li key={movie.id} className="group relative">
                <Link to={`/movie/${movie.id}`}>
                  <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`${URL_IMG_API}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="mt-2 flex items-start justify-between gap-2">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="text-white hover:text-blue-400 transition-colors line-clamp-2 text-sm font-medium"
                  >
                    {movie.title}
                  </Link>
                  <button
                    onClick={() => deleteFavoriteMovie(movie.id)}
                    className="flex-shrink-0 p-1.5 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors group"
                  >
                    <Favorite className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default FavoritesView;
