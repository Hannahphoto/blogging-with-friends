const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=>{
    try{
        //get all projects and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

    //serialize the data so the template can read it
    const blog = blogData.map((blog)=> blog.get({plain: true}));

    //pass serialized data and session into template
    res.render('homepage', {
        blog, 
        logged_in: req.session.logged_in
    });
}catch(err){
    res.status(500).json(err);
}
});

router.get('/blog/:id', async (req, res)=>{
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blog = blogData.get({plain: true});

        res.render('blog', {
            ...blog, 
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err);
    }
});

//use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res)=>{
    try{
        //find the logged in user based on the session id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {excludes: ['password']},
            include: [{model: Blog}],
        });

        const user = userData.get({plain: true});

        res.render('dashboard', {
            ...user, 
            logged_in: true
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res)=>{
    //if the user is already logged in, redirect the request to another route
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// router.get('/project', (req, res)=>{
//     //redirect to the personal blog (project) page of the user
//     if()
    
// }
// )

module.exports = router;