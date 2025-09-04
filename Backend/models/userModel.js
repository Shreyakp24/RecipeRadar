// userModel.js
import pool from '../config/db.js'; // ✅ DB pool connection

// For Google or traditional signup (flexible)
export const saveUser = async (email, full_name, password = null) => {
  const result = await pool.query(
    'INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *',
    [email, full_name, password]
  );
  return result.rows[0];
};

// For login
export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// For traditional signup form
export const createUser = async ({ full_name, email, password }) => {
  const result = await pool.query(
    'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [full_name, email, password]
  );
  return result.rows[0];
};
