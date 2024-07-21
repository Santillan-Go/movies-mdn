import  { useContext, useEffect } from 'react'
import FavoriteContext from '../Context/FavoriteContext'
import { URL_IMG_API } from '../Components/Card-Movie';
import useSeo from '../Hooks/useSeo';
import "../Styles/FavoritesView.css";
import { Link } from 'react-router-dom';


function FavoritesView() {

    const {setSeoInfo}=useSeo()
const {favorite,deleteFavoriteMovie} = useContext(FavoriteContext);

useEffect(()=>{
setSeoInfo({title:"Favorites-Movies",description:"Look at your favorites Movies and Tv shows"})
},[])

  return (
    <section  className='view-favorites'>
        <section className='links-view'>
<Link to="/">Home</Link>
<Link to="/search">Search</Link>

        </section>
    <h1 className='title-view-page'>FAVORITES MOVIES</h1>
        <ul  className='list-fovorites'>

{
    favorite.map(f=>(
        <li className='favorite-li' key={f.id}>
          <Link to={`/movie/${f.id}`}>  
          <img src={`${URL_IMG_API}${f.poster_path}`} alt={f.title} />
          </Link>
          
            <Link to={`/movie/${f.id}`}  className='title-favorite-card'>{f.title}</Link >
          <button  className='action-btn' onClick={()=>{
            deleteFavoriteMovie(f.id)
          }}><h2> 💓</h2> </button>
        </li>
    ))

}


    </ul>
    
    </section>

  )
}

export default FavoritesView