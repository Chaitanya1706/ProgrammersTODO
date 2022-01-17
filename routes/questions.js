const express = require('express');
const passport = require('passport');

const router = express.Router();

const questionsController = require('../controllers/questions_controller');

router.get('/view', passport.checkAuthentication, questionsController.viewList)

router.get('/add', passport.checkAuthentication, questionsController.addQuestion)

router.get('/todo', passport.checkAuthentication, questionsController.todo)
router.post('/todo/markdone', passport.checkAuthentication, questionsController.markdone);


router.post('/create', passport.checkAuthentication, questionsController.create);

router.get('/delete/:id', passport.checkAuthentication, questionsController.destroy);

module.exports = router;

