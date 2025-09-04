import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import loadingAnimation from "../assets/animation/Loading.json";
import Lottie from "lottie-react";
import bgImage from "../assets/background8.png";
import { RiFireLine } from "react-icons/ri";
import { PiChefHatDuotone } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import youtube from "../assets/youtube.jpg";
import website from "../assets/website.jpg";
import bgImage1 from "../assets/background4.png";
import { motion } from 'framer-motion';
import { GiStarShuriken } from "react-icons/gi";
import { toast } from 'react-toastify';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals?.[0] || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const formatInstructions = (instructionText) => {
    if (!instructionText) return [];

    const hasManualSteps = /^\d+\./.test(instructionText.trim());

    if (hasManualSteps) {
      return instructionText
        .split(/(?=\d+\.\s)/g)
        .map((step) => step.trim().replace(/^\d+\.\s*/, ""))
        .filter((step) => step.length > 0);
    } else {
      return instructionText
        .split(/(?<=[.?!])\s+(?=[A-Z])/g)
        .map((step) => step.trim())
        .filter((step) => step.length > 0);
    }
  };

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

const toggleFavourite = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ get JWT
    if (!token) {
      toast.error("Please login to add favourites!");
      return;
    }

    if (!isFavourite) {
      // Add to favourites
      await axios.post(
        "http://localhost:5000/favourites/add",
        { recipeId: recipe.idMeal },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      toast("Recipe added to favourites!", {
        icon: "❤️",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      // Remove from favourites
      await axios.post(
        "http://localhost:5000/favourites/remove",
        { recipeId: recipe.idMeal },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      toast("Recipe removed from favourites!", {
        icon: "💔",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    setIsFavourite(!isFavourite);
  } catch (error) {
    console.error("Error updating favourites:", error);
    toast.error("Something went wrong updating favourites.");
  }
};


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-yellow-100">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          className="w-80 h-80"
        />
        <p className="mt-6 text-2xl text-gray-700">Loading recipes...</p>
      </div>
    );
  }

  const formattedSteps = formatInstructions(recipe.strInstructions);
  const ingredientList = getIngredients(recipe);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="p-16 font-sans bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage1})` }}
      >
        <div className="max-w-7xl mx-auto bg-orange-100 rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <header
            className="flex flex-col md:flex-row justify-between items-center md:px-12 md:py-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})`, minHeight: "50vh" }}
          >
            <div className="mb-8 md:mb-0 md:mr-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 leading-tight">
                {recipe.strMeal}
              </h1>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center bg-orange-700 text-white px-4 py-2 rounded-full shadow">
                  <span className="text-2xl mr-2">
                    <PiChefHatDuotone />
                  </span>
                  <div>
                    <span className="font-semibold">Cuisine:</span>{" "}
                    {recipe.strArea}
                  </div>
                </div>

                <div className="flex items-center bg-orange-700 text-white px-4 py-2 rounded-full shadow">
                  <span className="text-2xl mr-2">
                    <RiFireLine />
                  </span>
                  <div>
                    <span className="font-semibold">Difficulty:</span>{" "}
                    Intermediate
                  </div>
                </div>

                {/* Favourite Button */}
                <div
                  className="flex items-center bg-red-100 text-red-500 px-4 py-2 rounded-full shadow hover:bg-red-300 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                  onClick={toggleFavourite}
                >
                  <motion.span
                    className="text-2xl mr-2"
                    key={isFavourite}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {isFavourite ? <FaHeart /> : <FaRegHeart />}
                  </motion.span>
                  <div>
                    <span className="font-semibold">
                      {isFavourite
                        ? "Remove it from your favourites"
                        : "Add it to your favourites"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-auto h-52 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex flex-col lg:flex-row p-8 md:p-12 gap-12 ">
            {/* Left Side - Instructions */}
            <div className="lg:w-2/3">
              <section>
                <h2 className="text-3xl font-bold text-orange-800 mb-6">
                  Cooking Instructions
                </h2>
                <ol className="list-none space-y-3">
                  {formattedSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-white p-3 rounded-lg shadow-md"
                    >
                      <span className="text-3xl font-bold text-red-700 mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-medium text-gray-500 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Right Side - Ingredients & Links */}
            <aside className="lg:w-1/3 flex flex-col gap-6">
              <section className="flex">
                <div className="flex-grow ">
                  <h2 className="text-3xl font-bold text-orange-800 mb-6">
                    Ingredients
                  </h2>
                  <div className="flex flex-col gap-y-3 bg-white p-4 rounded-xl shadow-md">
                    {ingredientList.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-gray-700"
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-2 text-green-600">
                            <GiStarShuriken />
                          </span>
                          <p className="font-medium">{item.ingredient}</p>
                        </div>
                        <span className="text-gray-500">{item.measure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <h2 className="text-3xl font-bold text-orange-800">Links</h2>

              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  className="relative rounded-lg overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={youtube}
                    alt="Watch on YouTube"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">
                      Watch on YouTube
                    </p>
                  </div>
                </a>
              )}

              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  className="relative rounded-lg overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={website}
                    alt="View Original Source"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">
                      View Original Recipe
                    </p>
                  </div>
                </a>
              )}
            </aside>
          </main>
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeDetail;
