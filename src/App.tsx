import { useEffect } from "react";
import "./App.css";
import Card_Movie from "./Components/Card-Movie";
import { Loader } from "./Components/Icons";

import { useScroll } from "./Hooks/useScroll";
import useSeo from "./Hooks/useSeo";
import Slider from "./Components/Slider";



function App() {
  const { movies, loader, sliderImages } = useScroll();
const {setSeoInfo}=  useSeo()

useEffect(()=>{
setSeoInfo({title:"Movies",description:"This is the best site where you can find any movie that you like"})
},[])
  return (
    <>
    
        {/* <article
          className="container-img"
          style={{ backgroundImage: `url(${img_url.current})` }}
        ></article> */}
        <Slider stateImages={sliderImages}/>
        {/* <article className="container-titles">
          <h1 className="title">React Movies</h1>
          <h2>Te damos la bienvenida!</h2>
          <h2 className="subtitle">La mejor selección de películas</h2>
        </article> */}
    
      <section className="section-movies">
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
