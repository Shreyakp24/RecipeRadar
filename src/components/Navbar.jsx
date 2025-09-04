import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // ✅ Add this!
import { UserContext } from "../components/userContext";
import ProfileMenu from "../components/ProfileMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="RecipeRadar Logo" className="h-10 w-auto" />
          <h1 className="text-3xl font-bold text-white cedarville-font">RecipeRadar</h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex space-x-6 text-xl absolute left-1/2 transform -translate-x-1/2">
          <HashLink smooth to="/" className="relative text-white group">Home</HashLink>
          <HashLink smooth to="/#features" className="relative text-white group">Features</HashLink>
          <HashLink smooth to="/#about" className="relative text-white group">About</HashLink>
          <HashLink smooth to="/#contact" className="relative text-white group">Contact</HashLink>
        </div>

        {/* Desktop Buttons */}
<div className="hidden lg:flex items-center space-x-4">
  {user ? (
    <ProfileMenu />
  ) : (
    <Link to="/login">
      <button className="bg-yellow-100 rounded-full text-red-800 hover:text-white px-4 py-2 font-semibold hover:bg-orange-300 transition">
        Login
      </button>
    </Link>
  )}
</div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 bg-orange-900 space-y-2 text-xl">
          <HashLink smooth to="/" className="block text-white hover:text-yellow-600">Home</HashLink>
          <HashLink smooth to="/#features" className="block text-white hover:text-yellow-600">Features</HashLink>
          <HashLink smooth to="/#about" className="block text-white hover:text-yellow-600">About</HashLink>
          <HashLink smooth to="/#contact" className="block text-white hover:text-yellow-600">Contact</HashLink>

          {user ? (
  <ProfileMenu />
) : (
  <Link to="/login">
    <button className="bg-yellow-100 rounded-full text-red-800 hover:text-white px-4 py-2 font-semibold hover:bg-orange-300 transition">
      Login
    </button>
  </Link>
)}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
