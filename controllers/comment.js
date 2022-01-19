const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes available at ~/comments/

// Read All
// router.get('/', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });

// Read All from User 
// router.get('/:user', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });

// Read One from User
// router.get('/:user/:post', withAuth, async (req, res) => {
//     try {
//         const 
//     } catch (err) {

//     }
// });


module.exports = router;