const express = require('express');
const router = express.Router();
const {Login,LoginPage,RegisterPage,Register,AdminPage,Logout,CategoryPage,Category,ProfilePage,Admin} = require('../controller/Admin');

router.post('/login',Login);
router.get('/login',LoginPage);
router.post('/logout',Logout);
router.get('/register',RegisterPage);
router.post('/register',Register);
router.get('/admin',AdminPage);
router.post('/admin/:id',Admin);
router.get('/category',CategoryPage);
router.post('/category',Category);
router.get('/profile',ProfilePage);
router.get("/verify/:id/:token",async(req,res)=>{
    const {id}=req.params;
    let user= await User.findOne({_id:id});
    if(!user) return res.status(400).send("Invalid link");

    let token=await Token.findOne({userId:id,token:req.params.token});
    if(!token) return res.status(400).send("Invalid link");
    // await User.updateOne({_id:user.id,verify:true});
    user.verify=true;
    await user.save();
    await Token.findByIdAndDelete(token._id);
    res.send("Email verified successfully");
})

module.exports = router;