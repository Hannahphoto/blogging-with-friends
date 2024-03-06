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
    const blogs = blogData.map((blog)=> blog.get({plain: true}));
        console.log(blogData);
    //pass serialized data and session into template
    res.render('homepage', {
        blogs, 
        logged_in: req.session.logged_in
    });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', async (req, res)=>{
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blog = blogData.get({plain: true});

        res.render('dashbaord', {
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
        // find the logged in user based on the session id
        const blogData = await Blog.findAll(
            {
            where: {
                user_id: req.session.userId,
            }
        
        });

        const blogs = blogData.map((row)=>row.get({plain: true}));
        console.log(blogs);
        res.render('dashboard', {
            blogs,
            logged_in: true
        });
    }catch(err){
        res.status(500).json(err);
        console.log(err);
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


router.get('/logout', (req, res)=>{
  
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('logout');
});

router.get('/signup', (req, res)=>{
    if (req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('signup')
})

module.exports = router;