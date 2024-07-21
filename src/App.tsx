import { useEffect } from "react";
import "./App.css";
import Card_Movie from "./Components/Card-Movie";
import { Loader } from "./Components/Icons";

import { useScroll } from "./Hooks/useScroll";
import useSeo from "./Hooks/useSeo";



//const URL_API=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

function App() {
  const { movies, img_url, loader } = useScroll();
const {setSeoInfo}=  useSeo()

useEffect(()=>{
setSeoInfo({title:"Movies",description:"This is the best site where you can find any movie that you like"})
},[])
  return (
    <>
      <section className="hero-image-main">
        <article
          className="container-img"
          style={{ backgroundImage: `url(${img_url.current})` }}
        ></article>
        <article className="container-titles">
          <h1 className="title">React Movies</h1>
          <h2>Te damos la bienvenida!</h2>
          <h2 className="subtitle">La mejor selección de películas</h2>
        </article>
      </section>
      <section>
        <ul className="movies">
          {movies.length > 0 &&
            movies.map((m) => <Card_Movie key={crypto.randomUUID()} m={m} />)}

        </ul>

{loader && <Loader />}
  
      </section>
    </>
  );
}

export default App;
