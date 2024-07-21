import { createHashRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import App from "../App";
import SearchView from "../Pages/SearchView";

import MovieView, { LoaderData } from "../Pages/MovieView";
import FavoritesView from "../Pages/FavoritesView";




export const router= createHashRouter([
    {
path:"/",
element:<Layout/>,
children:[{
    index:true,
    element:<App/>
},
{
    path:"/search",
    element:<SearchView/>
}
]

    }
    ,{

        path:"/movie/:id",
        element:<MovieView/>,
        loader:LoaderData
    }
    ,{
        path:"*",
        element:<h1>404</h1>
    },{
        path:"/favorites",
        element:<FavoritesView/>
    }
])