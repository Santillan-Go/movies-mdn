import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/index.tsx'
import { SearchProvider } from './Context/SearchContext.tsx'
import { FavoriteProvider } from './Context/FavoriteContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
<SearchProvider>
  <FavoriteProvider>

       <RouterProvider router={router}></RouterProvider> 
  </FavoriteProvider>

</SearchProvider>

  </React.StrictMode>
)
