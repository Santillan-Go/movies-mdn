import { type Movie, type MovieR } from "../type";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarMonth, Star } from "@mui/icons-material";

export const URL_IMG_API: string = `https://image.tmdb.org/t/p/w500`;

interface Props {
  m: Movie;
}

function Card_Movie({ m }: Props) {
  return (
    <li className="group relative">
      <Link
        to={`movie/${m.id}`}
        className="block aspect-[2/3] rounded-xl overflow-hidden shadow-lg"
      >
        <img
          src={URL_IMG_API + m.poster_path}
          alt={m.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="mt-3 space-y-2">
        <Link
          to={`/movie/${m.id}`}
          className="block text-white font-medium hover:text-blue-400 transition-colors line-clamp-1"
        >
          {m.title}
        </Link>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <CalendarMonth className="w-4 h-4" />
            {m.release_date?.split("-")[0]}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            {m.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </li>
  );
}

export function Rectan_Movie({ m }: { m: MovieR }) {
  const [searchParams] = useSearchParams();

  return (
    <li className="flex gap-4 bg-white/5 rounded-3xl overflow-hidden hover:bg-white/10 hover:rounded-3xl transition-colors p-4 mt-2 mr-2 ml-2">
      <Link
        to={`/movie/${m.id}?q=${searchParams.get("q")}`}
        className="w-[120px] flex-shrink-0 aspect-[2/3] rounded-lg overflow-hidden"
      >
        <img
          src={URL_IMG_API + m.poster_path}
          alt={m.title}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-2">
        <Link
          to={`/movie/${m.id}`}
          className="block text-lg font-medium text-white hover:text-blue-400 transition-colors line-clamp-1"
        >
          {m.title}
        </Link>

        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <CalendarMonth className="w-4 h-4" />
            {m.release_date?.split("-")[0]}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            {m.vote_average?.toFixed(1)}
          </span>
        </div>

        <p className="text-white/70 line-clamp-3 text-sm">{m.overview}</p>
      </div>
    </li>
  );
}

export default Card_Movie;
