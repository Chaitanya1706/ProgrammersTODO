const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller')

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/edit/:id',passport.checkAuthentication, usersController.edit);
router.post('/update', passport.checkAuthentication, usersController.update);


router.get('/signup',usersController.signup);

router.post('/create',usersController.create);

router.get('/signin',usersController.signin);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',    // strategy used
    {failureRedirect : '/users/signin'}
),usersController.createSession);

router.get('/sign-out',usersController.destroySession)


module.exports = router;