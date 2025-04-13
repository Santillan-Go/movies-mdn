import { Link, Outlet } from "react-router-dom";
import { Form } from "../Components/Form";
import { Home, Favorite } from "@mui/icons-material";
function Layout() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-[rgb(3,3,79)] px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <Link
            to="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              className="h-10 w-auto bg-white rounded-lg p-2"
              alt="TMDB Logo"
            />
          </Link>

          <div className="w-full md:w-auto flex flex-col md:flex-row md:ml-auto items-center gap-4">
            <div className="w-full md:w-[400px]">
              <Form />
            </div>

            <nav className="flex items-center gap-6 font-medium">
              <Link
                to="/"
                className="text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Home />
              </Link>
              <Link
                to="/favorites"
                className="text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Favorite />
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
