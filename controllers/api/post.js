const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const aaLogo = require('asciiart-logo');

// Routes available at ~/api/posts/

/** Create
 * @param req.body = {
 *      user_id,
 *      title,
 *      body
 * }
**/
router.post('/add', withAuth, async (req, res) => {
    try {
        if ( (req.session.user_id == req.body.user_id) || req.session.is_admin === true) {
            const post = await Post.create(req.body);
            req.session.save( () => {
                req.session.message = `Post id '${post.id}' hs been created.`;
                req.session.post_id = post.id;
                res
                    .status(200)
                    .json({ postId: post.id });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot create this Post. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(400)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while creating your post.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(409)
            .json(err);
    }
});

/** Update
 * @param req.body = {
        id,
 *      user_id,
 *      title,
 *      body
 * }
**/
router.put('/update/:post_id', withAuth, async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.post_id);
        try {
            if ( ( (post.id == req.params.post_id) && (req.session.user_id == post.user_id) ) || req.session.is_admin === true) {
                post = await Post.update(req.body, { where: { id: post.id } });
                req.session.save( () => {
                    req.session.message = `Post id '${post.id}' has been updated.`;
                    res
                        .status(200)
                        .json({ postId: post.id });
                });
            } else {
                throw err;
            }
        } catch (err) {
            console.log(aaLogo({
                name: `You cannot update Post with id '${post.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(401)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while updating your post with id '${req.body.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});

/** Delete
 * @param req.params = {
 *      id
 * }
**/
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if ( (req.session.user_id === post.user_id) || req.session.is_admin === true) {
            await Post.destroy({ where: { id: post.id } });
            req.session.save( () => {
                req.session.message = `Post id '${post.id}' has been deleted.`;
                res
                    .status(201)
                    .json({ post: post });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot delete Post with id '${post.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(404)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while deleting your post with id '${req.params.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});


module.exports = router;