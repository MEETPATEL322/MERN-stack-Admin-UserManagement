import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import UserModel from '../models/User.js'


// import authenticate  from '../middlewares/authenticate.js';
// import authenticate from '../middlewares/authenticate.js'
// import checkUserAuth from '../middlewares/auth-middleware.js';




// router.post('/register',async(req,res)=>{
//     console.log(req.body);
// })



// // ROute Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth)
// router.use('/loggeduser', checkUserAuth)

// // Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)

router.get("/validuser",checkUserAuth,async(req,res)=>{
    console.log("done");
    try {
        const ValidUserOne = await UserModel.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

router.get("/logout",checkUserAuth,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// // Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)


export default router