const router = require('express').Router();
const { Blog } = require('../models/Blog');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) =>{
    try{
        const postBlog = await Blog.findAll({
            where:{
                userId: req.session.userId,
            },
        });

        const posts = postData.map((post)=>post.get({ plain: true}));

        res.render('newBlog', {
            layout: 'dashboard',
            posts, 
        });
    }catch (err){
        res.redirect('login')
    }
})

router.get('/dashboard', withAuth, (req,res)=>{
    res.render('dashboard', {
        layout: 'dashboard',
    })
})