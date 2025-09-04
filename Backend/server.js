// server.js
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import favouritesRoutes from './routes/favouritesRoutes.js';
import './config/passport.js'; // loads passport strategies

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  credentials: true                 // ✅ allow cookies to be sent
}));

app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true if using HTTPS
    sameSite: "lax"                               // allow cross-origin cookies
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/favourites', favouritesRoutes);

// Test route
app.get('/', (req, res) => res.send('Backend is running ✅'));
app.get('/success', (req, res) => res.send('Google login successful 🎉'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
