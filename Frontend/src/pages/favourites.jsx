import React, { useEffect, useState } from "react";
import axios from "axios";

const Favourites = ({ userId }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/favourites/${userId}`);
        setFavourites(res.data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };

    if (userId) {
      fetchFavourites();
    }
  }, [userId]);

  return (
    <div>
      <h2>My Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="favourites-grid">
          {favourites.map((fav) => (
            <div key={fav.recipe_id} className="favourite-card">
              <img src={fav.recipe_image} alt={fav.recipe_name} />
              <h3>{fav.recipe_name}</h3>
              <p>{fav.recipe_desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
