import { useEffect } from "react";
import "./App.css";
import Card_Movie from "./Components/Card-Movie";
import { Loader } from "./Components/Icons";

import { useScroll } from "./Hooks/useScroll";
import useSeo from "./Hooks/useSeo";
import Slider from "./Components/Slider";

function App() {
  const { movies, loader, sliderImages } = useScroll();
  const { setSeoInfo } = useSeo();

  useEffect(() => {
    setSeoInfo({
      title: "Movies",
      description:
        "This is the best site where you can find any movie that you like",
    });
  }, []);
  return (
    <>
      <Slider stateImages={sliderImages} />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Grid of Movies */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.length > 0 &&
            movies.map((m) => <Card_Movie key={crypto.randomUUID()} m={m} />)}
        </ul>

        {/* Loader */}
        {loader && (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        )}
      </section>
    </>
  );
}

export default App;
