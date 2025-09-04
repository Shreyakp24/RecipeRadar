import express from 'express';
import passport from 'passport';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Local auth
router.post('/signup', signup);
router.post('/login', login);

// Google auth route
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    // ✅ At this point, req.user is set by Passport
    // ✅ req.login() was already called inside passport strategy
    // ✅ Express session cookie is created

    // Redirect back to frontend - user info can be fetched with /auth/me
    res.redirect('http://localhost:5173');
  }
);

// 🔹 Optional route to fetch logged-in user
router.get('/me', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 🔹 Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
