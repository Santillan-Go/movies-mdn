import { useState } from 'react'
import  './Slider.css'
import { URL_IMG_API } from './Card-Movie'
import { Link } from 'react-router-dom'

function Slider({stateImages}:{stateImages:any}) {
  console.log(stateImages)
const [number, setNumber] = useState(0)


    // const images=["https://image.tmdb.org/t/p/w500/ar2h87jlTfMlrDZefR3VFz1SfgH.jpg",
    //      "https://image.tmdb.org/t/p/w500/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
    //     "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg"]
  const handleSlider=(direction:string,position:number)=>{
    if(direction==="right"){
       if(position===stateImages.length)return setNumber(0)
        setNumber(position*-100)
return;
    }

    if(direction==="left"){
      if(position===1)return setNumber((stateImages.length-1)*-100)
       setNumber((position-1)*-100+100)
return;
   }
 
  
  }


  const handle=(direction:string)=>{
    if(direction==="right"){
       if(number===5)return setNumber(0)
        setNumber(number+1)
return;
    }

    if(direction==="left"){
      if(number===0)return setNumber(5)
       setNumber(number-1)
return;
   }
 
  
  }
  return (
    <section className="hero-image-main" >
    <article
      className="image-container"
      style={{translate:`${number*-100}vw`}}
    >
        {stateImages.map((image:any,i:number)=>(
          <div key={image} className='image-slider'>  
          
          <Link className='link-image' to={`/movie/${image.id}`}>
          
<img  src={`${URL_IMG_API}/${image.poster_path}`} alt='image-slider' />
          </Link>
<article className='info-slider'>
 <Link to={`/movie/${image.id}`}> <h1>{image.title}</h1> </Link> 
  <p>
   {image.
overview
}  </p>
</article>

</div>

        
        ))} 
    </article>
    <article className='container-btns'>

<button onClick={()=>handle("left")} className='botton'>{`<`}</button><button onClick={()=>handle("right")} className='botton'> {`>`}</button>
</article>

  </section>
  )
}

export default Slider