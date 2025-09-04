import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from "react";
import FeedbackCard from "../components/feedbackCard";
import useInViewAnimate from "../components/useInViewAnimate";
import CountOnView from "../components/CountOnView";
import bgImage from "../assets/background3.png";

export default function About() {
  const storyCards = [
    {
      text: "We once had a full-on debate about whether onions go in pasta sauce. After three days of silence and passive-aggressive memes, we realized food should bring people together. And so, RecipeRadar was our peace treaty.",
      color: "bg-orange-100",
    },
    {
      text: "One midnight, we tried to make a snack using only bread, ketchup, and desperation. Google gave us nothing helpful. We decided to fix the internet by creating a recipe tool that actually understands cravings.",
      color: "bg-orange-200",
    },
    {
      text: "It all started with a burnt toast and a dream to find recipes that didn’t come with a novel-length backstory. RecipeRadar was born from the frustration of hungry people who just wanted to eat — not scroll endlessly.",
      color: "bg-orange-300",
    },
  ];

  const feedBacks1 = [
    {
      name: "Priya Sharma",
      feedback: "Absolutely loved the recipe! So easy and delicious!",
      image: "https://i.pravatar.cc/100?img=10",
    },
    {
      name: "Rahul Verma",
      feedback: "I tried the pasta dish and my family was impressed.",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Anjali Singh",
      feedback: "Great flavors and very well explained steps.",
      image: "https://i.pravatar.cc/100?img=16",
    },
    {
      name: "Rohan Mehta",
      feedback: "Perfect balance of spices. Will definitely try more.",
      image: "https://i.pravatar.cc/100?img=14",
    },
    {
      name: "Meera Joshi",
      feedback: "Simple, quick, and tasty – a total win!",
      image: "https://i.pravatar.cc/100?img=15",
    },
  ];
  const feedBacks2 = [
    {
      name: "Siddharth Kapoor",
      feedback: "The search feature is a lifesaver! I found a new favorite recipe every week.",
      image: "https://i.pravatar.cc/100?img=13",
    },
    {
      name: "Neha Desai",
      feedback: "Clean UI, delicious results. What more can a food lover ask for?",
      image: "https://i.pravatar.cc/100?img=20",
    },
    {
      name: "Arjun Nair",
      feedback: "The spice levels were perfect. Even my picky roommate loved it!",
      image: "https://i.pravatar.cc/100?img=18",
    },
    {
      name: "Pooja Reddy",
      feedback: "Super easy instructions. I made biryani for the first time and it was a hit!",
      image: "https://i.pravatar.cc/100?img=19",
    },
    {
      name: "Vikram Iyer",
      feedback: "Honestly, I come here more often than Google for recipes now.",
      image: "https://i.pravatar.cc/100?img=17",
    }
  ]
  
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Scroll transforms for the right cards
  const y1 = useTransform(scrollYProgress, [0.1, 0.3], [150, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [250, 0]);
  const y3 = useTransform(scrollYProgress, [0.3, 0.5], [350, 0]); 
  const yTransforms = [y1, y2, y3];

  // Left content scrolls in sync with the first card
  const leftY = y1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const AnimatedCard = ({ children }) => {
  const [ref, isVisible] = useInViewAnimate();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

  return (
    <>
    <section className="bg-center bg-cover py-20" style={{ backgroundImage: `url(${bgImage})` }}> 
    <AnimatedCard>    
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-200 mb-8 bg-orange-800 py-10 flex items-center justify-center gap-4">
  Built for Foodies, By Foodies
  <FaHeart className="text-orange-200 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
</h2>
    </AnimatedCard>
      <div className="max-w-6xl mx-auto px-6">
        <div className="md:flex gap-12">
          {/* LEFT SIDE with synchronized scroll */}
          <motion.div
            className={`md:w-1/2 mb-12 space-y-6 ${
              !isMobile ? "sticky top-32 h-fit" : ""
            }`}
            style={!isMobile ? { y: leftY, zIndex: 10 } : {}}
          >
          <AnimatedCard>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-700 leading-tight">
              This is our story —<br />built out of midnight hunger.
            </h3>
            <p className="text-lg text-orange-600">
              From late-night cravings to a platform that answers every “what can I cook?” moment.
            </p>
          </AnimatedCard>
          </motion.div>

          {/* RIGHT SIDE - Cards */}
          <div className="md:w-1/2 relative h-[100vh]">
          <AnimatedCard>
            {[...storyCards].reverse().map((card, index) => (
              <motion.div
                key={index}
                className={`${
                  !isMobile ? "sticky top-32" : ""
                } p-4 h-60 w-full mb-6 rounded-xl shadow-xl text-lg font-semibold ${card.color} flex items-center justify-center text-center`}
                style={!isMobile ? { zIndex: index + 1, y: yTransforms[index] } : {}}
              >
              <p className="overflow-hidden text-ellipsis line-clamp-5 px-2">
                {card.text}
              </p>
              </motion.div>
            ))}
            </AnimatedCard>
          </div>
        </div>
      </div>
        <section className="py-20">
      <AnimatedCard>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-200 mb-8 bg-orange-800 py-10 flex items-center justify-center gap-4">
        Real Stories, Real Foodies
      </h2>
      </AnimatedCard>
    <div className="max-w-7xl mx-auto py-10">
      {/* SCROLL LEFT */}
      <div className="relative overflow-hidden h-48 mb-12 fade-mask">
        <motion.div
          className="flex gap-2 absolute items-stretch h-full"
          animate={{ x: ["0%", "-60%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...feedBacks1, ...feedBacks1].map((item, i) => (
            <motion.div
              key={`left-${i}`}
              className="min-w-[300px] opacity-100 transition-opacity duration-500"
            >
              <FeedbackCard
                name={item.name}
                feedback={item.feedback}
                stars={5}
                image={item.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>    

      {/* SCROLL RIGHT with fade */}
      <div className="relative overflow-hidden h-48 fade-mask">
        <motion.div
          className="flex gap-2 absolute items-stretch h-full"
          animate={{ x: ["-60%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...feedBacks2, ...feedBacks2].map((item, i) => (
            <motion.div
              key={`right-${i}`}
              className="min-w-[300px] opacity-100 transition-opacity duration-500"
            >
              <FeedbackCard
                name={item.name}
                feedback={item.feedback}
                stars={5}
                image={item.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    </section>
    </section>
  
    <section className="bg-orange-700">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Labels */}
        <AnimatedCard>
          <div className="grid grid-cols-3 text-lg font-medium mb-4 text-white">
            <p>Happy Users</p>
            <p>Uptime</p>
            <p>Events Tracked</p>
          </div>
        </AnimatedCard>

        {/* CountUp on Scroll */}
        <CountOnView />
      </div>
    </section>
    </>
  );
}
