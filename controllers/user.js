const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');

// Routes available at ~/users/


// get profile of specific user
router.get('/profile/:user_id', async (req, res) => {
    const userData = await User.findAll({
        where: {
            id: req.params.user_id
        }
    });
    const users = userData.map((i) => i.get({ plain: true }));
    res
        .status(200)
        .render('Users/view', { users: users, sesh: req.session });
});

router.get('/profile', withAuth, (req, res) => {
    res
        .status(200)
        .redirect(`/users/profile/${req.session.user_id}`);
});


module.exports = router;