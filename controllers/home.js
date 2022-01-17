const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const aaLogo = require('asciiart-logo');

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
        console.log(posts);
        res
            .status(200)
            .json(posts);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.get('/login', async (req, res) => {

});

router.get('/logout', withAuth, async (req, res) => {

});


module.exports = router;