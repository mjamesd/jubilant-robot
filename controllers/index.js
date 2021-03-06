const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home');
const userRoutes = require('./user');
const postRoutes = require('./post');
const commentRoutes = require('./comment');


router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/api', apiRoutes);

module.exports = router;