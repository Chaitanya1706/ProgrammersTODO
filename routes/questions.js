const express = require('express');
const passport = require('passport');

const router = express.Router();

const questionsController = require('../controllers/questions_controller');

router.get('/view',passport.checkAuthentication,questionsController.viewList)

router.post('/create',passport.checkAuthentication,questionsController.create);

module.exports = router;

