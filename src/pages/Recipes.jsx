import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PiChefHatDuotone } from "react-icons/pi";
import { GiFruitBowl } from "react-icons/gi";
import bgImage from "../assets/background4.png";
import foodplate from "../assets/foodplate.png";
import { FaBowlFood } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { LuFish } from "react-icons/lu";
import { FaUtensils } from "react-icons/fa";
import {RiCake3Line,RiFireLine,RiCupLine} from "react-icons/ri";
import { GrLinkPrevious,GrLinkNext } from "react-icons/gr";
//import { FaSearch } from "react-icons/fa";
import loading from "../assets/animation/Loading.json"; 
import Lottie from "lottie-react";
import { motion } from 'framer-motion';



function Recipes() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: "All Types", apiValue: "", icon: FaUtensils },
    { name: "Breakfast", apiValue: "Breakfast", icon: RiCupLine },
    { name: "Desserts", apiValue: "Dessert", icon: RiCake3Line },
    { name: "Seafood", apiValue: "Seafood", icon: LuFish },
    { name: "Vegetarian", apiValue: "Vegetarian", icon: PiChefHatDuotone },
    { name: "Beef", apiValue: "Beef", icon: RiFireLine },
    { name: "Pasta", apiValue: "Pasta", icon: IoFastFood },
    { name: "Vegan", apiValue: "Vegan", icon: FaBowlFood },
    { name: "Chicken", apiValue: "Chicken", icon: GiFruitBowl },
  ];
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);

useEffect(() => {
  setIsLoading(true);
  setCurrentPage(1);
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on category change

  const selectedCategory = categories.find(c => c.name === activeCategory)?.apiValue || '';

  const url = selectedCategory === ''
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

  axios.get(url)
    .then(response => {
      let validMeals = (response.data.meals || []).filter(meal => meal.strMealThumb);

      // Shuffle only for "All Types"
      if (selectedCategory === '') {
        validMeals = validMeals.sort(() => Math.random() - 0.5);
      }

      setMeals(validMeals);
      setIsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setMeals([]);
      setIsLoading(false);
    });
}, [activeCategory]);

const filteredMeals = meals.filter(meal =>
  meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
);

const indexOfLastRecipe = currentPage * recipesPerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
const currentRecipes = filteredMeals.slice(indexOfFirstRecipe, indexOfLastRecipe);
const totalPages = Math.ceil(filteredMeals.length / recipesPerPage);

if (isLoading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-100">
      {/* Your Lottie Animation Component */}
      <Lottie
        animationData={loading}
        loop
        autoplay
        className="w-80 h-80"
      />

      {/* Loading Text */}
      <p className="mt-6 text-2xl text-gray-700">Loading recipes...</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-cover bg-center pt-16" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="max-w-7xl mx-auto p-4 sm:p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
        {/* Header */}
        <div className="relative h-64 md:h-80 bg-cover bg-center rounded-xl p-8 mb-8 flex items-center" style={{ backgroundImage: `url(${foodplate})` }}>
          <div className="text-gray-900 z-10">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Explore <br />
              <span className="text-orange-600">Culinary Insights</span>
            </h2>
          </div>
        </div>
    </motion.div>

        {/* Category Filter */}
<div className="mb-8 mt-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
    What to Cook?
  </h2>

  <div className="flex flex-wrap justify-center gap-2">
    {categories.map((category) => (
      <button
        key={category.name}
        onClick={() => setActiveCategory(category.name)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200
          ${activeCategory === category.name
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200"
          }`}
      >
        <category.icon className="text-lg" />
        <span className="whitespace-nowrap text-sm font-medium">{category.name}</span>
      </button>
    ))}

    {/* 🔍 Search Bar */}
<input
    type="text"
    placeholder="Search recipes..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page on new search
    }}
    className="pl-4 pr-2 py-2 border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
  </div>
  </motion.div>
</div>
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
        {/* Recipe Grid */}
        {currentRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         
            {currentRecipes.map(meal => (
              <div
                key={meal.idMeal}
                className="bg-yellow-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold text-orange-900 leading-tight line-clamp-2 mb-4 h-[3.5rem]" title={meal.strMeal}>
                    {meal.strMeal}
                  </h2>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-90 object-cover rounded-xl"
                    loading="lazy"
                  />
                  <p className="mt-4 text-md text-orange-600">
                    Category: {meal.strCategory || activeCategory}
                  </p>
                </div>
<Link to={`/recipes/${meal.idMeal}`}>
  <div className="mt-4 mx-4 mb-4 p-2 flex justify-between items-center bg-orange-900 text-white rounded-full transition-colors duration-200 hover:bg-orange-700">
    <span className="ml-2 text-sm font-medium">See Complete Recipe</span>
    <div className="bg-orange-900 p-1.5 rounded-full">
      <PiChefHatDuotone className="h-4 w-4" />
    </div>
  </div>
</Link>
              </div>
            ))}
            
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No recipes found.
          </p>
        )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
<div className="flex justify-center items-center gap-4 mt-8">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    className={`p-2 rounded-full bg-orange-900 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-orange-700 text-white"}`}
  >
    <GrLinkPrevious size={20} />
  </button>

  <span className="text-gray-700 font-semibold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    className={`p-2 rounded-full bg-orange-900 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-orange-700 text-white"}`}
  >
    <GrLinkNext size={20} />
  </button>
</div>
        )}
      </div>
    </div> 
  );
}

export default Recipes;
