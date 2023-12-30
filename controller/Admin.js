const User = require('../model/User');
const Blog = require('../model/Blog');

module.exports.Login = async (req,res) => {
    const {Username,Password} = req.body;
    let user = await User.findOne({Username: Username});
    if(user){
        if (user.Password != Password) {
            res.send("Invalid Password");
        }
        else{
            req.session.user = user;
            req.session.isLoggedIn=true;
            res.redirect('/admin');
        }
    }
    else{
        res.send("User not found");
    }
}

module.exports.LoginPage = (req,res) => {
    if (req.session.isLoggedIn) {
        res.render('profile.hbs',{user: req.session.user})
    }
    else{
        res.render('login.hbs');
    }
}

module.exports.RegisterPage = (req,res) => {
    if (!req.session.isLoggedIn) {
        res.render('register.hbs');
    }
    else{
        res.redirect('/admin');
    }
}

module.exports.Register = async (req,res) => {
    const {Username,Password,Admin} = req.body;
    const checkuser = await User.findOne({Username:Username});
    if (checkuser) {
        res.send("User already registered");
    }
    else{
        const newuser = new User({Username:Username,Password:Password,Admin:Admin});
        await newuser.save();
        res.redirect('/login');
    }
}

module.exports.AdminPage = async (req,res) => {
    if (req.session.isLoggedIn) {
        if(req.session.user.Admin==true){
            let blogs = await Blog.find({});
            res.render('adminpages/index.hbs',{blogs,user: req.session.user});
        }
    }
    else{
        res.redirect('/');
    }
}

module.exports.Logout = (req, res) => {
    req.session.isLoggedIn=false;
    res.redirect('/');
}

module.exports.CategoryPage = (req,res) => {
    if (req.session.isLoggedIn) {
        res.render('category.hbs',{user:req.session.user});
    }
    else{
        res.render('category.hbs');
    }
}

module.exports.Category = async(req,res) => {
    const {category} = req.body;
    if (req.session.isLoggedIn) {
        let blogs = await Blog.find({category:category});
        res.render('category.hbs',{blogs:blogs,user:req.session.user});
    }
    else{
        let blogs = await Blog.find({category:category});
        res.render('category.hbs',{blogs:blogs,category:category});
    }
}
