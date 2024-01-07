const router = require('express').Router();
// const path = require('path');

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.get('/', async(req, res)=>{
//     res.sendFile(path.join(__dirname, 'views/index.html'))//no template engine 
// });

module.exports = router;