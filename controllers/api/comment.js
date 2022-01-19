const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes available at ~/api/comments/

/* Create
 * @params req.body = {
 *      user_id,
 *      post_id,
 *      title,
 *      body
 * }
**/
router.get('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create(...req.body);
        req.session.save( () => {
            req.session.message = `Comment id '${comment.id}' has been created.`;
            res
                .status(201)
                .json({ ok: comment });
        });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while creating your Comment.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(409)
            .json(err);
    }
});



// Update
router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.update(...req.body, { where: { id: req.params.id } });
        req.session.save( () => {
            req.session.message = `Comment id '${req.params.id}' has been updated.`;
            res
                .status(201)
                .json({ ok: comment });
        });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while updating your Comment with id '${req.params.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});

// Delete
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({ where: { id: req.params.id } });
        req.session.save( () => {
            req.session.message = `Comment id '${req.params.id}' has been deleted.`;
            res
                .status(201)
                .json({ ok: comment });
        });
    } catch (err) {
        console.log(aaLogo({
            name: `Error while deleting your Comment with id '${req.params.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});


module.exports = router;