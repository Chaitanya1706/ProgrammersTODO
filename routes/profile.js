

const express = require('express');
const router = express.Router()
const profileController = require('../controllers/profile');
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.post('/', passport.checkAuthentication, upload.array('image'), profileController.profile)


module.exports = router;
