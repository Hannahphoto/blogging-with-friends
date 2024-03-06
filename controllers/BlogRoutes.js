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
});

router.get('/dashboard', withAuth, (req,res)=>{
    res.render('dashboard', {
        layout: 'dashboard',
    })
});

router.get('/edit/:id', withAuth, async (req, res)=>{
    try{
        const postData = await Blog.findByPK(req.params.id);

        if (postData){
            const post = postData.get({ plain: true});

            res.render('editBlog', {
                layout: 'dashboard',
                post,
            });
        }else {
            res.status(404).end();
        }
    }catch(err){
        res.redirect('login')
    }
})

module.exports = router;