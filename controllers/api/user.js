const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const aaLogo = require('asciiart-logo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes available at ~/api/users/

/** Create
 * @param req.body = {
 *      name,
 *      email,
 *      password,
 *      isAdmin
 * }
**/
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(...req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.isAdmin = userData.isAdmin;

            res.status(200).json(userData);
        });
    } catch (err) {

        res
            .status(409)
            .json(err);
    }
});

/** Login
 * @param req.body = {
 *      email,
 *      password
 * }
**/
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or username, please try again' });
            return;
        }

        const validPassword = await userData.authenticateUser(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.is_admin = userData.isAdmin;
            req.session.logged_in = true;

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!', sesh: req.session });
        });

    } catch (err) {
        res
            .status(401)
            .json(err);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res
                .status(204)
                .end();
        });
    } else {
        res
            .status(404)
            .end();
    }
});

// Update
router.put('/:id', withAuth, async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if ( (req.session.user_id === user.id) || req.session.is_admin === true) {
            user = await User.update(...req.body, { where: { id: user.id } });
            req.session.save( () => {
                req.session.message = `User id '${user.id}' has been deleted.`;
                res
                    .status(201)
                    .json({ ok: user });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot delete User with id '${req.params.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(404)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while updating your User with id '${req.params.id}'.`,
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
        const user = await User.findByPk(req.params.id);
        if ( (req.session.user_id === user.id) || req.session.is_admin === true) {
            await User.destroy({ where: { id: user.id } });
            req.session.save( () => {
                req.session.message = `User id '${req.params.id}' has been deleted.`;
                res
                    .status(201)
                    .json({ ok: user });
            });
        } else {
            console.log(aaLogo({
                name: `You cannot delete User with id '${req.params.id}'. Contact an administrator.`,
                textColor: `bold-white`,
                borderColor: `red`,
            }).render());
            res
                .status(404)
                .json(err);
        }
    } catch (err) {
        console.log(aaLogo({
            name: `Error while deleting your User with id '${req.params.id}'.`,
            textColor: `bold-white`,
            borderColor: `red`,
        }).render());
        res
            .status(404)
            .json(err);
    }
});



module.exports = router;