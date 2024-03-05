const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/dashboard', withAuth, async (req, res)=>{
    try{
        const blogData = await Blog.create({
            ...req.body,
            userId: req.body.userId,
        });
        res.status(200).json(blogData);
    }catch(err){
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res)=>{
    try{
        const [afftectedRows] = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            }
        });

            if(afftectedRows > 0){
                res.status(200).end();
            }else{
                res.status(404).end();
            }
        }catch(err){
            res.status(500).json(err);
        }
    });

router.delete('/:id', withAuth, async (req, res)=>{
    try{
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if(!blogData){
            res.status(404).json({message: 'No project found with this id!'});
            return;
        }
        res.status(200).json(blogData);
    }catch(err){
        res.status(500).json(err); 
    };
});

module.exports = router;