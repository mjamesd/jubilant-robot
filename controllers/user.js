const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Routes available at ~/users/

// get profile of loggedin user
router.get('/', withAuth, async (req, res) => {});

// get profile of specific user
router.get('/profile/:id', async (req, res) => {});


module.exports = router;