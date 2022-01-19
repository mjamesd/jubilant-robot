const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
                        ['createdAt', 'ASC'],
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
        console.log(posts);
        console.log(req.session);
        res.render('home', { posts: posts, sesh: req.session });
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/users/profile');
        return;
      }
    
      res.render('Users/login');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, { raw: true });
        try {
            const postData = await Post.findAndCountAll({
                where: {
                    user_id: req.session.user_id,
                }
            });
            const posts = postData.rows.map((i) => i.get({ plain: true })); // postData.rows = the data from the database
            try {
                const commentData = await Comment.findAndCountAll({
                    where: {
                        user_id: req.session.user_id,
                    },
                    include: [{ model: Post }]
                });
                const comments = commentData.rows.map((i) => i.get({ plain: true }));

                res
                    .status(200)
                    .render('Users/dashboard', {
                        user: user,
                        posts: posts, postsCount: postData.count,
                        comments: comments, commentsCount: commentData.count,
                        sesh: req.session
                    });
            } catch (errComment) {
                console.log(aaLogo({
                    name: `Error while fetch your Comment info (User ID: ${req.session.user_id}).`,
                    textColor: `bold-white`,
                    borderColor: `red`,
                }).render());
                res
                    .status(404)
                    .json(errComment);
            }
        } catch (errPost) {
            console.log(aaLogo({
                name: `Error while fetch your Post info (User ID: ${req.session.user_id}).`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(404)
                .json(errPost);
        }
    } catch (errUser) {
        console.log(aaLogo({
            name: `Error while fetch your User info (ID: ${req.session.user_id}).`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(errUser);
    }
});


module.exports = router;