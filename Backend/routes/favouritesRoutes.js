// routes/favouritesRoutes.js
import express from "express";
import pool from "../config/db.js"; // PostgreSQL connection
import ensureAuth from "../middleware/ensureAuth.js"; // To protect routes

const router = express.Router();

// ✅ Get all favourites for logged-in user
router.get("/", ensureAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT recipe_id FROM favourites WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows.map(row => row.recipe_id)); // return only recipe_ids
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a favourite
router.post("/add", ensureAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    // Check if already exists
    const existing = await pool.query(
      "SELECT * FROM favourites WHERE user_id = $1 AND recipe_id = $2",
      [userId, recipeId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Already in favourites" });
    }

    await pool.query(
      "INSERT INTO favourites (user_id, recipe_id) VALUES ($1, $2)",
      [userId, recipeId]
    );

    res.json({ message: "Added to favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove a favourite
router.post("/remove", ensureAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    await pool.query(
      "DELETE FROM favourites WHERE user_id = $1 AND recipe_id = $2",
      [userId, recipeId]
    );

    res.json({ message: "Removed from favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
