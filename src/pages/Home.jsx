import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import assets from "../assets/chicken.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Features from "./Features.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import { Parallax } from 'react-scroll-parallax';
import KellogsLogo from '../assets/logos/kellogs.png';
import CocacolaLogo from '../assets/logos/coca-cola.png';
import NestleLogo from '../assets/logos/nestle.png';
import FerreroLogo from '../assets/logos/ferrero.png';
import Cadbury from '../assets/logos/cadbury.png';
import HersheyLogo from '../assets/logos/hershey.png';
import QwalityWallsLogo from '../assets/logos/kwalitywalls.png';
import { Typewriter } from 'react-simple-typewriter';
import bgImage from "../assets/background2.png";
import { UserContext } from '../components/userContext';


const brandLogos = [
  { name: "Britannia", img: KellogsLogo },
  { name: "Coca-cola", img: CocacolaLogo },
  { name: "Nestle", img: NestleLogo },
  { name: "Ferrero", img: FerreroLogo },
  { name: "Cadbury", img: Cadbury },
  { name: "Hershey", img: HersheyLogo },
  { name: "QwalityWalls", img: QwalityWallsLogo },
];
function Home() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            once: true,     // Only animate once
        });
    }, []);
    const handleGetStarted = () => {
        if (user) {
            navigate("/recipes"); // 🔁 Replace this with your actual recipe page route
        } else {
            navigate("/login");
        }
    };

    return (
        <>        
        <section id="home" className="bg-orange-800 pt-28 pb-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <h1 className="w-full md:w-2/4 text-5xl md:text-6xl font-bold text-orange-200 text-left mb-4 leading-tight">
                    <Typewriter
                        words={[
                        'Find Delicious Recipes Easily',
                        ]}
                        loop={1}
                        cursor={false}
                        typeSpeed={50}
                    />
                </h1>
                <div className="slide-in-up md:w-1/4 text-left mt-6 md:mt-0">
                    <p className="text-white mb-4 text-xl font-semibold ">
                        Discover, explore, and try out amazing dishes from all over the world.
                    </p>
<button
  onClick={handleGetStarted}
  className="px-6 py-2 bg-yellow-100 text-red-800 rounded-full hover:bg-orange-500 hover:text-white transition font-semibold"
>
  Get Started
</button>
                </div>
            </div>
        </section>
        <div
  className="pt-12 bg-cover bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
        <div className="container mx-auto">
            <div className="relative pt-5 text-center rounded-t-xl bg-orange-200 shadow-xl brightness-110">
                <Parallax translateY={[40, -40]}>
                <img src={assets} alt="chicken"  className="animate-zoom mx-auto w-full md:w-3/4 lg:w-1/2 rounded-lg "
                />
                </Parallax>
                <div className="fade-in-2 absolute bottom-10 left-1/4 transform -translate-x-1/2 
                bg-white/70 text-yellow-600 px-4 py-2 md:px-7 md:py-4 
                rounded-full shadow-xl text-sm md:text-lg font-bold 
                max-w-[220px] text-center leading-snug">
                Make tasty meals every day!
                </div>
                <div className="fade-in-3 absolute top-16 left-3/4 transform -translate-x-1/2 
                bg-white/50 text-amber-700 px-4 py-2 md:px-7 md:py-4 
                rounded-full shadow-xl text-sm md:text-lg font-bold 
                max-w-[200px] text-center leading-snug">
                “Good food. Great mood.”
                </div>
            </div>
        </div>
        </div>
        <section className="bg-red-700 py-8 overflow-hidden">
            <h2 className="text-3xl text-center text-yellow-100 mb-8">Our trusted partners</h2>
            <div className="container w-full overflow-x-hidden mx-auto min-h-[10rem]">
                <div className="flex animate-scroll whitespace-nowrap">
                {Array(2).fill(0).map((_, i) =>
                    brandLogos.map(({ name, img }) => (
                    <div
                        key={`${i}-${name}`}
                        className="mx-6 px-4 py-2 inline-block"
                    >
                        <img
                        src={img}
                        alt={`${name} logo`}
                        style={{ height: "130px", width: "130px" }}
                        className=" object-contain transition-transform duration-300 hover:scale-110 max-w-[150px] max-h-[150px] brightness-0 invert opacity-80"
                        />
                    </div>
                    ))
                )}
                </div>
            </div>
        </section>
        <section id="features">
        <Features />
        </section>

        <section id="about">
        <About />
        </section>

        <section id="contact">
        <Contact />
        </section>     
    </>
    )
}
export default Home;