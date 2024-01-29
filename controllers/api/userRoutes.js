const router = require('express').Router();
const { User } = require('../../models');

//register a new user
router.post('/register', async (req, res)=> {
    try{
        console.log('Request received:', req.body);
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log("Registration Successful:", userData);
        req.session.save(()=>{
            req.session.userId = userData.id;
            req.session.logged_in = true;
            req.statusCode(200).json(userData)
        });
    }catch (err){
        if (err.name === 'SequelizeValidationError') {
            console.error('Validation error during registration:', err.errors);
            res.status(400).json({ message: 'Validation error', errors: err.errors });
        }else{
            console.log("Error during registration:", err);
            res.status(500).json(err);
        }
        
    }
});

//user who has already singend up should be able to log in
router.post('/login',async (req, res)=> {
    try{
        const userData = await User.findOne({
            where: {
                name: req.body.name, }});

        if(!userData){
            res
                .status(400)
                .json({message: 'Incorrect name, please try again.'});
                return;
        }
        const validPassword = userData.checkPassword(req.body.password);

        if(!validPassword){
            res
                .status(400)
                .json({message: 'Incorrect password please try again.'});
                return
        }

        req.session.save(()=>{
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.logged_in = true;

            res.json({user, message: 'You are now logged in!'})
        })
    }catch(err){
        res.status(400).json(err);
    }
});

//user logout
router.get('/logout', (req, res)=>{
    if(req.session.logged_in){
        req.session.destroy(()=>{
            res.redirect('/');
        });
    }else {
        res.redirect('/');
        
    }
});

// //create a user login
// router.post("/", async (req, res) => {
//     try{
//         const userData = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         });
//         req.session.save(()=>{
//             req.session.userId = userData.id;
//             req.session.logged_in = true;
//             res.status(200).json(userData);
//         });
//     }catch (err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

//update user login info
// router.put("/", async (req, res)=>{
//     try{
//         const userData = await User.update({
//             username: req.body.username,
//             email: req.body.email, 
//             password: req.body.password,
//             where: {
//                 id: req.session.userId,
//             },
//         });
//     } catch(err){
//         console.log(err);
//         res.status(500).json(err);
//     };
// });

//update user login info
router.put('/update',async (req, res)=>{
    try{
        await User.update(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                where: {
                    id: req.session.userId,
                },
            },
        );
        res.status(200).json({message: 'User info updated successfuly'})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//get user information
router.get("/getuser", async (req, res)=>{
    try{
        const userData = await User.findOne(
            {
                where: {
                    id: req.session.userId,
                },
            }
        );
        res.status(200).json(userData);
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router