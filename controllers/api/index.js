const router = require('express').Router();

const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js')

router.use('/users', userRoutes)
router.use('/post', postRoutes);

module.exports = router;