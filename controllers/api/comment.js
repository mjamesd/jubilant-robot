const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const aaLogo = require('asciiart-logo');

// Routes available at ~/api/comments/

/** Create
 * @param req.body = {
 *      user_id,
 *      body
 * }
**/
router.post('/add', withAuth, async (req, res) => {
    try {
        if ( (req.session.user_id == req.body.user_id) || req.session.is_admin === true) {
            const comment = await Comment.create(req.body);
            req.session.save( () => {
                req.session.message = `Comment id '${comment.id}' has been created.`;
                req.session.comment_id = comment.id;
                res
                    .status(200)
                    .json({ commentId: comment.id });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot create this Comment. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(400)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while creating your comment.`,
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
 *      body
 * }
**/
router.put('/update/:comment_id', withAuth, async (req, res) => {
    try {
        let comment = await Comment.findByPk(req.params.comment_id);
        try {
            if ( ( (comment.id == req.params.comment_id) && (req.session.user_id == comment.user_id) ) || req.session.is_admin === true) {
                comment = await Comment.update(req.body, { where: { id: comment.id } });
                req.session.save( () => {
                    req.session.message = `Comment id '${comment.id}' has been updated.`;
                    res
                        .status(200)
                        .json({ commentId: comment.id });
                });
            } else {
                throw err;
            }
        } catch (err) {
            console.log(aaLogo({
                name: `You cannot update Comment with id '${comment.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(401)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while updating your comment with id '${req.body.id}'.`,
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
        const comment = await Comment.findByPk(req.params.id);
        if ( (req.session.user_id === comment.user_id) || req.session.is_admin === true) {
            await Comment.destroy({ where: { id: comment.id } });
            req.session.save( () => {
                req.session.message = `Comment id '${comment.id}' has been deleted.`;
                res
                    .status(201)
                    .json({ comment: comment });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot delete Comment with id '${comment.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(404)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while deleting your comment with id '${req.params.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});


module.exports = router;