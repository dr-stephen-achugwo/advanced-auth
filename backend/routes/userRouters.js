const express = require('express');
const {
    signup,
    verifyAccount,
    resendOTP,
    login,
    logout,
    forgetPassword,
    resetPassword
} = require('../controller/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verifyAccount);
router.post('/resend-otp', isAuthenticated, resendOTP);
router.post('/login', login);
router.get('/authenticated', isAuthenticated, (req, res) => {
    console.log('user => ', req.user);
    res.json({ user: req.user });
});
router.post('/logout', logout);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
