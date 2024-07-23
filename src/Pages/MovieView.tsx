import  { useContext, useEffect } from 'react'
import { Link,  useLoaderData, } from 'react-router-dom'
import { getById } from '../Services/GetMovies';
import "../Styles/MovieView.css";
import useSeo from '../Hooks/useSeo';
import FavoriteContext from '../Context/FavoriteContext';
import { type  MovieView } from '../type';


export const URL_IMG_API=`https://image.tmdb.org/t/p/w500`;

function MovieView() {
const Movie:MovieView=  useLoaderData();
//const localtion=useLocation()

const {addFavoriteMovie,deleteFavoriteMovie,findMovieInFavorite} = useContext(FavoriteContext)

const {setSeoInfo}=useSeo();


const Inside=findMovieInFavorite(Movie.id);

useEffect(()=>{
    window.scrollTo(0,0);
setSeoInfo({title:Movie.title,description:Movie.overview})
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
        <img  src={URL_IMG_API+Movie.poster_path} alt={Movie.title} />
    </div>

    <div  className='info-movie'>
    <h1  className='title-movie'>{Movie.title}</h1>
         <h2>{Movie.tagline}</h2>
         
         <div  className='actions'>
            <button className={`btn-action`}
             onClick={()=>{
            Inside?deleteFavoriteMovie(Movie.id):
            addFavoriteMovie(Movie)
            }}>{Inside?"🗑️":"💓"}
            </button>
            <button className={`btn-action`}>Buy</button>
         </div>
    </div>
       
    
    </article>

    <article className='more-info-movie'>
  

        <p  className='overview'>{Movie.overview}</p>
  
  <section className='both'>
  <div  className='genres-card'>
            <h3>Generos</h3>
            <ul className='genres'>
                {Movie.genres.map(g=>(
                    <li key={g.id}>{g.name}</li>
                ))}
            </ul>
        </div>
         <div className='realese'>
          <h2>Released:</h2>
             <h2>{`${Movie.release_date}`}</h2></div>   
  </section>
       
    </article>



    </section>
  )
}

export default MovieView






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
