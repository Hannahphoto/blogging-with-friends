const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogRoutes =require('./BlogRoutes')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', blogRoutes);


module.exports = router;
