import "./Card-Movies.css"

export const URL_IMG_API:string=`https://image.tmdb.org/t/p/w500`;

import {MovieR, type Movie}  from "../type"
import { Link } from "react-router-dom";
interface Props{
m:Movie

}



function Card_Movie({m}:Props) {
  return (
    <li className='li-movie'>
      <Link to={`movie/${m.id}`} className='li-img'>
  <img src={URL_IMG_API+m.poster_path} alt={m.title}/>
      </Link>

<section  className='li-title'>

<Link to={`/movie/${m.id}`}>{m.title}</Link>
    <p>{m.release_date}</p>
</section>


  </li>
  )
}
export function Rectan_Movie({m}:{m:MovieR}){

  return (
    <li className='li-movie-rectan'>
      <Link to={`/movie/${m.id}`} className='li-img-rectan'>
  <img className="img-recta" src={URL_IMG_API+m.poster_path} alt={m.title}/>
      </Link>

<section  className='li-title-rectan'>

    <Link to={`/movie/${m.id}`}>{m.title}</Link>
    <p>{m.release_date}</p>
    <p  className="overview">{m.overview}</p>
</section>


  </li>
  )

}



export default Card_Movie