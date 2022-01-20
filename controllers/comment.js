const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');

// Routes available at ~/comments/

// Create
// Display create comment form
router.get('/add/:post_id', withAuth, async (req, res) => {
    const post = await Post.findByPk(req.params.post_id, {
        raw: true,
        include: [
            { model: User }
        ]
    });
    res.render('Comments/add', { sesh: req.session, post: post, includeCommentJs: true });
});

// Update
// Display update comment form
// @param req.params.comment_id
router.get('/update/:comment_id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.comment_id, { raw: true });
        try {
            if (req.session.is_admin == true || comment.user_id == req.session.user_id) {
                res
                    .status(200)
                    .render('Comments/update', { comment: comment, sesh: req.session, includeCommentJs: true });
            } else {
                throw err;
            }
        } catch (err) {
            console.log(aaLogo({
                name: `Cannot update comment you do not own. Comment id '${req.params.comment_id}'.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(401)
                .render('error', { message: err, sesh: req.session });
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching comment id '${req.params.comment_id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, sesh: req.session });
    }
});

// Read All from User
// @param req.params.user_id
router.get('/view/:user_id', withAuth, async (req, res) => {
    try {
        console.log(aaLogo({ name: `Comments` }).render());
        const commentData = await Comment.findAll({
            where: {
                user_id: req.params.user_id
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: Post,
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
        const comments = commentData.map((i) => i.get({ plain: true }));
        res
            .status(200)
            .render('Comments/index', { comments: comments, sesh: req.session });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching all comments.`,
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
router.get('/view/:user_id/:comment_id', withAuth, async (req, res) => {
    try {
        console.log(aaLogo({ name: `Comments` }).render());
        const commentData = await Comment.findAll({
            where: {
                id: req.params.comment_id, 
                user_id: req.params.user_id,
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: Post,
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
        const comments = commentData.map((i) => i.get({ plain: true }));
        res
            .status(200)
            .render('Comments/view', { comments: comments, sesh: req.session });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while fetching all comments.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .render('error', { message: err, sesh: req.session });
    }
});


module.exports = router;