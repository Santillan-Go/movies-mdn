import { useEffect, useRef, useState } from "react";
import { getMovies } from "../Services/GetMovies";
import { useLocation } from "react-router-dom";
import { Movie } from "../type";
import { URL_IMG_API } from "../Components/Card-Movie";

 export function useScroll() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sliderImages, setSliderImages]=useState([]) as any;
    const page = useRef(1);
    const [loader, setLoader] = useState<boolean>(false);
  const location=useLocation();
  
    const img_url = useRef("");
    const handleScroll = () => {
      let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // /HACE REFERENCIA AL TAMAÑO DEL HTML
      // console.log(`clientHeight`,clientHeight)
      // scrollHeight=> HACE REFERENCIA AL TAMAÑO MAXIMO DEL SCROLL
      // /scrollTop => ES LA SEPARACION DEL TOP DEL SCROLL
  
      if (scrollTop + clientHeight >= scrollHeight) {
        const f = async () => {
     
          try {
            page.current += 1;
  setLoader(true);
           let result  = await getMovies(page.current);
  
        setMovies(prev=>[...prev,...result])
          } catch (err) {
            console.log(err);
          } finally {
           setLoader(false);
           
         
          }
        };
  
    if(location.pathname==="/"){
      f();
    }
  
      
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    useEffect(() => {
      if (movies.length != 0) return;
      setLoader(true);
     
      getMovies(page.current).then((moviesR) => {
        let img = moviesR[10].backdrop_path;
        img_url.current = URL_IMG_API + img;
        setMovies(moviesR);
        setLoader(false);
        const copy=[...moviesR]
        copy.splice(0,14);
        setSliderImages([...copy])
      });
    }, []);
  
    return { movies, img_url, loader ,sliderImages};
  }