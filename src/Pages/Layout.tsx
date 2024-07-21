
import {  Link, Outlet } from 'react-router-dom'
import { Form } from '../Components/Form'

function Layout() {
  return (
    <>
    
    <header>
<Link  to={"/"} className='logo-container'>
  <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" className='img-logo' alt="" />
</Link>
<section  className='container-header'> 

<Form/>

<nav>
<Link to={"/"}>Home</Link>
<Link to="/favorites">Favoritos</Link>

</nav>

</section>
 
</header>
<main>

  <Outlet/>
</main>




    </>
  )
}

export default Layout