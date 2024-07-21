import  { useContext } from 'react'
import SearchContext from '../Context/SearchContext'

function useSearch() {

    const{searchMovies,setSearchMovies,MovieRef,search,setSearch}=useContext(SearchContext);

return{
    searchMovies,
    setSearchMovies,
    MovieRef,
    search,
    setSearch
}
}

export default useSearch