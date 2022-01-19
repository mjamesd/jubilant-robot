const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes available at ~/posts/

// Create
// Display create post form
router.get('/add', withAuth, (req, res) => {
    res.render('Posts/add', { sesh: req.session, includePostJs: true });
});

// Update
// Display update post form
// @param req.params.post_id
router.get('/update/:post_id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.post_id, { raw: true });
        if (req.session.is_admin == true || post.user_id == req.session.user_id) {
            res
                .status(200)
                .render('Posts/update', { post: post, sesh: req.session, includePostJs: true });
        } else {
            console.log(aaLogo({
                name: `Cannot update post you do not own. Post id '${req.params.post_id}'.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(401)
                .render('error', { message: err, sesh: req.session });
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching post id '${req.params.post_id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, sesh: req.session });
    }
});

/** Read All
 * 
 * @param null
 */ 
router.get('/', async (req, res) => {
    try {
        console.log(aaLogo({ name: `Posts` }).render());
        const postData = await Post.findAll({
            order: [
                ['createdAt', 'DESC'],
                ['title', 'ASC'],
            ],
            include: [
                {
                    model: Comment,
                    order: [
                        ['createdAt', 'DESC'],
                        ['title', 'ASC'],
                    ],
                    include: [
                        {
                            model: User
                        }
                    ],
                },
                {
                    model: User
                },
            ],
        });
        const posts = postData.map((i) => i.get({ plain: true }));
        res
            .status(200)
            .render('Posts/index', { posts: posts, sesh: req.session.logged_in });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching all posts.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, logged_in: req.session.logged_in });
    }
});

// Read All from User 
// @param req.params.user_id
router.get('/:user_id', withAuth, async (req, res) => {
    try {
        console.log(aaLogo({ name: `Posts` }).render());
        const postData = await Post.findAll({
            where: {
                user_id: req.params.user_id
            },
            order: [
                ['createdAt', 'DESC'],
                ['title', 'ASC'],
            ],
            include: [
                {
                    model: Comment,
                    order: [
                        ['createdAt', 'DESC'],
                        ['title', 'ASC'],
                    ],
                    include: [
                        {
                            model: User
                        }
                    ],
                },
                {
                    model: User
                },
            ],
        });
        const posts = postData.map((i) => i.get({ plain: true }));
        res
            .status(200)
            .render('Posts/index', { posts: posts, sesh: req.session });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching all posts.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, logged_in: req.session.logged_in });
    }
});

// Read One from User
// @params 
router.get('/:user_id/:post_id', withAuth, async (req, res) => {
    try {
        console.log(aaLogo({ name: `Posts` }).render());
        const postData = await Post.findAll({
            where: {
                id: req.params.post_id, 
                user_id: req.params.user_id,
            },
            order: [
                ['createdAt', 'DESC'],
                ['title', 'ASC'],
            ],
            include: [
                {
                    model: Comment,
                    order: [
                        ['createdAt', 'DESC'],
                        ['title', 'ASC'],
                    ],
                    include: [
                        {
                            model: User
                        }
                    ],
                },
                {
                    model: User
                },
            ],
        });
        const posts = postData.map((i) => i.get({ plain: true }));
        res
            .status(200)
            .render('Posts/view', { posts: posts, sesh: req.session });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching all posts.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, sesh: req.session });
    }
});


module.exports = router;