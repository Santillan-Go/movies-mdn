import { createContext,  useState } from "react";

import { type MovieView } from "../type";

interface Favorite{
    favorite:MovieView[],
   // setFavorite:(favorite:MovieView[])=> void,
    addFavoriteMovie:(Movie:MovieView)=>void,
    deleteFavoriteMovie:(id:number)=>void,
    findMovieInFavorite:(id:number)=>boolean,
}


const FavoriteContext=createContext<Favorite>({favorite:[],addFavoriteMovie:()=>{},deleteFavoriteMovie:()=>{},findMovieInFavorite:()=>true,})

const localStorageFn=({action,array}:{action:string,array:MovieView[]|null})=>{


    if(action==="set"){
        localStorage.setItem("favorite",JSON.stringify(array));
    }else if(action==="get"){
        const favorite=JSON.parse(localStorage.getItem("favorite")||"[]");
        return favorite;
    }else if(action==="delete"){
        localStorage.setItem("favorite",JSON.stringify(array));
    }
}

const FavoriteProvider=({children}:{children:React.JSX.Element})=>{

const [favorite, setFavorite] = useState<MovieView[]>(localStorageFn({action:"get",array:null}))


const addFavoriteMovie=(Movie:MovieView)=>{

const findElement=favorite.find(m=> m.id===Movie.id);

if(!findElement){
  localStorageFn({action:"set",array:[...favorite,Movie]})
    setFavorite([...favorite,Movie])
}

};

const deleteFavoriteMovie=(id:number)=>{

    const findElement=favorite.findIndex(m=> m.id===id);

    if(findElement !=-1){
      const newFavoriteMovies=favorite.filter(m=> m.id!=id);
      localStorageFn({action:"delete",array:newFavoriteMovies})
    setFavorite(newFavoriteMovies)
    }
    

    //  setFavorite([...favorite.slice(0,findElement),...favorite.slice(findElement+1)])

};


const findMovieInFavorite=(id:number)=>{
  const findIndex = favorite.findIndex((f) => f.id === id);

  if (findIndex != -1) return true;

  return false;
}




    return(
        <FavoriteContext.Provider value={{favorite,addFavoriteMovie,deleteFavoriteMovie,findMovieInFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}



export default FavoriteContext;

export {FavoriteProvider};