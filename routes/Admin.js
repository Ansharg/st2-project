const express = require('express');
const router = express.Router();
const {Login,LoginPage,RegisterPage,Register,AdminPage,Logout,CategoryPage,Category} = require('../controller/Admin');

router.post('/login',Login);
router.get('/login',LoginPage);
router.post('/logout',Logout);
router.get('/register',RegisterPage);
router.post('/register',Register);
router.get('/admin',AdminPage);
router.get('/category',CategoryPage);
router.post('/category',Category)

module.exports = router;