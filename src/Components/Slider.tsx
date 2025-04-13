import { useState, useEffect } from "react";
import { URL_IMG_API } from "./Card-Movie";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  PlayArrow,
  Star,
} from "@mui/icons-material";

function Slider({ stateImages }: { stateImages: any }) {
  const [number, setNumber] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setNumber((prev) => (prev === 5 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handle = (direction: string) => {
    if (direction === "right") {
      setNumber(number === 5 ? 0 : number + 1);
    } else {
      setNumber(number === 0 ? 5 : number - 1);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[rgb(3,3,79)] to-black/90 min-h-[80vh]">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 opacity-30 blur-sm"
        style={{
          backgroundImage: `url(${URL_IMG_API}/${stateImages[number]?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <article
        className="flex w-[600vw] transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${number * 100}vw)` }}
      >
        {stateImages.map((image: any) => (
          <div key={image.id} className="w-screen px-4 py-16 md:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
              {/* Poster Image */}
              <Link
                to={`/movie/${image.id}`}
                className="group w-full md:w-[400px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
              >
                <div className="relative w-full h-full">
                  <img
                    src={`${URL_IMG_API}/${image.poster_path}`}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayArrow className="w-16 h-16 text-white" />
                  </div>
                </div>
              </Link>

              {/* Content */}
              <article className="flex-1 text-left space-y-6">
                <Link to={`/movie/${image.id}`}>
                  <h1 className="text-5xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
                    {image.title}
                  </h1>
                </Link>

                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    {image.vote_average.toFixed(1)}
                  </span>
                  <span>|</span>
                  <span>{image.release_date?.split("-")[0]}</span>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed line-clamp-4">
                  {image.overview}
                </p>

                <Link
                  to={`/movie/${image.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
                >
                  Ver Detalles
                  <PlayArrow className="w-5 h-5" />
                </Link>
              </article>
            </div>
          </div>
        ))}
      </article>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={() => handle("left")}
          className="p-3 rounded-full bg-black/50 backdrop-blur hover:bg-blue-600/80 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {[...Array(6)].map((_, i) => (
            <button
              key={i}
              onClick={() => setNumber(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                number === i ? "w-4 bg-blue-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => handle("right")}
          className="p-3 rounded-full bg-black/50 backdrop-blur hover:bg-blue-600/80 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}

export default Slider;
