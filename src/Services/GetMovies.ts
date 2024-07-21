
export const API_KEY=`6e2805a47e609d401ae70b7c88976fd6`;

export const URL_API=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`

// const GET_BY_ID=`https://api.themoviedb.org/3/movie/343611?api_key=${API_KEY}`;


// const LIST_GENRES=`https://api.themoviedb.org/3/genre/movie/list?api_key=6e2805a47e609d401ae70b7c88976fd6`;
// const GET_BY_SEARCH=`https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=${API_KEY}`
export  async function getMovies(page:number){
  
    try{
      const res=await fetch(URL_API+`&page=${page}`);
    
      const data=await res.json();
    
    
      const moviesR=data.results;
  
    return moviesR
     
    // setMovies(moviesR)
    }
    catch(err){
       console.log(err)
    }
    }


    export async function getBySearch(query:string) {
    
    try{
        const res=await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
      
        const data=await res.json();
      
      
        const moviesR=data.results;
      
      return moviesR
       
      // setMovies(moviesR)
      }
      catch(err){
         console.log(err)
      }   
    }




    export async function getById(id:string) {
        
    try{
        const res=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      
        const data=await res.json();
      
      
        const moviesR=data
      
      return moviesR
       
      // setMovies(moviesR)
      }
      catch(err){
         console.log(err)
      }   
    }