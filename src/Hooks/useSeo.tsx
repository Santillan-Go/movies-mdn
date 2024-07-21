import  { useEffect, useState } from 'react'

interface Props{
    title:string,
    description:string,

}
function useSeo() {

const [page, setPage] = useState<Props>({
    title:"",
    description:""
   
})

const setSeoInfo=({title,description}:{title:string,description:string})=>{

    setPage({
        title,
        description
    })
}

    useEffect(()=>{
        if(page.title){
const $title:any= document.querySelector("title");
const $descriton:any=document.querySelector(".description");

$title.textContent=page.title;
$descriton.content=page.description;        
}


    },[page])


    return {
        page,
        setSeoInfo
    }


}

export default useSeo