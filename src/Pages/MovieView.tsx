import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getById } from "../Services/GetMovies";
import useSeo from "../Hooks/useSeo";
import FavoriteContext from "../Context/FavoriteContext";
import { type MovieView } from "../type";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Star,
} from "@mui/icons-material";

export const URL_IMG_API = `https://image.tmdb.org/t/p/w500`;

function MovieViewPage() {
  const movie = useLoaderData() as MovieView;
  const { addFavoriteMovie, deleteFavoriteMovie, findMovieInFavorite } =
    useContext(FavoriteContext);
  const { setSeoInfo } = useSeo();
  const [searchParams, setSearchParams] = useSearchParams();
  const [goTo, setGoTo] = useState<string>(
    searchParams.get("q") ? `/search?q=${searchParams.get("q")}` : "/"
  );

  const Inside = findMovieInFavorite(movie.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSeoInfo({ title: movie.title, description: movie.overview });

    // Update goTo based on search params
    const query = searchParams.get("q");
    if (query) {
      setGoTo(`/search?q=${query}`);
    }
  }, [searchParams, movie]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(3,3,79)] to-black/90">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl px-4 py-3 flex items-center gap-4">
          <Link
            to={goTo}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowBack className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Movie Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-30 blur-sm"
          style={{
            backgroundImage: `url(${URL_IMG_API}${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Poster */}
            <div className="w-full md:w-[300px] flex-shrink-0">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${URL_IMG_API}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-white/70 italic">{movie.tagline}</p>
              )}

              {/* Rating and Release */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/60">|</span>
                {/* <span className="text-white/60">{movie.release_date}</span> */}
              </div>

              {/* Overview */}
              <p className="text-lg leading-relaxed text-white/80">
                {movie.overview}
              </p>

              {/* Genres */}
              <div className="space-y-3">
                <h3 className="font-medium">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() =>
                    Inside
                      ? deleteFavoriteMovie(movie.id)
                      : addFavoriteMovie(movie)
                  }
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {Inside ? (
                    <Favorite className="w-5 h-5 text-red-500" />
                  ) : (
                    <FavoriteBorder className="w-5 h-5" />
                  )}
                  {Inside ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieViewPage;

export const LoaderData = async ({ params }: any): Promise<MovieView> => {
  let { id } = params;
  const Movie = await getById(id);

  return Movie;
};
