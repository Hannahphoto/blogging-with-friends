const router = require('express').Router();
const { User } = require('../../models');

//register a new user
router.post('/', async (req, res)=> {
    console.log('Request received:', req.body);
    try{
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        
        req.session.save(()=>{
            console.log("Registration Successful:", userData);
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json(userData);
        });
        // res.status(200).json(userData)
    }catch (err){
            console.log("Error during registration:", err);
            res.status(500).json(err);
          
    }
});

//user who has already singend up should be able to log in
router.post('/login',async (req, res)=> {
    console.log('Request received:', req.body);
    try{
        const userData = await User.findOne(
            {where: 
                {
                    username: req.body.username,
                },}
            // {
            //     // email: req.body.email, 
            //     password: req.body.password,
            // },
           );
                // console.log("Hello user:", userData);
                // res.status(200).json(userData)
        if(!userData){
            res.status(404).json({message: 'Incorrect username or password, please try again.'});
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        console.log(validPassword);
        if(!validPassword){
            res.status(401).json({message: 'Incorrect password please try again.'});
            return;
        }

        req.session.save(()=>{
            req.session.userId = userData.id;
            req.session.username = userData.username;
            // // req.session.email = userData.email;
            // req.session.password = userData.password;
            req.session.logged_in = true;

            res.json({userData, message: 'You are now logged in!'})
        })
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

//user logout
router.post('/logout', (req, res)=>{
    if(req.session.logged_in){
        req.session.destroy(()=>{
            res.status(204).end({Message:"User has logged out"})
        });
    }else {
        res.status(404).end({Message: "Has not logged out"});
        
    }
});


//update user login info
// router.put('/update',async (req, res)=>{
//     try{
//         await User.update(
//             {
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password,
//             },
//             {
//                 where: {
//                     id: req.session.userId,
//                 },
//             },
//         );
//         res.status(200).json({message: 'User info updated successfuly'})
//     }catch(err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


//get user information
router.get("/getuser", async (req, res)=>{
    try{
        const userData = await User.findOne(
            {
                where: {
                    id: req.session.userId,
                    username: req.session.username,
                    email: req.session.email,
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