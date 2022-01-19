const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes available at ~/users/

// Read All
// @params ?andUser=true
// router.get('/', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });

// Read All from User 
// @params ?andUser=true
// router.get('/:user', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });

// Read One from User
// @params ?andUser=true
// router.get('/:user/:post', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });

// get profile of loggedin user
router.get('/profile', withAuth, async (req, res) => {
    res.json(req.session);
});

// get profile of specific user
// router.get('/profile/:id', async (req, res) => {});


module.exports = router;