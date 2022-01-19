const express = require('express');
const passport = require('passport');

const router = express.Router();

const questionsController = require('../controllers/questions_controller');
const searchfilter = require('../controllers/searchfilter')
router.get('/view', passport.checkAuthentication, questionsController.viewList)
router.post('/search', passport.checkAuthentication, searchfilter.search)
router.get('/status', passport.checkAuthentication, searchfilter.returnstatusQuestion)


router.get('/add', passport.checkAuthentication, questionsController.addQuestion)

router.get('/todo', passport.checkAuthentication, questionsController.todo)
router.post('/todo/markdone', passport.checkAuthentication, questionsController.markdone);


router.post('/create', passport.checkAuthentication, questionsController.create);

router.get('/delete/:id', passport.checkAuthentication, questionsController.destroy);

router.get('/update/:id', passport.checkAuthentication, questionsController.updateQuestion);

router.post('/update/:id', passport.checkAuthentication, questionsController.update);

module.exports = router;

