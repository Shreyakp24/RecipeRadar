import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import ScrollToTop from "./components/ScrollToTop";
import Favourites from "./pages/favourites"; // ✅ Import your favourites page
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Correct for react-toastify

function Layout() {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow text-black">
        <ScrollToTop />
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/favourites" element={<Favourites />} /> {/* ✅ Added route */}
        </Routes>
      </main>
      {shouldShowNavbar && <Footer />}
    </div>
  );
}

export default Layout;
