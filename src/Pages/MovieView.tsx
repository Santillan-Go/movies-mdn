import  { useContext, useEffect } from 'react';
import { Link,  useLoaderData, } from 'react-router-dom';
import { getById } from '../Services/GetMovies';
import "../Styles/MovieView.css";
import useSeo from '../Hooks/useSeo';
import FavoriteContext from '../Context/FavoriteContext';
import { type  MovieView } from '../type';


export const URL_IMG_API=`https://image.tmdb.org/t/p/w500`;

function MovieViewPage() {
const movie:MovieView=  useLoaderData();
//const localtion=useLocation()

const {addFavoriteMovie,deleteFavoriteMovie,findMovieInFavorite} = useContext(FavoriteContext)

const {setSeoInfo}=useSeo();


const Inside=findMovieInFavorite(movie.id);

useEffect(()=>{
    window.scrollTo(0,0);
setSeoInfo({title:movie.title,description:movie.overview})
},[])

  return (
    <section className="view-movie">
      <div className='Movie-view-link'>
 <Link className='back' to="/">Home</Link>
    <Link className='back-result' to="/search">Search</Link>
    <Link className='back-result' to="/favorites">Favoritos</Link>
      </div>
   


    <article  className='container-img-tagline'>
    <div className='img-container'>
        <img  src={URL_IMG_API+movie.poster_path} alt={movie.title} />
    </div>

    <div  className='info-movie'>
    <h1  className='title-movie'>{movie.title}</h1>
         <h2>{movie.tagline}</h2>
         
         <div  className='actions'>
            <button className={`btn-action`}
             onClick={()=>{
            Inside?deleteFavoriteMovie(movie.id):
            addFavoriteMovie(movie)
            }}>{Inside?"🗑️":"💓"}
            </button>
            <button className={`btn-action`}>Buy</button>
         </div>
    </div>
       
    
    </article>

    <article className='more-info-movie'>
  

        <p  className='overview'>{movie.overview}</p>
  
  <section className='both'>
  <div  className='genres-card'>
            <h3>Genres</h3>
            <ul className='genres'>
                {movie.genres.map(g=>(
                    <li key={g.id}>{g.name}</li>
                ))}
            </ul>
        </div>
         <div className='realese'>
          <h2>Released:</h2>
             <h2>{`${movie.release_date}`}</h2></div>   
  </section>
       
    </article>



    </section>
  )
}

export default  MovieViewPage






export  const LoaderData = async ({ params}:any) => {
let {id}= params;
const Movie=await getById(id);

return Movie;
};




// interface Props{
//     params:{
//         id:string;
//     }
// }

// export const LoaderData= async({params}:Props)=>{

// let {id}=params;
// const Movie=await getById(id);

// return Movie;

// }


// // Define the type of the LoaderData function
// type LoaderDataFunction = (Props:LoaderFunctionArgs) => Promise<any>;

// // Define the type of the LoaderFunctionArgs
// type LoaderFunctionArgs = {
//   params: { id: string };
// };

// // Define the type of the DataFunctionReturnValue
// type DataFunctionReturnValue = any;

// Define the LoaderData function with the correct type
