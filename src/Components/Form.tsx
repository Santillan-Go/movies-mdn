import  React, { useState } from 'react'

import useSearch from '../Hooks/useSearch';
import { useNavigate } from 'react-router-dom';


export const Form = () => {
  
    const [query, setQuery] =useState<string>('');
    const {setSearch}=useSearch()

const navigate=useNavigate();

const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{

    setQuery(event.target.value);
};



const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
event.preventDefault();


if(!query) return;
console.log(query)

setSearch(query)
navigate("/search")
setQuery("");
};

    return (
        <form  onSubmit={handleSubmit} >
        <input className='query'  onChange={handleChange}  autoComplete='off' value={query} name='query' type="text" />
        <input type="submit" value={"Search"} className='submit' />
      </form>
  )
}
