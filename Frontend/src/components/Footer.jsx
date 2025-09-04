import { FaInstagram, FaTwitter ,FaFacebook} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-orange-900 text-white text-sm py-8 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        
        {/* Column 1: Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">RecipeRadar</h2>
          <p className="text-gray-300">
            Helping you find the best recipes with ease.
          </p>
        </div>

        {/* Column 2: Main Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 4: Social / Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <p className="text-gray-300 mb-2">Email: support@reciperadar.com</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-8 text-center text-gray-300 text-xs">
        &copy; {new Date().getFullYear()} RecipeRadar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
