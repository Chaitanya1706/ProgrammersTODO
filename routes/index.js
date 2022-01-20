const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

router.get('/about',homeController.about);

router.use('/users',require('./users'))
router.use('/questions',require('./questions'));

module.exports = router;