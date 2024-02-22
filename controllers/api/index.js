const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;

